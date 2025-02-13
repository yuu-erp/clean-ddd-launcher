import { generateMessageId } from "@core/helpers";
import { Emitter } from "../emitter";
import { receiveData } from "./receiveData";
import { SystemCorePort } from "./system-core.port";
import { DataResponse, Payload } from "./system-core.type";

export class SystemCore extends Emitter implements SystemCorePort {
  #isReady: boolean;
  #hasNotch = false;
  #isFrame: boolean;
  #pendingCommands = new Set<string>();
  #receiveLargeData: Record<string, any> = {};

  constructor() {
    super();
    this.#isFrame = this.#detectFrame();
    this.#isReady = this.#detectReadyState();
    this.#subscribeToEvents();
  }

  get isReady(): boolean {
    return this.#isReady;
  }

  get statusNotch(): boolean {
    return this.#hasNotch;
  }

  public async send<T, U>(payload: Payload<T>): Promise<DataResponse<U>> {
    receiveData[payload.command] = -1;
    payload.appId = window.appId || payload.appId;
    payload.messageId = generateMessageId(8);

    try {
      const response = (await this.#sendMessageToNative(
        payload
      )) as DataResponse<U>;
      return response;
    } catch (error) {
      console.error("Error sending message: ", error);
      throw error;
    }
  }

  #detectFrame(): boolean {
    return window !== window.parent;
  }

  #detectReadyState(): boolean {
    if (this.#isFrame) return true;
    return !!(window.webkit?.messageHandlers?.callbackHandler || window.opener);
  }

  #sendLargeData(command: string, data: string, isFrame = false): void {
    const chunkSize = 64000;
    const totalChunks = Math.ceil(data.length / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const chunk = data.slice(i * chunkSize, (i + 1) * chunkSize);
      const message = JSON.stringify({
        type: "large",
        chunk,
        index: i,
        totalChunks,
        command,
      });

      this.#postMessage(message, isFrame);
    }
  }

  #sendNormalData(data: string, isFrame = false): void {
    const message = JSON.stringify({
      type: "normal",
      data,
    });

    this.#postMessage(message, isFrame);
  }

  #postMessage(message: string, isFrame: boolean): void {
    if (isFrame) {
      window.parent.postMessage(message, "*");
    } else if (window.webkit?.messageHandlers?.callbackHandler?.postMessage) {
      window.webkit.messageHandlers.callbackHandler.postMessage(message);
    } else {
      console.warn("No suitable postMessage handler found.");
    }
  }

  async #sendMessageToNative<T, U>(
    payload: Payload<T>
  ): Promise<DataResponse<U>> {
    const message = JSON.stringify(payload);
    const commandKey = `${payload.command}_${payload.messageId}`;

    return new Promise((resolve, reject) => {
      try {
        if (message.length > 64000) {
          this.#sendLargeData(payload.command, message);
        } else {
          this.#sendNormalData(message);
        }

        receiveData[commandKey] = { resolve };
      } catch (error) {
        reject(error);
      } finally {
        this.#pendingCommands.delete(payload.command);
      }
    });
  }

  #subscribeToEvents(): void {
    window.addEventListener(
      "flutterInAppWebViewPlatformReady",
      this.#onPlatformReady.bind(this)
    );
    window.addEventListener("message", this.#handleIncomingMessage.bind(this));

    if (window.require) {
      window
        .require("electron")
        .ipcRenderer.on("message", this.#onElectronMessage.bind(this));
    }
  }

  #onPlatformReady(): void {
    this.#isReady = true;
    this.emit("ready");
  }

  #onElectronMessage(_event: any, ...args: any): void {
    const data = args[0] || args;
    window.postMessage(data, "*");
  }

  #handleIncomingMessage(event: MessageEvent): void {
    try {
      const { data } = event;
      if (!data) return;

      const messageType = data.type || "normal";

      if (messageType === "large") {
        this.#handleLargeDataMessage(data);
      } else {
        this.#handleNormalMessage(data);
      }
    } catch (error) {
      console.error("Error handling incoming message: ", error);
    }
  }

  #handleLargeDataMessage(data: any): void {
    const { chunk, totalChunks, command } = data;
    const commandData = this.#receiveLargeData[command] || {
      expectedChunks: totalChunks,
      receivedData: "",
      receivedChunks: 0,
    };

    commandData.receivedData += chunk;
    commandData.receivedChunks += 1;
    this.#receiveLargeData[command] = commandData;

    if (commandData.receivedChunks === commandData.expectedChunks) {
      const completeData = JSON.parse(commandData.receivedData);
      delete this.#receiveLargeData[command];
      this.emit(command, completeData);
    }
  }

  #handleNormalMessage(data: any): void {
    if (typeof data === "string") {
      this.#handleJsonStringMessage(data);
    } else if (data.command && data.messageId) {
      const commandKey = `${data.command}_${data.messageId}`;
      const pendingMessage = receiveData[commandKey];

      if (pendingMessage && typeof pendingMessage.resolve === "function") {
        pendingMessage.resolve(data.data);
        this.#pendingCommands.delete(data.command);
      }
    }
  }

  #handleJsonStringMessage(data: string): void {
    try {
      const parsedData = JSON.parse(data) as any;
      const { command, data: response } = parsedData;
      if (command && response) {
        this.emit(command, response);
      }
    } catch (error) {
      console.error("Error parsing JSON message: ", error);
    }
  }
}

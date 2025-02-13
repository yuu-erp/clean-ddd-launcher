declare global {
  interface Window {
    webkit: {
      messageHandlers: {
        callbackHandler: any;
      };
    };
    finSdk: {
      init: any;
      call: any;
    };
    isHasNotch?: boolean;
    appId?: string;
    workerId?: string;
  }
}

export {};

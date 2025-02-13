import {
  ArgumentNotProvidedException,
  InternalServerErrorException,
} from "@core/exceptions";
import { ExceptionBase } from "@core/exceptions/exception.base";
import { Payload, SystemCorePort } from "@core/infrastructure/system-core";
import { ProfileResponseDTO } from "./dtos/profile-response.dto";
import { DataDappResponseDTO } from "./dtos/data-dapp-response.dto";

export class FetchDataService {
  constructor(private readonly systemCore: SystemCorePort) {}

  private async fetchData<T, U>(endpoint: Payload<T>): Promise<U> {
    if (!endpoint.command) {
      throw new ArgumentNotProvidedException("API endpoint is required");
    }
    try {
      const response = await this.systemCore.send<T, U>(endpoint);
      if (!response.success || !response.data) {
        throw new InternalServerErrorException(`Failed to fetch ${endpoint}`, {
          status: response.status,
        });
      }
      return response.data;
    } catch (error) {
      if (error instanceof ExceptionBase) {
        throw error; // Re-throw known exceptions
      }
      throw new InternalServerErrorException(
        "Unexpected error occurred",
        {},
        error instanceof Error ? error : undefined
      );
    }
  }

  async getCurrentProfile(): Promise<ProfileResponseDTO> {
    return this.fetchData<unknown, ProfileResponseDTO>({
      command: "getCurrentProfile",
    });
  }

  async getDataDApp(): Promise<DataDappResponseDTO[][]> {
    return this.fetchData<unknown, DataDappResponseDTO[][]>({
      command: "getDataDApp",
    });
  }
  async getFavoriteApps(): Promise<DataDappResponseDTO[]> {
    return this.fetchData<unknown, DataDappResponseDTO[]>({
      command: "getFavoriteApps",
    });
  }
}

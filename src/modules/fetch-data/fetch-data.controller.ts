import { DataDappResponseDTO } from "./dtos/data-dapp-response.dto";
import { ProfileResponseDTO } from "./dtos/profile-response.dto";
import { FetchDataService } from "./fetch-data.service";

export class FetchDataController {
  constructor(private readonly fetchDataService: FetchDataService) {}

  async handleGetCurrentProfile(): Promise<ProfileResponseDTO> {
    return this.fetchDataService.getCurrentProfile();
  }

  async handleGetDataDApp(): Promise<DataDappResponseDTO[][]> {
    return this.fetchDataService.getDataDApp();
  }

  async handleGetFavoriteApps(): Promise<DataDappResponseDTO[]> {
    return this.fetchDataService.getFavoriteApps();
  }
}

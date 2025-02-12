import { DappEntity } from "../entities";
import { RepositoryPort } from "./repository.port";

export interface IDappRepository extends RepositoryPort<DappEntity> {}

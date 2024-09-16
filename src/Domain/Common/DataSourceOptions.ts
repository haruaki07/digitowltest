import { ClientSession, ClientSessionEvents } from "mongodb";

export class DataSourceOptions {
  session?: ClientSession;
}

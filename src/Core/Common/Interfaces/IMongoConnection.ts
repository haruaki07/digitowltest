import { ClientSession, Collection, Document } from "mongodb";

export interface IMongoConnection {
  connect(): Promise<void>;

  withTransaction<T>(
    callback: (session: ClientSession) => Promise<T>
  ): Promise<T>;

  collection<T extends Document>(collectionName: string): Collection<T>;
}

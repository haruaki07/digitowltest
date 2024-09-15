import { IMongoConnection } from "@/Core/Common/Interfaces/IMongoConnection";
import { config } from "@/config";
import { injectable } from "inversify";
import { ClientSession, Collection, Document, MongoClient } from "mongodb";

@injectable()
export class MongoConnection implements IMongoConnection {
  private _client: MongoClient;

  constructor() {
    this._client = new MongoClient(config.db_url);
  }

  async connect(): Promise<void> {
    await this._client.connect();
  }

  collection<T extends Document>(collectionName: string): Collection<T> {
    return this._client.db().collection<T>(collectionName);
  }

  async withTransaction<T>(
    operations: (session: ClientSession) => Promise<T>
  ): Promise<T> {
    const session = this._client.startSession();

    try {
      session.startTransaction();
      const result = await operations(session);
      await session.commitTransaction();

      return result;
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}

import { Config } from "@/config";
import {
  IMongoConnection,
  MongoConnectionOptions,
  WithId,
} from "@/Core/Common/Interfaces/IMongoConnection";
import { TYPES } from "@/Infrastructure/DI";
import { inject, injectable } from "inversify";
import {
  ClientSession,
  Collection,
  Document,
  Filter,
  MongoClient,
  ObjectId,
} from "mongodb";

@injectable()
export class MongoConnection implements IMongoConnection {
  private _client!: MongoClient;

  constructor(@inject(TYPES.Config) config: Config) {
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

  async findOne<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<T> | null> {
    const result = await this._client
      .db()
      .collection<T>(collectionName)
      .findOne(query, { session: options?.session });

    if (result) {
      return { ...result, id: result._id.toString() } as WithId<T>;
    }

    return result;
  }

  async find<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<any>[]> {
    return await this._client
      .db()
      .collection<T>(collectionName)
      .find(query, { session: options?.session })
      .map((doc) => ({ ...doc, id: doc._id.toString() }))
      .toArray();
  }

  async insertOne<T extends Document>(
    collectionName: string,
    data: T,
    options?: MongoConnectionOptions
  ): Promise<ObjectId | null> {
    const { insertedId, acknowledged } = await this._client
      .db()
      .collection(collectionName)
      .insertOne(data, { session: options?.session });

    if (!acknowledged) return null;

    return insertedId;
  }

  async findAndUpdate<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    update: Partial<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<any>> {
    const doc = await this._client
      .db()
      .collection<T>(collectionName)
      .findOneAndUpdate(
        query,
        { $set: update },
        { session: options?.session, returnDocument: "after" }
      );

    if (doc) return { ...doc, id: doc._id.toString() };

    return doc;
  }

  async deleteOne<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    options?: MongoConnectionOptions
  ): Promise<void> {
    await this._client
      .db()
      .collection<T>(collectionName)
      .deleteOne(query, { session: options?.session });
  }
}

import { ClientSession, Document, Filter, ObjectId } from "mongodb";

export type WithId<T> = T & {
  id: string;
  _id: ObjectId;
};

export interface MongoConnectionOptions {
  session?: ClientSession;
}

export interface IMongoConnection {
  connect(): Promise<void>;

  findOne<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<T> | null>;

  find<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<T>[]>;

  insertOne<T extends Document>(
    collectionName: string,
    data: T,
    options?: MongoConnectionOptions
  ): Promise<ObjectId | null>;

  findAndUpdate<T extends Document>(
    collectionName: string,
    query: Filter<T>,
    update: Partial<T>,
    options?: MongoConnectionOptions
  ): Promise<WithId<T> | null>;

  deleteOne(
    collectionName: string,
    query: Filter<object>,
    options?: MongoConnectionOptions
  ): Promise<void>;

  withTransaction<T>(
    callback: (session: ClientSession) => Promise<T>
  ): Promise<T>;
}

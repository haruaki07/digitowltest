import { UserRequestModel } from "@/Domain/Models/UserModel";
import { MongoConnection } from "@/Infrastructure/Data/Connections/MongoConnection";
import { UserDataSource } from "@/Infrastructure/Data/DataSources/UserDataSource";
import { ObjectId } from "mongodb";
import { mock, Mock } from "ts-jest-mocker";

describe("UserDataSource", () => {
  let mockMongoConn: Mock<MongoConnection>;

  beforeEach(() => {
    mockMongoConn = mock(MongoConnection);
    jest.clearAllMocks();
  });

  it("should be able to find user by id", async () => {
    const _id = new ObjectId();
    const user = { _id, id: _id.toString(), firebaseId: "xyz" };

    mockMongoConn.findOne.mockResolvedValue(user);

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(userDataSource.findById(user.id)).resolves.toMatchObject(user);
  });

  it("should throw error if user not found", async () => {
    mockMongoConn.findOne.mockResolvedValue(null);

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(
      userDataSource.findById(new ObjectId().toString())
    ).rejects.toThrow("User not found");
  });

  it("should be able to find user by firebase id", async () => {
    const _id = new ObjectId();
    const user = { _id, id: _id.toString(), firebaseId: "xyz" };

    mockMongoConn.findOne.mockResolvedValue(user);

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(userDataSource.findByFirebaseId("xyz")).resolves.toMatchObject(
      user
    );
  });

  it("should be able to create user", async () => {
    const id = new ObjectId();
    const user: UserRequestModel = {
      firebaseId: "xyz",
      cart: { items: [], totalPrice: 0 },
    };

    mockMongoConn.insertOne.mockResolvedValue(id);

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(userDataSource.create(user)).resolves.toBe(id.toString());
  });

  it("should be able to update user", async () => {
    const id = new ObjectId();
    const user: UserRequestModel = {
      firebaseId: "xyz",
      cart: { items: [], totalPrice: 0 },
    };

    mockMongoConn.findAndUpdate.mockResolvedValue({
      ...user,
      id: id.toString(),
      _id: id,
    });

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(
      userDataSource.update(id.toString(), user)
    ).resolves.toMatchObject(user);
  });

  it("should be able to delete user", async () => {
    const id = new ObjectId();

    mockMongoConn.deleteOne.mockResolvedValue();

    const userDataSource = new UserDataSource(mockMongoConn);
    await expect(userDataSource.delete(id.toString())).resolves.toBeUndefined();
  });
});

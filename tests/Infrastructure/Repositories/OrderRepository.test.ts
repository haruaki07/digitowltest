import { WithId } from "@/Core/Common/Interfaces/IMongoConnection";
import { OrderEntity } from "@/Domain/Entities/Order";
import { MongoConnection } from "@/Infrastructure/Data/Connections/MongoConnection";
import { OrderDataSource } from "@/Infrastructure/Data/DataSources/OrderDataSource";
import { UserDataSource } from "@/Infrastructure/Data/DataSources/UserDataSource";
import { OrderRepository } from "@/Infrastructure/Repositories/OrderRepository";
import { ObjectId } from "mongodb";
import { Mock, mock } from "ts-jest-mocker";

describe("OrderRepository", () => {
  let mockMongoConnection: Mock<MongoConnection>;
  let mockUserDataSource: Mock<UserDataSource>;
  let mockOrderDataSource: Mock<OrderDataSource>;

  beforeEach(() => {
    mockMongoConnection = mock(MongoConnection);
    mockUserDataSource = mock(UserDataSource);
    mockOrderDataSource = mock(OrderDataSource);
    jest.clearAllMocks();
  });

  it("should be able to find user orders", async () => {
    const userId = new ObjectId();
    const orderId = new ObjectId();
    const orders: WithId<OrderEntity>[] = [
      {
        _id: orderId,
        id: orderId.toString(),
        items: [],
        userId: userId.toString(),
        totalPrice: 0,
        placedAt: new Date(),
      },
    ];

    mockOrderDataSource.findAll.mockResolvedValue(orders);

    const orderRepository = new OrderRepository(
      mockMongoConnection,
      mockOrderDataSource,
      mockUserDataSource
    );
    await expect(
      orderRepository.findUserOrders(userId.toString())
    ).resolves.toMatchObject(orders);
  });
});

import { CreateOrderUseCase } from "@/Core/UseCases/Order/CreateOrderUseCase";
import { OrderResponseModel } from "@/Domain/Models/OrderModel";
import { OrderRepository } from "@/Infrastructure/Repositories/OrderRepository";
import { mock, Mock } from "ts-jest-mocker";

describe("CreateOrderUseCase", () => {
  let mockOrderRepository: Mock<OrderRepository>;

  beforeEach(() => {
    mockOrderRepository = mock(OrderRepository);
    jest.clearAllMocks();
  });

  it("should be able to create order", async () => {
    const order: OrderResponseModel = {
      id: "def",
      items: [],
      userId: "abc",
      totalPrice: 0,
      placedAt: new Date(),
    };
    mockOrderRepository.createOrder.mockResolvedValue(order);

    const orderUseCase = new CreateOrderUseCase(mockOrderRepository);
    await expect(orderUseCase.execute(order.userId)).resolves.toMatchObject(
      order
    );
  });
});

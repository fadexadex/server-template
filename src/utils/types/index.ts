import { Prisma, OrderStatus } from "@prisma/client";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

export interface ILoginBody {
  email: string;
  password: string;
}

export type ICreateProduct = Prisma.ProductCreateInput & { categoryId: string };
export type IUpdateProduct = Prisma.ProductUpdateInput & { categoryId: string };
export type ICreateOrder = Prisma.OrderCreateInput & {
  userId: string;
  items: {
    productId: string;
    quantity: number;
    price: number;
  }[];
};

export type TokenPayload = Omit<Prisma.UserCreateInput, "password">;

export type IOrderStatus = OrderStatus;

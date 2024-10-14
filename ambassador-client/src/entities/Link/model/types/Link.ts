import { Order } from '@/entities/Order';

export interface Link {
  id: number;
  code: string;
  orders: Order[];
}

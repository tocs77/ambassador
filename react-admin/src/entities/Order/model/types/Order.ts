import { OrderItem } from './OrderItem';

export interface Order {
  id: number;
  transaction_id: string;
  user_id: number;
  code: string;
  ambassador_email: string;
  first_name: string;
  last_name: string;
  name: string;
  email: string;
  address: string | null;
  city: string | null;
  country: string | null;
  zip: string | null;
  complete: boolean;
  order_items: OrderItem[];
  total: number;
}

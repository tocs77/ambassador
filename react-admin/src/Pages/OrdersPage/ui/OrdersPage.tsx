import { Order } from '@/entities/Order';
import { adminController } from '@/shared/api';
import { Layout } from '@/shared/ui/Layout';
import { useEffect, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import { AccordionDetails, AccordionSummary } from '@mui/material';

export const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await adminController.getOrders();
    if (res.type === 'payload') {
      setOrders(res.payload);
    }
  };

  console.log(orders);
  return (
    <Layout>
      {orders.map((order) => (
        <Accordion key={order.id}>
          <AccordionSummary>{`${order.name} - $${order.total}`}</AccordionSummary>
          <AccordionDetails>
            <table className='table table-striped table-sm'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>{'Product title'}</th>
                  <th scope='col'>{'Price'}</th>
                  <th scope='col'>{'Quantity'}</th>
                </tr>
              </thead>
              <tbody>
                {order.order_items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.product_title}</td>
                    <td>{`$${item.price}`}</td>
                    <td>{item.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </AccordionDetails>
        </Accordion>
      ))}
    </Layout>
  );
};

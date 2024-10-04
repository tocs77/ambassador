import { userController } from '@/shared/api';
import { User } from '@/shared/types';
import { Layout } from '@/shared/ui/Layout';
import { useEffect, useState } from 'react';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await userController.getAmbassdors();
    if (res.type === 'payload') {
      setUsers(res.payload);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Layout>
      <table className='table table-striped table-sm'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>{'Name'}</th>
            <th scope='col'>{'Email'}</th>
            <th scope='col'>{'Actions'}</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>{'a'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

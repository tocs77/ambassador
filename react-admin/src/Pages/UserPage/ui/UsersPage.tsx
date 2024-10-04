import { adminController } from '@/shared/api';
import { User } from '@/shared/types';
import { Layout } from '@/shared/ui/Layout';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);

  const fetchUsers = async () => {
    const res = await adminController.getAmbassdors();
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
              <td>
                <Link to={`/users/${user.id}/links`}>
                  <Button variant='contained' color='primary'>
                    {'View'}
                  </Button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

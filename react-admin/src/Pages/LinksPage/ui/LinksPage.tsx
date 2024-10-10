import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { adminController } from '@/shared/api';
import { Link } from '@/entities/Link';
import { Layout } from '@/shared/ui/Layout';

export const LinksPage = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const { id } = useParams();

  const fetchLinks = async (id: string) => {
    const res = await adminController.getLinks(id);
    if (res.type === 'payload') {
      setLinks(res.payload);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (!id) return;
    fetchLinks(id);
  }, [id]);

  return (
    <Layout>
      <table className='table table-striped table-sm'>
        <thead>
          <tr>
            <th scope='col'>#</th>
            <th scope='col'>{'Code'}</th>
            <th scope='col'>{'Count'}</th>
            <th scope='col'>{'Revenue'}</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => (
            <tr key={link.id}>
              <td>{link.id}</td>
              <td>{link.code}</td>
              <td>{link.orders.length}</td>
              <td>{'a'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

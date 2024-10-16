import { useGetStats } from '@/entities/User';
import { Layout } from '@/shared/ui/Layout';

export const StatsPage = () => {
  const { data: stats, isLoading } = useGetStats();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!stats) {
    return (
      <Layout>
        <div>Not stats yet</div>
      </Layout>
    );
  }

  return (
    <Layout>
      <table className='table table-striped table-sm'>
        <thead>
          <tr>
            <th scope='col'>{'#'}</th>
            <th scope='col'>{'Code'}</th>
            <th scope='col'>{'Revenue'}</th>
          </tr>
        </thead>
        <tbody>
          {stats!.map((stat, i) => (
            <tr key={stat.code + i}>
              <td>{'url to checkout'}</td>
              <td>{stat.code}</td>
              <td>{`$${stat.revenue}`}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

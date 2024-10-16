import { useGetRankings } from '@/entities/User';
import { Layout } from '@/shared/ui/Layout';

export const RankingsPage = () => {
  const { data: rankings, isLoading } = useGetRankings();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!rankings) {
    return (
      <Layout>
        <div>Not rankings yet</div>
      </Layout>
    );
  }
  return (
    <Layout>
      <div>
        <table className='table table-striped table-sm'>
          <thead>
            <tr>
              <th scope='col'>{'#'}</th>
              <th scope='col'>{'Name'}</th>
              <th scope='col'>{'Revenue'}</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(rankings!).map(([name, value], i) => (
              <tr key={name}>
                <td>{i + 1}</td>
                <td>{name}</td>
                <td>{`${value}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

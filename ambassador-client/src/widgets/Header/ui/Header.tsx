import { useGetUser } from '@/entities/User';

export const Header = () => {
  const { data: user, isLoading } = useGetUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>Not authorized</div>;
  }
  return (
    <section className='py-5 text-center container'>
      <div className='row py-lg-5'>
        <div className='col-lg-6 col-md-8 mx-auto'>
          <h1 className='fw-light'>{`Hi, ${user.first_name}`}</h1>
          <p className='lead text-body-secondary'>{`You earned $${user.revenue} so far`}</p>
        </div>
      </div>
    </section>
  );
};

import { Nav } from '@/widgets/Nav';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />
      <main>
        <div className='album py-5 bg-body-tertiary'>{children}</div>
      </main>
    </>
  );
};

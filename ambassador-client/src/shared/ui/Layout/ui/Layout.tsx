import { Nav } from '@/widgets/Nav';
import { Header } from '@/widgets/Header';
export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Nav />

      <main>
        <Header />
        <div className='album py-5 bg-body-tertiary'>{children}</div>
      </main>
    </>
  );
};

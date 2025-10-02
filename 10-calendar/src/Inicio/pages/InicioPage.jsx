import { SidebarLayout } from '../../layouts/SidebarLayout';
import { Navbar } from '../../calendar';

export const InicioPage = () => {
  return (
    <SidebarLayout>
      <Navbar />
      <div style={{  padding: '70px 20px 0px', minHeight: 'calc(100vh - 70px)' }} />
    </SidebarLayout>

  );
};

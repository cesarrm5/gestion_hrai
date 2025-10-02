import { SidebarLayout } from '../../layouts/SidebarLayout';
import { Navbar } from '../../calendar';

export const CapacitacionPage = () => {
  return (
    <SidebarLayout>
      <Navbar />
      <div style={{  padding: '70px 20px 20px', minHeight: 'calc(100vh - 70px)' }} />
    </SidebarLayout>
  );
};

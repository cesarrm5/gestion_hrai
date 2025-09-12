
import React from 'react';
import { SidebarMenu } from '../components/SidebarMenu';

export const SidebarLayout = ({ children }) => {
  return (
    <div style={{ display: 'flex' }}>
      <SidebarMenu />
      <div style={{ marginLeft: '220px', width: '100%' }}>
        {children}
      </div>
    </div>
  );
};

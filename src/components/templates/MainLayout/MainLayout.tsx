import React from 'react';
import { MainLayoutProps } from './MainLayout.types';
import Header from '@/components/organisms/Header';
import Footer from '@/components/organisms/Footer';

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;

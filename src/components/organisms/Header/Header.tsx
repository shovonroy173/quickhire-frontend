import React from 'react';
import Link from 'next/link';
import Container from '@/components/atoms/Container';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-bold text-blue-700">QuickHire</Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/">Home</Link>
          <Link href="/jobs">Jobs</Link>
        </nav>
      </Container>
    </header>
  );
};

export default Header;
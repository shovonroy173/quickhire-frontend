import React from 'react';
import Container from '@/components/atoms/Container';

const Footer: React.FC = () => {
  return (
    <footer className="mt-16 border-t border-gray-200 bg-white">
      <Container className="py-8 text-sm text-gray-500">
        <p>QuickHire. All rights reserved.</p>
      </Container>
    </footer>
  );
};

export default Footer;
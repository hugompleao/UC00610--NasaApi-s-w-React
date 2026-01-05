// src/components/Footer.jsx

import React from 'react';
import { Container } from 'react-bootstrap';

function Footer() {
  return (
    <footer className="text-center text-lg-start mt-auto">
        <div className="text-center">
          <br/>
          © 2026 Projeto React: Desenvolvido por Hugo Bacalhau.
          <br/>
          Dados fornecidos pela NASA Open APIs.
        </div>
        <br/>
    </footer>
  );
}

export default Footer;
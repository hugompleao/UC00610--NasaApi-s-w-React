import React from 'react';
import { Navbar as RBNavbar, Container, Nav } from 'react-bootstrap';

function Navbar({ navigateTo, currentPage }) { 
  // Função auxiliar para marcar o link ativo com brilho
  const getActiveClass = (page) => currentPage === page ? 'text-info fw-bold' : 'text-light';

  return (
    <RBNavbar expand="lg" className="fixed-top border-0 px-4">
      <Container>
        <RBNavbar.Brand 
          href="#" 
          onClick={() => navigateTo('home')} 
          className="text-gradient fw-bold fs-3 tracking-widest"
          style={{ letterSpacing: '3px' }}
        >
          NASA<span style={{ fontWeight: '300'}}>EXPLORER</span>
        </RBNavbar.Brand>
        
        <RBNavbar.Toggle aria-controls="basic-navbar-nav" className="border-0" />
        
        <RBNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto gap-3">
            <Nav.Link onClick={() => navigateTo('apod')} className={getActiveClass('apod')}>APOD</Nav.Link>
            <Nav.Link onClick={() => navigateTo('asteroids')} className={getActiveClass('asteroids')}>ASTEROIDES</Nav.Link>
            <Nav.Link onClick={() => navigateTo('nasalib')} className={getActiveClass('nasalib')}>NASA LIBRARY</Nav.Link>
            <Nav.Link onClick={() => navigateTo('eonet')} className={getActiveClass('eonet')}>EONET</Nav.Link>
            <Nav.Link onClick={() => navigateTo('epic')} className={getActiveClass('epic')}>EPIC</Nav.Link>
            <Nav.Link onClick={() => navigateTo('mars')} className={getActiveClass('mars')}>MARS PHOTOS</Nav.Link>
          </Nav>
        </RBNavbar.Collapse>
      </Container>
    </RBNavbar>
  );
}

export default Navbar;
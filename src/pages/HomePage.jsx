import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import FeatureCard from '../components/Cards';
import '../css/Pages.css'

const features = [
  {
    title: 'APOD',
    description: 'Observe a imagem astronómica do dia. Explore o cosmos através de imagens diárias.',
    id: 'apod',
    icon: 'file-image'
  },
  {
    title: 'Asteroides NeoWS',
    description: 'Monitorize objetos que passam perto da Terra com dados técnicos sobre órbitas e riscos.',
    id: 'asteroids',
    icon: 'rocket-takeoff'
  },
  {
    title: 'NASA Library',
    description: 'Pesquise no arquivo de imagens e vídeos históricos da agência espacial.',
    id: 'nasalib',
    icon: 'collection'
  },
  {
    title: 'EONET',
    description: 'Rastrei eventos naturais da Terra em tempo real, como vulcões e fogos.',
    id: 'eonet',
    icon: 'globe-americas'
  },
  {
    title: 'EPIC',
    description: 'Veja imagens do disco completo da Terra tiradas a um milhão de milhas de distância.',
    id: 'epic',
    icon: 'camera'
  },
   {
    title: 'MARS ROVER PHOTOS',
    description: 'Viaje pela superfície de Marte através dos olhos dos exploradores robóticos da NASA.',
    id: 'mars',
    icon: 'images'
  }
];

function HomePage({ navigateTo }) {
  return (
    <Container className="my-5 animate-fade-in">
      <div className="text-center mb-5 py-4">
        <br/><br/><br/>
        <p className="lead animate-fade-in">          
          Bem-vindo ao portal NASA Explorer.
          Esta plataforma é uma janela aberta para o cosmos, onde dados científicos se transformam numa experiência visual.
          Através da integração direta com a API oficial da NASA, permitimos monitorar asteroides em tempo real, explorar bibliotecas históricas da agência e ainda contemplar o nosso planeta a partir do espaço.
          Aqui é onde a ciência encontra a tecnologia, a tua viagem começa aqui, tens agora "O UNIVERSO NA PONTA DOS TEUS DEDOS".
        </p>
      </div>

      <Row xs={1} md={2} lg={3} className="g-5 justify-content-center">
        {features.map((feature, index) => (
          <Col key={index}>
            <FeatureCard
              title={feature.title}
              iconName={feature.icon} // Passamos o nome do icon
              description={feature.description} // Passamos a descrição para o hover
              onAction={() => navigateTo(feature.id)}
              className="glass-panel h-100 border-0"
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default HomePage;
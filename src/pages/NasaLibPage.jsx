import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Row, Col, Form, Button } from 'react-bootstrap';
import {fetchNasaLib} from '../services/nasaServices';
import '../css/Pages.css'

function NasaLibPage(){
    const [query, setQuery] = useState('');
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!query) return;

        setIsLoading(true);
        setError(null);

        try {
            const data = await fetchNasaLib(query);
            // Limitado a 12 itens
            setItems(data.slice(0, 10));
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
              return (
                  <Container className="text-center my-5 animate-fade-in">
                      <br /><br /><br />
                      <p className="isLoading mt-3" style={{ letterSpacing: '2px' }}>
                          Sintonizando com os satélites...</p>
                  </Container>
              );
          }

    return (
        <Container className="my-5 animate-fade-in">
            <div className="text-center mb-5">
                <br /><br /><br />
                <h1 className="display-4 fw-bold text-gradient">NASA LIBRARY</h1>
                <p className="nasaLib_Bio text-muted">Pesquise por imagens e vídeos históricos em toda a biblioteca da NASA.</p>
            </div>

            {/* Barra de Pesquisa*/}
            <Form onSubmit={handleSearch}> 
              <div className="d-flex gap-2 p-2 glass-panel w-100">
                  <Form.Control 
                      type="text"
                      placeholder="Introduza a sua pesquisa"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      className="bg-transparent text-white border-0 shadow-none flex-grow-1"/>
                  <Button variant="dark" type="submit" className="nasaLib_btnPesquisar rounded-pill px-4">Pesquisar</Button>
              </div>
          </Form>
            <br />
            {isLoading && <div className="text-center"><Spinner animation="grow" variant="info" /></div>}
            {error && <Alert variant="danger" className="glass-panel text-white">{error}</Alert>}

            <Row xs={1} md={2} lg={3} className="g-4">
                {items.map((item, index) => (
                    <Col key={index}>
                        <Card className="glass-panel h-100 border-0 overflow-hidden">
                            {item.links && (
                                <div style={{ height: '200px', overflow: 'hidden' }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={item.links[0].href} 
                                        style={{ objectFit: 'cover', height: '100%' }}
                                    />
                                </div>
                            )}
                            <Card.Body>
                                <Card.Title className="h8 text-truncate">{item.data[0].title}</Card.Title>
                                <Card.Text className="nasaLib_Text small opacity-75" style={{ display: '-webkit-box', WebkitLineClamp: '3', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.data[0].description}</Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default NasaLibPage;
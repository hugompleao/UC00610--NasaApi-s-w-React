import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { fetchEONET } from '../services/nasaServices';
import '../css/Pages.css'

function EonetPage() {
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEvents = async () => {
            try {
                setIsLoading(true);
                const data = await fetchEONET('open', 10);
                console.log("Eventos recebidos:", data); // Ver f12
                setEvents(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getEvents();
    }, []);

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
            <br /><br /><br/>
            <h1 className="text-gradient display-4 mb-4 text-info">EVENTOS NATURAIS ATIVOS</h1>
            <Row xs={1} md={2} lg={3} className="g-3">
                {events.map(event => (
                    <Col key={event.id}>
                        <Card className="glass-panel h-100 border-0 shadow">
                            <Card.Body>
                                <Card.Title className="eonet_Text">{event.title}</Card.Title>
                                <hr className="border-secondary" />
                                <p className="eonet_Category small mb-1">Categoria: {event.categories[0].title}</p>
                                <p className="eonet_Local small mb-0">
                                    Local: {event.geometry[0].coordinates[1]}, {event.geometry[0].coordinates[0]}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default EonetPage;
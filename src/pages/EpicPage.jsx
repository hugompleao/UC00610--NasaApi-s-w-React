import React, { useState, useEffect } from 'react';
import { Container, Card, Spinner, Alert, Row, Col } from 'react-bootstrap';
import { fetchEPIC } from '../services/nasaServices';
import '../css/Pages.css'

function EpicPage() {
    const [images, setImages] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getEpicData = async () => {
            try {
                setLoading(true);
                const data = await fetchEPIC();
                setImages(data || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        getEpicData();
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
              

    // Função para montar o URL da imagem (Raciocínio Técnico)
    const getImageUrl = (imageObj) => {
        const date = imageObj.date.split(' ')[0]; // Pega apenas YYYY-MM-DD
        const [year, month, day] = date.split('-');
        return `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/${imageObj.image}.png`;
    };

    if (isLoading) return <Container className="text-center mt-5"><Spinner animation="grow" variant="info" /></Container>;
    if (error) return <Container className="mt-5"><Alert variant="danger">{error}</Alert></Container>;

    return (
        <Container className="my-5 animate-fade-in">
            <div className="text-center mb-5">
                <br /><br /><br />
                <h1 className="text-gradient display-4 fw-bold">PLANETA TERRA EM TEMPO REAL</h1>
                <p className="epic_Bio text-muted">Imagens capturadas pelo satélite DSCOVR a 1.5 milhões de quilómetros de distância.</p>
            </div>

            <Row xs={1} md={2} lg={3} className="g-4">
                {images.map((img, index) => (
                    <Col key={index}>
                        <Card className="glass-panel h-100 border-0 overflow-hidden">
                            <div className="bg-black text-center">
                                <Card.Img 
                                    variant="top" 
                                    src={getImageUrl(img)} 
                                    alt={img.caption}
                                    style={{ transition: 'transform 0.5s'}}
                                />
                            </div>
                            <Card.Body>
                                <Card.Title className="epic_Caption h6">{img.caption}</Card.Title>
                                <hr className="border-secondary" />
                                <div className="epic_Details small opacity-75">
                                    <p className="mb-1"><strong>Data:</strong> {img.date}</p>
                                    <p className="mb-0"><strong>Latitude / Longitude:</strong> {img.centroid_coordinates.lat.toFixed(2)}, {img.centroid_coordinates.lon.toFixed(2)}</p>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default EpicPage;
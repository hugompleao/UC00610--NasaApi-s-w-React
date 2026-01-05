import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import { fetchMarsPhotos } from '../services/nasaServices';
import '../css/Pages.css'

function MarsPhotosPage() {
    const [photos, setPhotos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getPhotos = async () => {
            try {
                setError(null);
                const data = await fetchMarsPhotos();
                setPhotos(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };
        getPhotos();
    }, []);

    if (isLoading) return (
        <Container className="text-center my-5 animate-fade-in">
            <br /><br /><br />
            <p className="isLoading mt-3" style={{ letterSpacing: '2px' }}>Sintonizando com os satélites...</p>
        </Container>
    );

    if (error) return (
        <Container className="text-center my-5">
            <h2 className="text-danger">Erro ao carregar fotos</h2>
            <p className="text-white">{error}</p>
        </Container>
    );

    return (
        <Container className="my-5 animate-fade-in">
            <br /><br /><br />
            <h1 className="text-gradient mb-5 text-center">Exploração de Marte</h1>
            <Row xs={1} md={2} lg={3} className="g-4">
                {photos.map((p) => (
                    <Col key={p.id}>
                        <Card className="glass-panel border-0 h-100">
                            <Card.Img variant="top" src={p.img_src} className="p-2 rounded-4" />
                            <Card.Body className="text-center">
                                <Card.Title className="small">{p.camera.full_name}</Card.Title>
                                <p className="mars_CapInfo">Capturada em: {p.earth_date}</p>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}

export default MarsPhotosPage;
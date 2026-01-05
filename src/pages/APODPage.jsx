import React, { useState, useEffect } from 'react';
import { Container, Card, Alert, Row, Col, Form } from 'react-bootstrap';
import { fetchAPOD } from '../services/nasaServices';
import '../css/Pages.css'


function APODPage() {
    const [apodData, setApodData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDate, setSelectedDate] = useState("");

    const getAPOD = async (date = "") => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await fetchAPOD(date);
            setApodData(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        getAPOD();
    }, []);

    const handleDateChange = (e) => {
        const date = e.target.value;
        setSelectedDate(date);
        getAPOD(date);
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
            <Row className="justify-content-center">
                <Col lg={10}> {/* Aumentado para 10 para melhor visualização da imagem */}
                    
                    {/* Cabeçalho e Seletor de Data */}
                    <div className="text-center mb-5">
                        <br/><br/><br/>
                        <h1 className="text-gradient display-5 mb-4">{apodData?.title}</h1>
                        
                        <div className="d-flex justify-content-center">
                            <div className="glass-panel px-4 py-2 d-inline-block">
                                <Form.Group className="d-flex align-items-center">
                                    <Form.Label className="apod_Form me-3 mb-0 small">EXPLORAR OUTRA DATA:</Form.Label>
                                    <Form.Control type="date" value={selectedDate} onChange={handleDateChange} 
                                    className="bg-transparent text-white border-0"style={{ cursor: 'pointer', colorScheme: 'dark' }}max={new Date().toISOString().split("T")[0]}/>
                                </Form.Group>
                            </div>
                        </div>
                    </div>

                    {error ? (
                        <Alert variant="danger" className="glass-panel text-white border-danger">
                            <Alert.Heading>Erro de Conexão</Alert.Heading>
                            <p>{error}</p>
                        </Alert>
                    ) : (
                        <Card className="glass-panel border-0 shadow-lg overflow-hidden">
                            {/* Media Display */}
                            {apodData?.media_type === 'image' ? (
                                <div className="text-center bg-black position-relative" style={{ minHeight: '400px' }}>
                                    <Card.Img 
                                        variant="top" 
                                        src={apodData.hdurl || apodData.url} 
                                        alt={apodData.title} 
                                        className="img-fluid"
                                        style={{ maxHeight: '80vh', objectFit: 'contain' }}
                                    />
                                </div>
                            ) : (
                                <div className="ratio ratio-16x9">
                                    <iframe src={apodData?.url} title={apodData?.title} allowFullScreen></iframe>
                                </div>
                            )}

                            <Card.Body className="p-4 p-md-5">
                                <div className="d-flex justify-content-between align-items-center mb-4">
                                    <span className="apod_Date badge rounded-pill text-dark px-3 py-2">
                                        {new Date(apodData?.date).toLocaleDateString('pt-PT')}
                                    </span>
                                </div>
                                
                                <h3 className="apod_About h4 mb-4 fw-bold text-uppercase" style={{letterSpacing: '1px'}}>
                                    Acerca da Imagem</h3>
                                <Card.Text className="lead apod-description">
                                    {apodData?.explanation}
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default APODPage;
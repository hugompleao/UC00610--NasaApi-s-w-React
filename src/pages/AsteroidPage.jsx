import React, { useState, useEffect } from 'react';
import { Container, Table, Badge } from 'react-bootstrap';
import { fetchAsteroids } from '../services/nasaServices';
import '../css/Pages.css'

function AsteroidPage() {
  const [asteroids, setAsteroids] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAsteroids = async (date = "") => {
          setIsLoading(true);
          setError(null);
          try {
              const data = await fetchAsteroids(date);
              setAsteroids(data);
          } catch (err) {
              setError(err.message);
          } finally {
              setIsLoading(false);
          }
      };

  useEffect(() => {
    const getAsteroids = async () => {
      // Usamos datas fixas ou dinâmicas (ex: hoje)
      const data = await fetchAsteroids('2023-10-01', '2023-10-07');
      // A API NeoWs retorna um objeto com datas como chaves, vamos achatar a lista
      const flatList = Object.values(data).flat();
      setAsteroids(flatList);
      setIsLoading(false);
    };
    getAsteroids();
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
      <h1 className="text-gradient mb-4">Objetos Próximos da Terra</h1>
      <div className="asteroid_Table p-6">
        <Table responsive className="asteroid_Tablem">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Data</th>
              <th>Perigoso</th>
              <th>Velocidade</th>
            </tr>
          </thead>
          <tbody>
            {asteroids.map(ast => (
              <tr key={ast.id}>
                <td>{ast.name}</td>
                <td>{ast.close_approach_data[0].close_approach_date}</td>
                <td>
                  {ast.is_potentially_hazardous_asteroid ? 
                    <Badge bg="danger">Sim</Badge> : <Badge bg="success">Não</Badge>}
                </td>
                <td>{Math.round(ast.close_approach_data[0].relative_velocity.kilometers_per_hour)} KM/H</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}

export default AsteroidPage; 
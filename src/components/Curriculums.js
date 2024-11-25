import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

function Curriculums() {
  const [curriculums, setCurriculums] = useState([]);
  const navigate = useNavigate();

  async function getCurriculums() {
    try {
      const response = await axios.get('http://localhost:3001/curriculos');
      setCurriculums(response.data);
    } catch (err) {
      console.error('Erro ao buscar currículos:', err);
    }
  }

  async function getCurriculumById(id) {
    navigate('/curriculo',
      { state: { id } }
    )
  }

  useEffect(() => {
    getCurriculums();
  }, []);

  return (
    <Container className="mt-4">
      <h1>Lista de Currículos</h1>
      
      <Link to="/criar">
        <Button variant="primary" className="mb-4">
          Criar Novo Currículo
        </Button>
      </Link>

      <Row>
        {curriculums.map(curr => (
          <Col sm={12} md={6} lg={4} key={curr.id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{curr.nome}</Card.Title>
                <Card.Text>
                  <strong>E-mail:</strong> {curr.email}
                </Card.Text>
                <Button 
                  variant="info" 
                  onClick={() => {
                    getCurriculumById(curr.id)
                  }}
                >
                  Ver Detalhes
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Curriculums;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal';

function Curriculum(){
    const [curriculum, setCurriculum] = useState({});
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = location.state || {};

    async function getCurriculumById() {
        try {
            const response = await axios.get(`http://localhost:3001/curriculo/${id}`);
            setCurriculum(response.data)
        } catch (err) {
          console.error('Erro ao buscar currículo:', err);
        }
      }
    
      useEffect(() => {
        getCurriculumById();
      }, []);

    function handleOnClose(){
        navigate('/')
    }
    return(
    <div
      className="modal show"
      style={{ display: 'block', position: 'initial' }}
    >
      <Modal.Dialog>
        <Modal.Header >
          <Modal.Title> {curriculum.nome}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <p>
              <strong> E-mail: </strong>{curriculum.email}
            </p>
            <p>
              <strong> Telefone: </strong>{curriculum.telefone}
            </p>
            <p>
              <strong> Endereço Web: </strong>{curriculum.enderecoWeb}
            </p>
            <p>
                <strong>Experiência: </strong>{curriculum.experiencia}
            </p>
   
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleOnClose}>Voltar</Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );

}

export default Curriculum;
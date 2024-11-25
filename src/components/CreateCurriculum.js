import React, { useState } from 'react';
import axios from 'axios';
import { Button, Container, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function CreateCurriculum() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    experience: '',
    phone: '',
    webAddress: '',
  });
  const navigate = useNavigate();

  const handleOnClose = () => {
    navigate('/'); 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  async function createCurriculum(data) {
    try {
      const response = await axios.post('http://localhost:3001/curriculo', data, {
        headers: {
          'X-CSRF-Token': data._csrf, // Token CSRF do corpo enviado aqui
        },
        withCredentials: true, // Necessário para enviar cookies
      });
  
    } catch (error) {
      console.error('Erro ao criar currículo:', error.response?.data || error.message);
    }
  }
  

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário

    try {
      // Obter o token CSRF do backend
      const response = await axios.get('http://localhost:3001/csrf-token', { withCredentials: true });
      const csrfToken = response.data.csrfToken;
    
      const dataToSend = { 
        ...formData,
        _csrf: csrfToken, // Token CSRF no corpo
      };
    
      createCurriculum(dataToSend);
      
      navigate('/'); // Redireciona para a página inicial após sucesso
    } catch (err) {
      console.error('Erro ao criar currículo:', err);
    }
  };

  return (
    <Container>
      <h1>Crie seu currículo</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Nome</Form.Label>
          <Form.Control 
            type="text" 
            name="name" 
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPhone">
          <Form.Label>Telefone</Form.Label>
          <Form.Control 
            type="text" 
            name="phone" 
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formWebAddress">
          <Form.Label>Endereço Web</Form.Label>
          <Form.Control 
            type="text" 
            name="webAddress" 
            placeholder="Endereço WEB"
            value={formData.webAddress}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formExperience">
          <Form.Label>Experiência</Form.Label>
          <Form.Control 
            as="textarea"
            rows={3}
            name="experience" 
            placeholder="Experiência"
            value={formData.experience}
            onChange={handleChange}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Criar Currículo
        </Button>
        <Button variant="secondary" type="button" onClick={handleOnClose} className="ms-2">
          Voltar
        </Button>
      </Form>
    </Container>
  );
}

export default CreateCurriculum;

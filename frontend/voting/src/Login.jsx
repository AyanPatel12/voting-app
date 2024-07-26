import React, { useState } from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', formData);
      console.log(response.data);
      // Assuming the response contains a user object with an id
      if (response.data) {
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('isCandidate', response.data.isCandidate);
        if (response.data.isCandidate) {
          navigate('/candidate');
        } else {
          navigate('/voting');
        } 
      }else {
        console.error('Login failed');
        // Handle login failure (e.g., show an error message)
      }
    } catch (error) {
      console.error(error);
      // Handle login error (e.g., show an error message)
    }
  };

  return (
    <Container maxWidth="sm" className="container-background">
      <Box className="form-container">
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
}

export default Login;

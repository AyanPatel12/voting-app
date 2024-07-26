import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './home';
import Register from './Register';
import Login from './Login';
import Voting from './voting';
import CandidatePage from './CandidatePage';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

function App() {
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Voting System
          </Typography>
          <Button color="inherit" component={Link} to="/">Home</Button>
          <Button color="inherit" component={Link} to="/register">Register</Button>
          <Button color="inherit" component={Link} to="/login">Login</Button>
          <Button color="inherit" component={Link} to="/voting">Voting</Button>
        </Toolbar>
      </AppBar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/voting" element={<Voting />} />
        <Route path="/candidate" element={<CandidatePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

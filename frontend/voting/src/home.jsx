import React from 'react';
import { Container, Typography, Box } from '@mui/material';
import votingImage from './voting.jpeg'; // Adjust the path as necessary

function Home() {
  return (
    <Container maxWidth="md" className="container-background">
      <Box className="content-box">
        <Typography variant="h4" align="center" gutterBottom>
          Welcome to the Voting System
        </Typography>
        <div className="home-content-inner">
          <img src={votingImage} alt="Voting" className="home-image" />
          <div className="home-description">
            <Typography variant="body1">
              This is a secure and efficient online voting system that allows you to cast your vote with ease and confidence. Whether you're voting in an election or for a poll, our system ensures that your vote is counted accurately and securely.
            </Typography>
            <Typography variant="body1" sx={{ mt: 2 }}>
              Join us in making democracy more accessible and transparent. With our system, you can vote from anywhere at any time, ensuring that your voice is heard in the most convenient way possible. Thank you for choosing our voting system.
            </Typography>
          </div>
        </div>
      </Box>
    </Container>
  );
}

export default Home;

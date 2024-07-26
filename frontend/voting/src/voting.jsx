import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, Button, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';

function Voting() {
  const [candidates, setCandidates] = useState([]);
  const [voted, setVoted] = useState(false);
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage

  useEffect(() => {
    axios.get('http://localhost:5000/candidates')
      .then(response => {
        setCandidates(response.data);
      })
      .catch(error => {
        console.error('Error fetching candidates', error);
      });

    axios.get(`http://localhost:5000/user/${userId}`)
      .then(response => {
        if (response.data.hasVoted) {
          setVoted(true);
        }
      })
      .catch(error => {
        console.error('Error checking vote status', error);
      });
  }, [userId]);

  const handleVote = (candidateId) => {
    console.log(`Sending vote request: userId=${userId}, candidateId=${candidateId}`);
    axios.post('http://localhost:5000/vote', { userId, candidateId })
      .then(response => {
        console.log(response.data);
        setVoted(true);
        setCandidates(candidates.map(candidate =>
          candidate._id === candidateId ? { ...candidate, voteCount: candidate.voteCount + 1 } : candidate
        ));
      })
      .catch(error => {
        console.error('Error casting vote', error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Voting Page
        </Typography>
        {candidates.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            No candidates available.
          </Typography>
        ) : (
          <List>
            {candidates.map(candidate => (
              <ListItem key={candidate._id} divider>
                <ListItemText primary={candidate.username} />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => handleVote(candidate._id)}
                  disabled={voted}
                >
                  Vote
                </Button>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default Voting;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Box, List, ListItem, ListItemText } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CandidatePage() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId'); // Retrieve userId from local storage
    // console.log(`Sending vote request: userId=${userId}`);
  useEffect(() => {
    // Fetch the logged-in user's details to check if they are a candidate
    // axios.get(`http://localhost:5000/user/${userId}`)
    //   .then(response => {
    //     if (!response.data.isCandidate) {
    //       navigate('/'); // Redirect to home if the user is not a candidate
    //     } else {
          // Fetch candidates if the user is a candidate
          axios.get('http://localhost:5000/candidates')
            .then(response => {
              setCandidates(response.data);
            })
            .catch(error => {
              console.error('Error fetching candidates', error);
            });
        // }
      })
//       .catch(error => {
//         console.error('Error fetching user data', error);
//       });
//   }, [userId, navigate]);

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 5, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Candidate Page
        </Typography>
        {candidates.length === 0 ? (
          <Typography variant="h6" gutterBottom>
            No candidates available.
          </Typography>
        ) : (
          <List>
            {candidates.map(candidate => (
              <ListItem key={candidate._id} divider>
                <ListItemText primary={candidate.username} secondary={`Votes: ${candidate.voteCount}`} />
              </ListItem>
            ))}
          </List>
        )}
      </Box>
    </Container>
  );
}

export default CandidatePage;

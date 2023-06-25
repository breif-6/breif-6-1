import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import CheckIcon from '@mui/icons-material/Check';
// import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import axios from 'axios';

export default function PricingCards() {
  const [contracts, setContracts] = useState([]);

  useEffect(() => {
    getContracts();
  }, []);

  function getContracts() {
    axios
      .get('http://localhost/breif-6-1/api-Taqwa/Contracts/')
      .then(function (response) {
        setContracts(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
        gap: 2,
      }}
    >
      {contracts.map((contract) => (
        <Card key={contract.id} variant="outlined" sx={{ padding: 2 }}>
          <Chip label="Our Offer" variant="outlined" color="secondary" />
          <Typography variant="h2" component="div" fontSize="xl3">
            {contract.contract_name}
          </Typography>
          <Divider variant="middle" />
          <List
            sx={{
              mx: 'calc(-1 * var(--ListItem-paddingX))',
            }}
          >
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary={`Signing: ${contract.signing_date}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary={`Expiration: ${contract.expiration_date}`} />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckIcon />
              </ListItemIcon>
              <ListItemText primary={`Total Cost: ${contract.total_cost}  $ / Year`} />
            </ListItem>
          </List>
          <Divider variant="middle" />
        </Card>
      ))}
    </Box>
  );
}

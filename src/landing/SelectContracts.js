import React, { useEffect, useState } from 'react';
import { Grid, Typography, TextField, Container  } from '@mui/material';


// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

const SelectContracts = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const user_id = window.localStorage.getItem('id');

  useEffect(() => {
    fetch(`http://localhost/breif-6-1/api-mohammad/contracts/${user_id}`)
      .then(response => response.json())
      .then(data => {
        const filteredData = data.contracts.filter(contract => contract.status === 'open');
        setData(filteredData);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user_id]);

  const filteredData = data.filter(item =>
    item.contract_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container style={{ textAlign: 'center' }}>
    <MainCard
      title="This is Your Contracts That Work Now ,
       you can select other contract from the show offer above"
      secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}
    >
      <TextField
        label="Search by Contract Name"
        value={searchQuery}
        onChange={handleSearch}
        fullWidth
        margin="normal"
      />

      <Grid container spacing={gridSpacing}>
        {filteredData.map(item => (
          <Grid item xs={12} sm={3} key={item.id}>
            <SubCard title={item.contract_name}>
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <Typography variant="subtitle1" gutterBottom>
                    Signing Date: {item.signing_date}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Expiration Date: {item.expiration_date}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    User Name: {item.user_name}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Email: {item.email}
                  </Typography>
                  <Typography variant="subtitle1" gutterBottom>
                    Employee Name: {item.employee_name}
                  </Typography>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        ))}
      </Grid>
    </MainCard>
    </Container>
  );
};

export default SelectContracts;

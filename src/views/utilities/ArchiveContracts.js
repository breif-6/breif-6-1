import React, { useEffect, useState } from 'react';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const ArchiveContracts = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('http://localhost/breaf-6/api-mohammad/contracts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  return (
    <MainCard title="Basic Typography" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
      <Grid container spacing={gridSpacing}>
        {data.contracts && data.contracts.map(item => {
          if (item.status === 'close') {
            return (
              <Grid item xs={12} sm={6} key={item.id}>
                <SubCard title="Fetched Data">
                  <Grid container direction="column" spacing={1}>
                    <Grid item>
                      <Typography variant="subtitle1" gutterBottom>
                        ID: {item.id}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Status: {item.status}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Signing Date: {item.signing_date}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Expiration Date: {item.expiration_date}
                      </Typography>
                      <Typography variant="subtitle1" gutterBottom>
                        Contract Name: {item.contract_name}
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
            );
          }
          return null;
        })}
      </Grid>
    </MainCard>
  );
};

export default ArchiveContracts;

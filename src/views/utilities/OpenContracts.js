import React, { useEffect, useState } from 'react';
import { Grid, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Typography from '@mui/material/Typography';
import { Alert, AlertTitle } from '@mui/material';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const OpenContracts = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    fetch('http://localhost/breif-6-1/api-mohammad/contracts')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error(error));
  }, []);

  const handleDelete = (id) => {
    setSelectedItem(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    setDeleteDialogOpen(false);

    fetch(`http://localhost/breif-6-1/api-mohammad/${selectedItem}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: selectedItem }),
    })
      .then((response) => response.json())
      .then(() => {
        setSuccessMessage(
          'The contract has been deleted successfully. You can view it in the archive table section.'
        );
        setWarningMessage(null);

        // Remove the specific item from the data state
        setData((prevData) =>
          prevData.filter((item) => item.id !== selectedItem)
        );
      })
      .catch((error) => {
        console.error(error);
        setSuccessMessage(null);
        setWarningMessage('An error occurred while deleting the contract.');
      });
  };

  const handleClose = () => {
    setDeleteDialogOpen(false);
  };

  return (
    <MainCard
      title="Contracts That Work Now"
      secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}
    >
      {successMessage && (
        <Alert severity={warningMessage ? 'error' : 'success'}>
          <AlertTitle>{warningMessage ? 'Error' : 'Success'}</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Grid container spacing={gridSpacing}>
            {data.contracts && data.contracts.map(item => {
          if (item.status === 'open') {
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
                    <Grid item>
                      <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>
                        Delete
                      </Button>
                    </Grid>
                  </Grid>
                </SubCard>
              </Grid>
            );
          }
          return null;
        })}
      </Grid>
      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Do you want to delete this contract and move it to the archive?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteConfirm} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default OpenContracts;

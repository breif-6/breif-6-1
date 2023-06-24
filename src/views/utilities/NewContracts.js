import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import MuiTypography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// project imports
import SubCard from 'ui-component/cards/SubCard';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';

// ==============================|| TYPOGRAPHY ||============================== //

const NewContracts = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost/breaf-6/api-mohammad/');
        console.log('Fetched data:', response.data);
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleApprove = (id) => {
    setSelectedItem(id);
    setApproveDialogOpen(true);
  };

  const handleDelete = (id) => {
    setSelectedItem(id);
    setDeleteDialogOpen(true);
  };

  const handleApproveConfirm = async () => {
    setApproveDialogOpen(false);
  
    // Find the selected contract based on the selected item ID
    const selectedContract = data.contracts.find((item) => item.id === selectedItem);
  
    if (!selectedContract) {
      console.error('Selected contract not found');
      return;
    }
  
    const updatedContract = {
      ...selectedContract,
      status: 'open',
      employee_id: selectedEmployee
    };
  
    console.log(updatedContract);
  
    try {
      // Update the contract in the API
      const response = await axios.put(`http://localhost/breaf-6/api-mohammad/${selectedItem}`, updatedContract);
      if (response.status === 200) {
        setSuccessMessage(
          'The contract has been approved successfully. You can view it in the open table section.'
        );
        setWarningMessage(null);
  
        // Update the status and employee ID in the local data state
        setData((prevData) => ({
          ...prevData,
          contracts: prevData.contracts.map((item) =>
            item.id === selectedItem ? { ...item, status: 'open', employee_id: selectedEmployee } : item
          )
        }));
      } else {
        throw new Error('Failed to update contract');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage(null);
      setWarningMessage('An error occurred while approving the contract.');
    }
  };
  
  const handleDeleteConfirm = async () => {
    setDeleteDialogOpen(false);
  
    try {
      const response = await axios.delete(`http://localhost/breaf-6/api-mohammad/${selectedItem}`, {
        headers: {
          'Content-Type': 'application/json',
        },
        data: { id: selectedItem },
      });
      if (response.status === 200) {
        setSuccessMessage(
          'The contract has been deleted successfully. You can view it in the archive table section.'
        );
        setWarningMessage(null);
  
        // Remove the specific item from the data state
        setData((prevData) => ({
          ...prevData,
          contracts: prevData.contracts.filter((item) => item.id !== selectedItem)
        }));
      } else {
        throw new Error('Failed to delete contract');
      }
    } catch (error) {
      console.error(error);
      setSuccessMessage(null);
      setWarningMessage('An error occurred while deleting the contract.');
    }
  };
  

  const handleClose = () => {
    setApproveDialogOpen(false);
    setDeleteDialogOpen(false);
  };

  // Filter contracts with status 'new'
  const newContracts = data.contracts?.filter((item) => item.status === 'new') || [];

  return (
    <MainCard
      title="New Contracts Crud"
      secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}
    >
      {successMessage && (
        <Alert severity={warningMessage ? 'error' : 'success'}>
          <AlertTitle>{warningMessage ? 'Error' : 'Success'}</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Grid container spacing={gridSpacing}>
        {newContracts.map((item) => (
          <Grid item xs={12} sm={6} key={item.id}>
            <SubCard title="Fetched Data">
              <Grid container direction="column" spacing={1}>
                <Grid item>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    ID: {item.id}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Status: {item.status}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Signing Date: {item.signing_date}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Expiration Date: {item.expiration_date}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Contract Name: {item.contract_name}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    User Name: {item.user_name}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Email: {item.email}
                  </MuiTypography>
                  <MuiTypography variant="subtitle1" gutterBottom>
                    Employee Name: {item.employee_name}
                  </MuiTypography>
                </Grid>
                <Grid item>
                  <Button variant="contained" color="primary" onClick={() => handleApprove(item.id)}>
                    Approve
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleDelete(item.id)}>
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </SubCard>
          </Grid>
        ))}
      </Grid>
      <Dialog open={approveDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Approval</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel>Employee Name</InputLabel>
            <Select
              value={selectedEmployee}
              onChange={(e) => {
                setSelectedEmployee(e.target.value);
                // setSelectedContractId(
                //   data.contracts.find((item) => item.employee_id === e.target.value)?.contract_id || ''
                // );
              }}
            >
              {data.employees && data.employees.map((item) => (
                <MenuItem key={item.employee_id} value={item.employee_id}>
                  {item.employee_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <MuiTypography variant="body1">Do you want to approve this contract?</MuiTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleApproveConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={deleteDialogOpen} onClose={handleClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <MuiTypography variant="body1">Do you want to delete this contract?</MuiTypography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>No</Button>
          <Button onClick={handleDeleteConfirm}>Yes</Button>
        </DialogActions>
      </Dialog>
    </MainCard>
  );
};

export default NewContracts;

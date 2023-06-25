import React, { useState, useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LinkIcon from '@mui/icons-material/Link';
import axios from 'axios';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { Alert, AlertTitle } from '@mui/material'; // Added Alert and AlertTitle

const API_URL = 'http://localhost/breif-6-1/api-contracts-crud';

const Contracts = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState({});
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(API_URL);
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleOpenAddDialog = () => {
    setSelectedItem({});
    setOpenAddDialog(true);
  };

  const handleSave = async () => {
    try {
      if (selectedItem.id) {
        // Update existing contract
        console.log('Updating contract:', selectedItem);
        await axios.put(API_URL + selectedItem.id, selectedItem);
        setSuccessMessage('The contract has been updated successfully.');
      } else {
        // Add new contract
        console.log('Adding contract:', selectedItem);
        await axios.post(API_URL, selectedItem);
        setSuccessMessage('The contract has been added successfully.');
      }
      setOpen(false);
      fetchData(); // Refresh the data
      setOpenAddDialog(false); // Close the add dialog
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      setSelectedItem({ id });
      setDeleteConfirmationOpen(true);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(API_URL + selectedItem.id);
      fetchData(); // Refresh the data
      setSuccessMessage('The contract has been deleted successfully.');
      setDeleteConfirmationOpen(false);
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };

  const cancelDelete = () => {
    setSelectedItem({});
    setDeleteConfirmationOpen(false);
  };

  return (
    <MainCard
      title="Tabler Icons"
      secondary={<SecondaryAction icon={<LinkIcon fontSize="small" />} link="https://tablericons.com/" />}
    >
      {successMessage && (
        <Alert severity="success">
          <AlertTitle>Success</AlertTitle>
          {successMessage}
        </Alert>
      )}
      <Paper sx={{ overflow: 'hidden' }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Contract Name</TableCell>
                <TableCell>Signing Date</TableCell>
                <TableCell>Expiration Date</TableCell>
                <TableCell>Total Cost</TableCell>
                <TableCell>Employee ID</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{item.contract_name}</TableCell>
                  <TableCell>{item.signing_date}</TableCell>
                  <TableCell>{item.expiration_date}</TableCell>
                  <TableCell>{item.total_cost}</TableCell>
                  <TableCell>{item.employee_id}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpen(item)}>View</Button>
                    <Button onClick={() => handleOpen(item)}>Edit</Button>
                    <Button onClick={() => handleDelete(item.id)}>Delete</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>{selectedItem.id ? 'Edit' : 'Add'} Item</DialogTitle>
          <DialogContent>
            <TextField
              label="Contract Name"
              value={selectedItem.contract_name || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, contract_name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              label="Signing Date"
              value={selectedItem.signing_date || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, signing_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              type="date"
              label="Expiration Date"
              value={selectedItem.expiration_date || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, expiration_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="Total Cost"
              value={selectedItem.total_cost || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, total_cost: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee ID"
              value={selectedItem.employee_id || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, employee_id: e.target.value })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={openAddDialog} onClose={() => setOpenAddDialog(false)}>
          <DialogTitle>Add New Contract</DialogTitle>
          <DialogContent>
            <TextField
              label="Contract Name"
              value={selectedItem.contract_name || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, contract_name: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              type="date"
              label="Signing Date"
              value={selectedItem.signing_date || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, signing_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              type="date"
              label="Expiration Date"
              value={selectedItem.expiration_date || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, expiration_date: e.target.value })}
              fullWidth
              InputLabelProps={{ shrink: true }}
              margin="normal"
            />
            <TextField
              label="Total Cost"
              value={selectedItem.total_cost || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, total_cost: e.target.value })}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Employee ID"
              value={selectedItem.employee_id || ''}
              onChange={(e) => setSelectedItem({ ...selectedItem, employee_id: e.target.value })}
              fullWidth
              margin="normal"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenAddDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
        <Dialog open={deleteConfirmationOpen} onClose={() => setDeleteConfirmationOpen(false)}>
          <DialogTitle>Confirmation</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this contract?
          </DialogContent>
          <DialogActions>
            <Button onClick={cancelDelete}>Cancel</Button>
            <Button onClick={confirmDelete}>Delete</Button>
          </DialogActions>
        </Dialog>
      </Paper>
      <Button
        variant="contained"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleOpenAddDialog}
        sx={{ mt: 3 }}
      >
        Add Contract
      </Button>
    </MainCard>
  );
};

export default Contracts;

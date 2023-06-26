import React, { useEffect, useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button
} from '@mui/material';
import { Edit } from '@mui/icons-material';
// import { Link } from 'react-router-dom';
import axios from 'axios';

const ProfileStatistics = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editedUser, setEditedUser] = useState(null);
  const user_id = window.localStorage.getItem('id');

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    axios
      .get('http://localhost/breif-6-1/api-talal&rand/user/index')
      .then(response => {
        const filteredUsers = response.data.filter(user => user.id == user_id);
        setUsers(filteredUsers);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const handleEdit = user => {
    setEditedUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setEditedUser(null);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setEditedUser(prevUser => ({
      ...prevUser,
      [name]: value
    }));
  };

  const handleSave = () => {
    axios
      .put(`http://localhost/breif-6-1/api-talal&rand/user/${editedUser.id}`, editedUser)
      .then(() => {
        const updatedUsers = users.map(user => (user.id === editedUser.id ? editedUser : user));
        setUsers(updatedUsers);
        handleClose();
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <section id="userprofile">
      <Container className="py-5" sx={{ height: '70vh' }}>
        <Grid container justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
          <Grid item md={6} mb={4} mb-lg={0}>
            <Card sx={{ borderRadius: '.5rem', border: '1px solid #ccc' }}>
              <Grid container>
                <Grid
                  item
                  md={2}
                  className="gradient-custom text-center text-white"
                  sx={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}
                >
                  <Typography>Web Designer</Typography>
                  {users.map(user => (
                    <IconButton key={user.id} size="small" onClick={() => handleEdit(user)}>
                      <Edit />
                    </IconButton>
                  ))}
                </Grid>
                <Grid item md={8}>
                  <CardContent sx={{ p: 4 }}>
                    <Typography variant="h6">Information</Typography>
                    <Divider sx={{ mt: 0, mb: 4 }} />
                    <Grid container pt={1}>
                      {users.map(user => (
                        <React.Fragment key={user.id}>
                          <Grid item xs={6} mb={3}>
                            <Typography variant="h6">Name</Typography>
                            <Typography color="textSecondary">{user.name}</Typography>
                          </Grid>
                          <Grid item xs={6} mb={3}>
                            <Typography variant="h6">Email</Typography>
                            <Typography color="textSecondary">{user.email}</Typography>
                          </Grid>
                          <Grid item xs={9} mb={3}>
                            <Typography variant="h6">Phone</Typography>
                            <Typography color="textSecondary">{user.mobile}</Typography>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                    <Grid container pt={1}>
                      {users.map(user => (
                        <React.Fragment key={user.id}>
                          <Grid item xs={6} mb={3}>
                            <Typography variant="h6">Age</Typography>
                            <Typography color="textSecondary">{user.age}</Typography>
                          </Grid>
                          <Grid item xs={6} mb={3}>
                            <Typography variant="h6">Address</Typography>
                            <Typography color="textSecondary">{user.address}</Typography>
                          </Grid>
                        </React.Fragment>
                      ))}
                    </Grid>
                  </CardContent>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit User</DialogTitle>
        <DialogContent>
          {editedUser && (
            <>
              <TextField
                label="Name"
                fullWidth
                name="name"
                value={editedUser.name || ''}
                onChange={handleInputChange}
              />
              <TextField
                label="Email"
                fullWidth
                name="email"
                value={editedUser.email || ''}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone"
                fullWidth
                name="mobile"
                value={editedUser.mobile || ''}
                onChange={handleInputChange}
              />
              <TextField
                label="Age"
                fullWidth
                name="age"
                value={editedUser.age || ''}
                onChange={handleInputChange}
              />
              <TextField
                label="Address"
                fullWidth
                name="address"
                value={editedUser.address || ''}
                onChange={handleInputChange}
              />
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </section>
  );
};

export default ProfileStatistics;

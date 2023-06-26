import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import image1 from "../images/img1.png";
import image2 from "../images/img2.jpeg";
import image3 from "../images/img3.jpg";


export default function ContractList() {
  const [contracts, setContracts] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [user, setUser] = useState(null);
  const [employeeId, setEmployeeId] = useState(null);
  const [contractId, setContractId] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [warningMessage, setWarningMessage] = useState(false); // Added missing state variable

  useEffect(() => {
    getContracts();
  }, []);

  const handleApproval = (event) => {
    event.preventDefault();

    const data = {
      user_id: localStorage.getItem('id'), // Get the user_id from local storage
      employee_id: employeeId,
      contract_id: contractId,
    };

    axios
      .post('http://localhost/breif-6-1/api-user-contracts/contract/save', data)
      .then(function (response) {
        console.log(response.data);
        closeAddNew();
        if (response.status === 200) {
          setSuccessMessage(
            'The contract has been approved successfully. You can view it in the open table section.'
          );
          // navigate('/free/ContractList'); // You need to import the 'navigate' function from your router library
        }
      })
      .catch(function (error) { // Added error handling
        console.log(error);
        setWarningMessage(true);
        setSuccessMessage('An error occurred while approving the contract.');
      });
  };

  function getContracts() {
    axios.get('http://localhost/breif-6-1/api-Taqwa/Contracts/').then(function (response) {
      console.log(response.data);
      setContracts(response.data);
    });
  }

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const openCompanyDetails = () => {
    setOpenDialog(true);
  };

  const closeCompanyDetails = () => {
    setOpenDialog(false);
  };

  const openAddNew = (user_id, employee_id, contract_id) => {
    setAddNew(true);
    setUser(user_id);
    setEmployeeId(employee_id);
    setContractId(contract_id);
  };

  const closeAddNew = () => {
    setAddNew(false);
  };

  function getRemainingDays(expirationDate) {
    const currentDate = new Date();
    const end = new Date(expirationDate);
    const diffInTime = end.getTime() - currentDate.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 3600 * 24));
    return diffInDays;
  }

  return (
    <>
      {successMessage && (
        <Alert severity={warningMessage ? 'error' : 'success'}>
          <AlertTitle>{warningMessage ? 'Error' : 'Success'}</AlertTitle>
          {successMessage}
        </Alert>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', textAlign: 'center', margin: '80px' }}>
          {contracts.map((contract) => {
            const remainingDays = getRemainingDays(contract.expiration_date);
            let alertType;
            if (remainingDays <= 3) {
              alertType = 'alert-danger'; // Red color
            } else if (remainingDays <= 10) {
              alertType = 'alert-warning'; // Yellow color
            } else {
              alertType = 'alert-success'; // Green color
            }

            // Check if the contract has expired
            const currentDate = new Date();
            const expirationDate = new Date(contract.expiration_date);
            if (expirationDate < currentDate) {
              return null; // Skip rendering this contract
            }

            let selectedImage;
            if (contract.id === 2) {
              selectedImage = image1;
            } else if (contract.id === 3) {
              selectedImage = image2;
            } else if (contract.id === 4) {
              selectedImage = image3;
            }

            return (
              <div className="card" key={contract.id} style={{ width: '23rem' }} id="contractlist">
                <div className="card-body">
                  <h4 className="card-title">{contract.contract_name}</h4>
                  <img style={{ margin:'5px' }} src={selectedImage} className="card-img-top" alt="..." />
                  <p className="card-text">
                    <strong>Signing:</strong> {contract.signing_date}
                  </p>
                  <p className="card-text">
                    <strong>Expiration:</strong> {contract.expiration_date}
                  </p>
                  <p className="card-text">
                    <strong>Total Cost:</strong> {contract.total_cost}
                  </p>
                  <p className="card-text">
                    <strong>Employee Number:</strong> {contract.employee_id}
                  </p>
                  <div className="card-footer" style={{ textAlign: 'center' }}>
                    <button className="btn btn-primary" onClick={openPopup}>
                      Contract Details
                    </button>
                    <button className="btn btn-primary m-2" onClick={openCompanyDetails}>
                      Company Details
                    </button>
                    <br />
                    <button className="btn btn-primary" onClick={() => openAddNew(user, contract.employee_id, contract.id)}>
                      Add New
                    </button>
                    <div className={`alert p-4 ${alertType} m-3`}>
                      <span>Left for this offer: {remainingDays} Days</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Dialog open={showPopup} onClose={closePopup} maxWidth="sm" fullWidth>
        <DialogTitle>Contract Details:</DialogTitle>
        <DialogContent>
          <div>
            <p>Annual contracts</p>
            <p>Scope of Services:</p> The Provider agrees to deliver premium system services to the Client as outlined in the accompanying service agreement. <p> </p>
            <p>Term:</p> This Contract shall commence on the effective date stated herein and shall remain in effect for the duration specified in the service agreement, unless terminated earlier as per the termination provisions outlined within. <p> </p>
            <p>Payment and Fees:</p> The Client agrees to compensate the Provider according to the payment terms outlined in the service agreement.<p> </p>
            <p>Confidentiality:</p> Both Parties acknowledge their obligation to maintain the confidentiality of any proprietary or sensitive information disclosed during the course of this Contract. This obligation extends beyond the termination of this Contract. <p> </p>
            <p>Termination:</p> Either Party may terminate this Contract by providing written notice to the other Party in accordance with the termination provisions specified in the service agreement. <p> </p>
            <p>Governing Law:</p> This Contract shall be governed by and construed in accordance with the laws of the jurisdiction specified in the service agreement. Any disputes arising out of or relating to this Contract shall be resolved through negotiation, and if necessary, through arbitration or the appropriate courts. <p> </p>
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={closePopup} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={closeCompanyDetails} maxWidth="sm" fullWidth>
        <DialogTitle>Company Details:</DialogTitle>
        <DialogContent>
          <p>
            Welcome to our network company! We are a leading provider of advanced networking solutions for businesses of all sizes. <p></p> With our state-of-the-art technology and expert team, we deliver reliable and high-performance networking infrastructure tailored to meet your specific needs.
            <p></p> Whether you require secure data connectivity, seamless wireless networks, or robust network management, we have you covered.
            <p></p> Our commitment to exceptional service ensures that your network operates smoothly, allowing you to focus on your core business.
            <p></p> Trust us for all your networking requirements and experience the power of a reliable and efficient network infrastructure
          </p>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCompanyDetails} color="primary">
            Ok
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={addNew} onClose={closeAddNew} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Contract:</DialogTitle>
        <DialogContent>
          <form onSubmit={handleApproval}>
            <div>
              <input type="text" name="user_id" value={user} hidden />
            </div>
            <div>
              <input type="text" name="employee_id" value={employeeId} hidden />
            </div>
            <div>
              <input type="text" name="contract_id" value={contractId} hidden />
            </div>
            <DialogContent>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked required />
                <label className="form-check-label" htmlFor="flexCheckChecked">
                  I have read and understood the terms and conditions of the contract and hereby approve its conclusion.
                </label>
              </div>
            </DialogContent>
            <DialogActions>
              <Button type="submit" color="primary">
                Approve
              </Button>
              <Button onClick={closeAddNew} color="secondary">
                Cancel
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from 'react';


export default function ContractList() {
    const [contracts, setContracts] = useState([]);

    useEffect(() => {
        getContracts();
    }, []);

    function getContracts() {
        axios.get('http://localhost/api-Taqwa/Contracts/').then(function(response) {
            console.log(response.data);
            setContracts(response.data);
        });
    }

    // const deleteContract = (id) => {
    //     axios.delete(`http://localhost/api-/Contract/${id}/delete`).then(function(response){
    //         console.log(response.data);
    //         getContracts();
        // });
    // }

    return (
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', margin: '50px' }}>
      {contracts.map((contract, index) => (
        <div className="card" key={contract.id} style={{ width: '18rem', textAlign:'center' }}>
          <div className="card-body">
            <h5 className="card-title">{contract.contract_name}</h5>
            <p className="card-text">
              <strong>Signing Date:</strong> {contract.signing_date}
            </p>
            <p className="card-text">
              <strong>Expiration Date:</strong> {contract.expiration_date}
            </p>
            <p className="card-text">
              <strong>Total Cost:</strong> {contract.total_cost}
            </p>
            <p className="card-text">
              <strong>Employee Number:</strong> {contract.employee_id}
            </p>
            <div className="card-footer">
              <button className="btn btn-primary m-2">Contract Details</button>
              <button className="btn btn-primary m-2">Company Details</button>
            </div>
          </div>
        </div>
      ))}
    </div>
    )
}







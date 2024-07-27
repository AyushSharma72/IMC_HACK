import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress,
  Menu,
  MenuItem,
} from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../Context/auth";
import Header from "../components/layout/Header";

const RequestPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedRequestId, setSelectedRequestId] = useState(null);

  useEffect(() => {
    async function fetchRequests() {
      try {
        const response = await fetch(`http://localhost:8000/api/v1/request/ListAllRequests/${auth?.Department?._id}`);
        const data = await response.json();
        if (data.success) { 
          setRequests(data.requests);
        } else {
          if(data.status === 400){
            toast('No requests');
          }
        }
      } catch (error) {
        toast.error('Error fetching requests');
      } finally {
        setLoading(false);
      }
    }

    fetchRequests();
  }, [auth]);

  const handleMenuClick = (event, requestId) => {
    setAnchorEl(event.currentTarget);
    setSelectedRequestId(requestId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRequestId(null);
  };

  const handleAction = async (requestId, action) => {
    // Implement action handler logic here
    console.log(`Request ID: ${requestId}, Action: ${action}`);
    handleMenuClose();

    // Example: make an API call to update the request status
    try {
      const response = await fetch(`http://localhost:8000/api/v1/request/UpdateRequestStatus/${requestId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: action }),
      });
      const data = await response.json();
      if (data.success) {
        setRequests((prevRequests) =>
          prevRequests.map((request) =>
            request._id === requestId ? { ...request, status: action } : request
          )
        );
        toast.success(`Request ${action}`);
      } else {
        toast.error('Failed to update request');
      }
    } catch (error) {
      toast.error('Error updating request');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Header />
      <ToastContainer />
      <Typography variant="h4" component="h1" gutterBottom>
        Incoming Requests
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Item Name</TableCell>
              <TableCell>Department</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {requests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>{request.material.MaterialName}</TableCell>
                <TableCell>{request.From.DepartmentName}</TableCell>
                <TableCell>{request.Quantity}</TableCell>
                <TableCell>{request.status || "Pending"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    aria-controls="simple-menu"
                    aria-haspopup="true"
                    onClick={(event) => handleMenuClick(event, request._id)}
                  >
                    Actions
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem onClick={() => handleAction(selectedRequestId, 'Approved')}>Approve</MenuItem>
                    <MenuItem onClick={() => handleAction(selectedRequestId, 'Rejected')}>Reject</MenuItem>
                    <MenuItem onClick={() => handleAction(selectedRequestId, 'Pending')}>Pending</MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default RequestPage;

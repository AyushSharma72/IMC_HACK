import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../components/layout/Header";
import { useNavigate } from "react-router-dom";

const calculateStatus = (expiryDate, quantity) => {
  const now = new Date();
  const expDate = new Date(expiryDate);

  const oneMonthFromNow = new Date(now);
  oneMonthFromNow.setMonth(now.getMonth() + 1);

  if (quantity <= 0) {
    return "Unavailable";
  }

  if (expDate < now) {
    return "Expired";
  }

  if (expDate <= oneMonthFromNow) {
    return "Expires in 1 Month";
  }

  return "Available";
};

const getStatusColor = (status) => {
  switch (status) {
    case "Available":
      return "green";
    case "Expires in 1 Month":
      return "red";
    case "Expired":
      return "red";
    case "Unavailable":
      return "purple";
    default:
      return "black";
  }
};

const Itemshow = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [departmentName, setDepartmentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.Department) {
      setDepartmentName(auth.Department.DepartmentName);
    }

    async function fetchMaterials() {
      try {
        const response = await fetch(
          "http://localhost:8000/api/v1/materials/GetMaterials"
        );
        const data = await response.json();
        if (data.success === "true") {
          setMaterials(data.materials);
          console.log(data.materials);
        } else {
          toast.error("Failed to fetch materials");
        }
      } catch (error) {
        toast.error("Error fetching materials");
      } finally {
        setLoading(false);
      }
    }

    fetchMaterials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="container mx-auto p-6">
        <ToastContainer />
        <Typography variant="h4" component="h1" gutterBottom>
          {departmentName} - Materials List
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => {
            navigate("/allitems");
          }}
          style={{ marginRight: "1rem" }}
        >
          Allitems
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => navigate("/waste")}
          style={{ marginRight: "1rem" }}
        >
          Show Expired Items
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate("/outofstock")}
        >
          Show Out of Stock Items
        </Button>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Material Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Unit Price</TableCell>
                <TableCell>Seller</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {materials.map((material) => {
                const status = calculateStatus(
                  material.expiryDate,
                  material.quantity
                );
                const color = getStatusColor(status);

                return (
                  <TableRow key={material._id}>
                    <TableCell>{material.MaterialName}</TableCell>
                    <TableCell>{material.Description}</TableCell>
                    <TableCell>{material.quantity}</TableCell>
                    <TableCell>{material.UnitPrice}</TableCell>
                    <TableCell>{material.Seller}</TableCell>
                    <TableCell>{material.Department.DepartmentName}</TableCell>
                    <TableCell style={{ color }}>{status}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export default Itemshow;

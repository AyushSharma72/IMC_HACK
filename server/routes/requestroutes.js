const express = require("express");
const {
  Addnewrequest,
  ListDepartmentRequests,
} = require("../controllers/RequestController");
const router = express.Router();

router.post("/Addnewrequest/:materialid/:from/:to", Addnewrequest);

router.get("/ListAllRequests/:departmentId", ListDepartmentRequests);
module.exports = router;

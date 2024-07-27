const express = require("express");
const {
  createSupplier,
  listSuppliers,
  listSuppliersitems,
  supplierLoginController,
} = require("../controllers/supplierController");
const router = express.Router();

router.post("/addsupplier", createSupplier);
router.get("/listSupplier", listSuppliers);
router.post("/SupplierLogin", supplierLoginController);
router.get("/suppshowitems/:name", listSuppliersitems);

module.exports = router;

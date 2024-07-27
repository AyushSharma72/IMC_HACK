const express = require("express");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const {
  GetAllMaterials,
  AddNewMaterials,
} = require("../controllers/Materialcontroller");

const { uploadMaterial } = require("../controllers/exceltojson");

const router = express.Router();

router.post("/AddMaterials", AddNewMaterials);

router.post("/AddMaterials/:createdBy", AddNewMaterials);
router.get("/GetMaterials", GetAllMaterials);

router.post("/upload", upload.single("File"), uploadMaterial);

module.exports = router;

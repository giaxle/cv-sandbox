const express = require("express");
const {
  fetchResumeData,
  updateResumeData,
} = require("../controllers/resumeController");
const { protect } = require("../middleware/auth");
const router = express.Router();

router.route("/:userId").get(protect, fetchResumeData);
router.route("/update").put(protect, updateResumeData);

module.exports = router;

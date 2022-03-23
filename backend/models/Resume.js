const mongoose = require("mongoose");

const resumeSchema = mongoose.Schema(
  {
    userId: { type: String },
    contact: { type: Object },
    skills: { type: Array },
    experience: { type: Array },
    education: { type: Array },
  },
  { timeStamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = { Resume };

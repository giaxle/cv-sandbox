const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");
const { Resume } = require("../models/Resume");

const fetchResumeData = asyncHandler(async (req, res, next) => {
  const userId = req.params.userId;

  const resume = await Resume.findOne({ userId: userId });

  if (resume) {
    res.json(resume);
  } else {
    next(new ErrorResponse("No resume data", 404));
  }
});

const updateResumeData = asyncHandler(async (req, res, next) => {
  const { userId, contact, skills, experience, education } = req.body;

  const updatedResume = await Resume.findOneAndUpdate(
    { userId: userId },
    {
      contact: contact,
      skills: skills,
      experience: experience,
      education: education,
    },
    { new: true }
  );

  if (!updateResumeData) {
    res.status(404);
    throw new Error("Resume data not found");
  } else {
    res.json(updatedResume);
  }
});

module.exports = { fetchResumeData, updateResumeData };

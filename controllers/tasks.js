const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const getTasks = asyncHandler(async (req, res) => {});
const createTask = asyncHandler(async (req, res) => {});
const getTask = asyncHandler(async (req, res) => {});
const updateTask = asyncHandler(async () => {});
const deleteTask = asyncHandler(async () => {});
const updateTaskStatus = asyncHandler(async () => {});

module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};

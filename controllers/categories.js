const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

const getCategories = asyncHandler(async (req, res) => {});
const createCategory = asyncHandler(async (req, res) => {});
const updateCategory = asyncHandler(async (req, res) => {});
const deleteCategory = asyncHandler(async (req, res) => {});
const getCategoryTasks = asyncHandler(async (req, res) => {});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTasks,
};

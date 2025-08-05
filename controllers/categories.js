const asyncHandler = require("../utils/asyncHandler");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");
const {
  readObj,
  createObj,
  updateObj,
  deleteObj,
  readObjs,
} = require("../utils/fileDatabase");

const getCategories = asyncHandler(async (req, res) => {
  const categories = await readObjs("categories");

  if (categories.length === 0) {
    return res.status(200).json(new ApiResponse(200, "No categories found."));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "All categories.", categories));
});
const createCategory = asyncHandler(async (req, res) => {
  const { name = null, color = "#33B5FF" } = req.body || {};

  if (!name) throw new ApiError(400, "Missing required fields.");

  const createdCategory = await createObj("categories", {
    name,
    color,
  });

  if (!createdCategory) throw new ApiError(400, "Failed to create category.");

  return res
    .status(200)
    .json(new ApiResponse(200, "Category created successful.", createCategory));
});
const updateCategory = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const updates = req.body || {};

  if (!updates || Object.keys(updates).length === 0) {
    throw new ApiError(400, "Request body is empty.");
  }

  const existingCategory = await readObj("categories", id);
  if (!existingCategory) {
    throw new ApiError(400, "Category not found.");
  }

  const allowedUpdates = {};
  for (const key of Object.keys(updates)) {
    if (key in existingCategory) {
      allowedUpdates[key] = updates[key];
    }
  }

  if (Object.keys(allowedUpdates).length === 0) {
    throw new ApiError(400, "No valid fields to update.");
  }

  const updatedCategory = await updateObj("categories", id, allowedUpdates);
  if (!updateCategory) {
    throw new ApiError(500, "Failed to update category");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Category updated.", updateCategory));
});
const deleteCategory = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const categoryDeleted = await deleteObj("categories", id);

  if (!categoryDeleted) {
    throw new ApiError(400, "Invalid category id.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Category deleted successful."));
});

const getCategoryTasks = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  if (id.trim() === "" || id.length > 2) {
    throw new ApiError(400, "Invalid category id.");
  }

  const tasks = await readObjs("tasks");
  if (tasks.length === 0) {
    throw new ApiError(400, "Tasks list is empty.");
  }

  const filteredTasks = tasks.filter((task) => task.categoryId === id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Filtered tasks.", filteredTasks));
});

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTasks,
};

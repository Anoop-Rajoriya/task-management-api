const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const { addBulk } = require("../utils/fileDatabase");

const seedData = asyncHandler(async (req, res) => {
  const createdTasks = await addBulk("tasks", "/seed/tasks.json");
  if (createdTasks.length === 0)
    throw new ApiError(500, "Bulk tasks add failed.");

  const createdCategories = await addBulk(
    "categories",
    "/seed/categories.json"
  );
  if (createdCategories.length === 0)
    throw new ApiError(500, "Bulk categories add failed.");

  res.status(200).json(new ApiResponse(200, "Seed process complete."));
});

module.exports = seedData;

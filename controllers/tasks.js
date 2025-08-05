const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const {
  createObj,
  readObj,
  readObjs,
  updateObj,
  deleteObj,
} = require("../utils/fileDatabase");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await readObjs("tasks");
  if (tasks.length === 0) {
    return res.status(200).json(new ApiResponse(200, "No tasks found."));
  }

  return res.status(200).json(new ApiResponse(200, "All tasks.", tasks));
});
const createTask = asyncHandler(async (req, res) => {
  const {
    title = null,
    description = null,
    dueDate = null,
    priority = null,
    status = "pending",
  } = req.body || {};

  if (!title || !description || !dueDate || !priority) {
    throw new ApiError(400, "Missing required fields.");
  }

  const createdTask = await createObj("tasks", {
    title,
    description,
    dueDate,
    priority,
    status,
  });

  if (!createdTask) {
    throw new ApiError(400, "Failed to write DB.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task created successful.", createdTask));
});
const getTask = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const task = await readObj("tasks", id);

  if (!task) throw new ApiError(400, "Invalid id.");
  return res.status(200).json(new ApiResponse(200, "Task founded.", task));
});
const updateTask = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const updates = req.body || {};

  if (!updates && Object.keys(updates).length === 0) {
    throw new ApiError(400, "Request body is empty.");
  }

  const existingTask = await readObj("tasks", id);
  if (!existingTask) {
    throw new ApiError(400, "Task not found.");
  }

  const allowedUpdates = {};
  for (const key of Object.keys(updates)) {
    if (key in existingTask) {
      allowedUpdates[key] = updates[key];
    }
  }

  if (Object.keys(allowedUpdates).length === 0) {
    throw new ApiError(400, "No valid fields to update.");
  }

  const updatedTask = await updateObj("tasks", id, allowedUpdates);
  if (!updatedTask) {
    throw new ApiError(500, "Failed to update task.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task updated.", updatedTask));
});
const deleteTask = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  const taskDeleted = await deleteObj("tasks", id);

  if (!taskDeleted) {
    throw new ApiError(400, "Invalid task id.");
  }

  return res.status(200).json(new ApiResponse(200, "Task deleted successful."));
});
const updateTaskStatus = asyncHandler(async (req, res) => {
  const id = req.params?.id;
  const { status } = req.body || {};

  if (!status) {
    throw new ApiError(400, "Missing status in request body.");
  }

  const existingTask = await readObj("tasks", id);
  if (!existingTask) {
    throw new ApiError(400, "Task not found.");
  }

  const validStatuses = ["pending", "in-progress", "completed"];
  if (!validStatuses.includes(status)) {
    throw new ApiError(
      400,
      `Invalid status. Valid values: ${validStatuses.join(", ")}`
    );
  }

  const updatedTask = await updateObj("tasks", id, { status });

  if (!updatedTask) {
    throw new ApiError(500, "Failed to update task status.");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Task status updated.", updatedTask));
});

module.exports = {
  getTask,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
};

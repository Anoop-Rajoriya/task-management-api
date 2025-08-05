const router = require("express").Router();
const {
  getTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  addTaskCategory
} = require("../controllers/tasks");

// GET: Get all user tasks.
// POST: Create new task.
router.route("/").get(getTasks).post(createTask);

// GET: Get specific task.
// PUT: Update taks.
// DELETE: Delete taks.
router.route("/:id").get(getTask).put(updateTask).delete(deleteTask);

// PATCH: Update taks status.
router.route("/:id/status").patch(updateTaskStatus);

// PATCH: Add taks category.
router.route("/:id/category").patch(addTaskCategory);

module.exports = router;

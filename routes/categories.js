const router = require("express").Router();
const {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategoryTasks,
} = require("../controllers/categories");

// GET: Get all categories
// POST: Create new category
router.route("/").get(getCategories).post(createCategory);

// PUT: Update category
// DELETE: Delete category
router.route("/:id").put(updateCategory).delete(deleteCategory);

// Get: Get task by category
router.route("/:id/tasks").get(getCategoryTasks);

module.exports = router;

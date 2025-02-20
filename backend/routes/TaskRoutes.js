const express = require("express");
const {
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controller/TaskController");

const ensureAuthenticated = require("../middleware/AuthMiddleware");

const router = express.Router();

router.post("/", ensureAuthenticated, createTask);
router.get("/", ensureAuthenticated, getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;

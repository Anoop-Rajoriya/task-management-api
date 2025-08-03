require("dotenv").config({ path: ".env" });

const express = require("express");
const server = express();

// Common middlewares
server.use(express.urlencoded({ extended: true }));

// Api routes
const tasksRouter = require("./routes/tasks");
const categoriesRouter = require("./routes/categories");
const errorHandler = require("./middleware/errorHandler");

server.use("/api/tasks", tasksRouter);
server.use("/api/categories", categoriesRouter);
server.use(errorHandler);

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

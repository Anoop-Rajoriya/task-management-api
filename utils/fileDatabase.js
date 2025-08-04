const path = require("path");
const fs = require("fs/promises");

const dataPath = path.join(path.dirname(__dirname), "data");

// Helper: Get full file path
const getFilePath = (fileName) => path.join(dataPath, `${fileName}.json`);

// Read all objects from the file
const readObjs = async (fileName) => {
  try {
    const file = await fs.readFile(getFilePath(fileName), "utf-8");
    return JSON.parse(file);
  } catch (err) {
    if (err.code === "ENOENT") return []; // File doesn't exist
    throw err;
  }
};

// Read a single object by ID
const readObj = async (fileName, id) => {
  const objs = await readObjs(fileName);
  return objs.find((obj) => obj.id === id) || null;
};

// Create a new object
const createObj = async (fileName, newObj) => {
  const objs = await readObjs(fileName);
  newObj.id = `${fileName[0]}${objs.length + 1}`;
  newObj.createdAt = new Date().toISOString();
  objs.push(newObj);
  await fs.writeFile(getFilePath(fileName), JSON.stringify(objs, null, 2));
  return newObj;
};

// Delete an object by ID
const deleteObj = async (fileName, id) => {
  const objs = await readObjs(fileName);
  const index = objs.findIndex((obj) => obj.id === id);
  if (index === -1) return false;

  objs.splice(index, 1);
  await fs.writeFile(getFilePath(fileName), JSON.stringify(objs, null, 2));
  return true;
};

// Update an object by ID
const updateObj = async (fileName, id, updatedFields) => {
  const objs = await readObjs(fileName);
  const index = objs.findIndex((obj) => obj.id === id);
  if (index === -1) return null;

  objs[index] = { ...objs[index], ...updatedFields };
  await fs.writeFile(getFilePath(fileName), JSON.stringify(objs, null, 2));
  return objs[index];
};

// Add bulk objects from a seed file
const addBulk = async (fileName, seedFileName) => {
  const destObjs = await readObjs(fileName);

  const seedFilePath = path.join(path.dirname(__dirname), seedFileName);
  let seedData;
  try {
    const seedContent = await fs.readFile(seedFilePath, "utf-8");
    seedData = JSON.parse(seedContent);
  } catch (err) {
    if (err.code === "ENOENT") throw new Error("Seed file not found.");
    throw err;
  }

  if (!Array.isArray(seedData))
    throw new Error("Seed file must contain an array.");

  const startIndex = destObjs.length;
  const timestamp = new Date().toISOString();

  const newObjs = seedData.map((item, i) => ({
    ...item,
    id: `${fileName[0]}${startIndex + i + 1}`,
    createdAt: timestamp,
  }));

  const updatedData = [...destObjs, ...newObjs];
  await fs.writeFile(
    getFilePath(fileName),
    JSON.stringify(updatedData, null, 2)
  );
  return newObjs;
};

module.exports = {
  createObj,
  readObj,
  readObjs,
  updateObj,
  deleteObj,
};

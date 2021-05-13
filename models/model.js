import express from "express";
import fs from "fs";
import path from "path";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const dbFilePath = path.resolve(__dirname, "../database.json");
const database = require("../database.json");

/**
 * @description - Checks if the database file exists and creates one if it doesn't
 * @param dbFilePath - The path to where the database file is stored if/when created
 * @returns - A boolean value
 */
const fileExists = fs.existsSync(dbFilePath);
if (!fileExists) {
  fs.appendFileSync("database.json", JSON.stringify([]));
}

/**
 * @description - Returns all the entries in the database
 * @returns - A stringified format of the JSON Database Object
 */
const getAllData = () => {
  return new Promise((resolve, reject) => {
    if (database.length === 0) {
      reject({ message: "Database is empty, create a new profile" });
    } else {
      resolve(JSON.stringify(database.sort((a, b) => a.id - b.id)));
    }
  });
};

/**
 * @description - Returns a single entry based on the id provided
 * @param id - The ID of the profile to be searched
 * @returns - A stringified format of the JSON Database Object
 */
const getSingleEntry = (id) => {
  return new Promise((resolve, reject) => {
    if (database.length === 0) {
      reject({ message: "Database is empty, create a new profile" });
    } else {
      const matchedEntry = database.find((element) => {
        return element.id === Number(id);
      });
      const matchedIndex = database.findIndex(
        (element) => element.id === Number(id)
      );
      resolve(JSON.stringify({ index: matchedIndex, entry: matchedEntry }));
    }
  });
};

/**
 * @description - Creates a new entry in the database
 * @param details - An Object representing the body of the POST request
 * @returns - A stringified format of the newly created JSON Object
 */
const createNewEntry = (details) => {
  return new Promise((resolve, reject) => {
    if (database.length === 0) {
      // const date = new Date().toString().split(" ").splice(0, 5).join(" ");
      const firstId = 1;

      const { name, email, country } = details;

      const newEntry = {
        // createdAt: date,
        // updatedAt: date,
        name,
        email,
        country,
        id: firstId,
      };
      database.push(newEntry);
      writeDataToFile(dbFilePath, database);
      resolve(JSON.stringify(newEntry));
    } else {
      let sortedDb = database.sort((a, b) => a.id - b.id);
      const newId = sortedDb[sortedDb.length - 1].id + 1;
      const duplicateName = database.find(
        (element) => element.name === details.name
      );

      if (!duplicateName) {
        // const date = new Date().toString().split(" ").splice(0, 5).join(" ");
        const { name, email, country } = details;

        const newEntry = {
          // createdAt: date,
          // updatedAt: date,
          name,
          email,
          country,
          id: newId,
        };
        database.push(newEntry);
        writeDataToFile(dbFilePath, database);
        resolve(JSON.stringify(newEntry));
      } else {
        resolve(
          JSON.stringify({
            message:
              "Duplicate Name found; New profile is not created; Try with another Username Name",
          })
        );
      }
    }
  });
};

/**
 * @description - Updates an entry/profile in the database
 * @param details - An Object representing the body of the POST request
 * @param index - The index of the profile element to be modified in the database array
 * @returns - A stringified format of the updated profile Object
 */
const updateProfile = (details, index) => {
  return new Promise((resolve, reject) => {
    // const date = new Date().toString().split(" ").splice(0, 5).join(" ");

    const oldDetails = database[index];

    const { name, country, email } = details;

    oldDetails.id;
    oldDetails.name = name || oldDetails.name;
    oldDetails.country = country;
    oldDetails.email = email || oldDetails.email;

    writeDataToFile(dbFilePath, database);
    resolve(JSON.stringify(oldDetails));
  });
};

/**
 * @description - Deletes an entry/profile from the database
 * @param index - The index of the profile element to be deleted from the database array
 * @param name - The name on the profile element
 * @param id - The ID of the profile element
 * @returns - A string - that gives some details about the profile that was deleted
 */
const deleteProfile = (index, name, id) => {
  return new Promise((resolve, reject) => {
    database.splice(index, 1);
    writeDataToFile(dbFilePath, database);

    resolve(
      JSON.stringify({
        message: `${name} with ID: ${id} successfully removed from the database`,
      })
    );
  });
};

/**
 * @description - Writes the current database to the database file
 * @param dbPath - The path to where the database file is located
 * @param content - The file/content to be appended to the database
 */
function writeDataToFile(dbPath, content) {
  fs.writeFile(
    dbPath,
    JSON.stringify(content, null, 2),
    { encoding: "utf-8" },
    (err) => {
      if (err) {
        throw err;
      }
    }
  );
}

export {
  getAllData,
  getSingleEntry,
  createNewEntry,
  updateProfile,
  deleteProfile,
};

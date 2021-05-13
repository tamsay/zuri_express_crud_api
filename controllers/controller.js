import {
  getAllData,
  getSingleEntry,
  createNewEntry,
  updateProfile,
  deleteProfile,
} from "../models/model.js";

/**
 * @description - Gets all the entries in the database
 * @param req - Incoming request parameter
 * @param res - Outgoing response result
 * @route GET /
 * @returns - A JSON Object containing all data entries in the database
 */
const getAllDatabaseEntry = async (req, res) => {
  try {
    const data = await getAllData();
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(data);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
};

/**
 * @description - Gets the details of a particular entry in the database
 * @param req - Incoming request parameter
 * @param res - Incoming request parameter
 * @param entryId - Entry ID to be searched in the database
 * @route GET /:id
 * @returns - A JSON Object containing the details of the searched profile
 */
const getSingleDatabaseEntry = async (req, res, entryId) => {
  try {
    const output = await getSingleEntry(entryId);
    const result = JSON.parse(output);

    if (result.index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "ID not found in the database" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify(result.entry));
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
};

/**
 * @description Creates an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @route POST /
 * @returns - A JSON Object showing the details of the proifle added to the database
 */
const createEntry = async (req, res) => {
  try {
    const output = JSON.stringify(req.body);
    const body = JSON.parse(output);

    const newEntry = await createNewEntry(body);

    res.writeHead(201, { "Content-Type": "application/json" });
    return res.end(newEntry);
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
};

/**
 * @description Updates an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @param id Entry ID to be updated in the database
 * @route PUT /:id
 * @returns A JSON object showing the updated profile
 */
const updateEntry = async (req, res, id) => {
  try {
    const output = await getSingleEntry(id);
    const profileEntry = JSON.parse(output);
    if (profileEntry.index === -1) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Profile Not Found" }));
    } else {
      const output = JSON.stringify(req.body);
      const body = JSON.parse(output);
      const profileDetails = await updateProfile(body, profileEntry.index);

      res.writeHead(200, { "Content-Type": "application/json" });
      return res.end(profileDetails);
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
};

/**
 * @description Deletes an entry in the database
 * @param req Incoming request parameter
 * @param res Incoming request parameter
 * @param id Entry ID to be deleted from the database
 * @route DELETE /:id
 * @returns A message showing details of the deleted profile
 */
const deleteEntry = async (req, res, id) => {
  try {
    const output = await getSingleEntry(id);
    const profileEntry = JSON.parse(output);
    const { index, entry } = profileEntry;

    if (index === -1 || index === undefined) {
      res.writeHead(404, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ message: "Profile Not Found" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      const name = entry.name;
      const deleteUser = await deleteProfile(index, name, id);
      return res.end(deleteUser);
    }
  } catch (error) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
  }
};

export {
  getAllDatabaseEntry,
  getSingleDatabaseEntry,
  createEntry,
  updateEntry,
  deleteEntry,
};

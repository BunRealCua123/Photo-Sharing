/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url      The URL to issue the GET request.
 *
 */
import axios from "axios";
async function fetchModel(modelName, id) {
  // const url = "https://w7wttj-3000.csb.app/api/user/list";
  const res = await axios.get("http://localhost:3000/api/user/list");
  return res.data;
  // return models;
}

export default fetchModel;

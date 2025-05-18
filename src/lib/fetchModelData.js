/**
 * fetchModel - Fetch a model from the web server.
 *
 * @param {string} url The URL path for the API endpoint.
 * @returns {Promise} A promise that resolves with the model data.
 */
function fetchModel(url) {
  const baseUrl = "http://localhost:8081/api";
  const fullUrl = `${baseUrl}${url}`;

  return fetch(fullUrl)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("Error fetching model:", error);
      throw error;
    });
}

export default fetchModel;

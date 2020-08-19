const BASE_URL = "http://localhost:3001";

// ------------------------------------------------------  API CALLS
const getRovers = () => fetch(`${BASE_URL}/rovers`).then((res) => res.json());


/**
 * Singleton Api class
 */
const Api = {
    getRovers: () => fetch(`${BASE_URL}/rovers`).then((res) => res.json()),
    getPhotos: rover => fetch(`${BASE_URL}/rovers/${rover}/photos`).then((res) => res.json()),
};

export default Api;
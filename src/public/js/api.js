const BASE_URL = "http://localhost:3001";
const fetchJson = async (url) => (await fetch(url)).json();

/**
 * Singleton Api class
 */
const Api = {
    getRovers: () => fetchJson(`${BASE_URL}/rovers`),
    getPhotos: rover => fetchJson(`${BASE_URL}/rovers/${rover}/photos`),
};

export default Api;

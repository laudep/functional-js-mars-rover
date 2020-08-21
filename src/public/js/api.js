const fetchJson = async (url) => (await fetch(url)).json();

/**
 * Singleton Api class
 */
const Api = {
    getRovers: () => fetchJson(`/rovers`),
    getPhotos: rover => fetchJson(`/rovers/${rover}/photos`),
};

export default Api;

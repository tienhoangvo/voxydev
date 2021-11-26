import axios from "axios";

const axiosFetcher = (url) => axios.get(url).then((res) => res.data);

export default axiosFetcher;

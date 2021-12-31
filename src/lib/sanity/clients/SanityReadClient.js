import { createClient } from "next-sanity";

const SanityReadClient = createClient(getSanityConfig());

export default SanityReadClient;

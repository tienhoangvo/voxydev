export default {
  dataset:
    process.env.NEXT_PUBLIC_SANITY_DATASET_NAME ||
    'production',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,

  apiVersion: '2021-10-21',
  useCdn: false,
};

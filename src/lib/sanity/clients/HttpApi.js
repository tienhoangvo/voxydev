import axios from 'axios';

export const HttpApiMutate = (mutations = [], params) => {
  return axios.post(
    `https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.NEXT_PUBLIC_SANITY_DATASET_NAME}`,
    { mutations },
    {
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${process.env.SANITY_EDITOR_TOKEN}`,
      },
      params,
    }
  );
};

/**
 * RTK Query base API
 */

// Need to use the React-specific entry point to import createApi
const { createApi } = require("@reduxjs/toolkit/query/react");
const { fetchBaseQuery } = require("@reduxjs/toolkit/query");

const baseQuery = fetchBaseQuery({
  baseUrl: `http://localhost:3000/api`,
  // prepareHeaders: (headers, { getState }) => {
  //   return headers;
  // },
});

// Define a base API service using a base URL and expected endpoints
// Note: Other services should be injected into this service
const baseApi = createApi({
  reducerPath: "api",
  tagTypes: ['Entry'],
  baseQuery,
  endpoints: () => ({}),
});

module.exports = baseApi;
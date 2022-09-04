/**
* Services -> Logs
 */

import base from './base';

const logsService = base.injectEndpoints({
  endpoints: (builder) => ({
    getLogs: builder.query({
      query: ({ perPage, page }) => ({
        method: 'GET',
        url: `logs?perPage=${perPage}&page=${page}`,
      })
    })
  })
})

export const {
  useGetLogsQuery
} = logsService;
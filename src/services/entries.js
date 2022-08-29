/**
* Services -> Entries
 */

import base from './base';

const entriesService = base.injectEndpoints({
  endpoints: (builder) => ({
    getEntries: builder.query({
      query: ({ perPage, page }) => ({
        method: 'GET',
        url: `entries?perPage=${perPage}&page=${page}`,
      })
    })
  })
})

export const {
  useGetEntriesQuery
} = entriesService;
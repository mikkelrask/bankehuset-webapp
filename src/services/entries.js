/**
* Services -> Entries
 */

import base from './base';

const entriesService = base.injectEndpoints({
  endpoints: (builder) => ({
    getEntries: builder.query({
      providesTags: ['ENTRY_LIST'],
      query: ({ perPage, page }) => ({
        method: 'GET',
        url: `/entries?perPage=${perPage}&page=${page}`,
      })
    }),
    deleteEntry: builder.mutation({
      invalidatesTags: ['ENTRY_LIST'],
      query: (id) => ({
        method: 'DELETE',
        url: `/${id}`,
      })
    })
  })
})

export const {
  useGetEntriesQuery,
  useDeleteEntryMutation
} = entriesService;
import React, { useState } from 'react';
import { Button } from '@mantine/core';
import  { useDeleteEntryMutation, useGetEntriesQuery } from "../services/entries";
import EntriesList from "../components/EntriesList";

const Home = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(25);

  const {
    data,
    isLoading
  } = useGetEntriesQuery({
    page,
    perPage,
  }, {
    refetchOnMountOrArgChange: true
  });

  const [deleteEntryRequest] = useDeleteEntryMutation();

  const handleDelete =  async (id) => {
    try {
      await deleteEntryRequest(id);
    } catch (err) {
      console.error('Failed to delete entry with ID', id);
    }
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data yet</div>
  }

  return (
    <div>
      <EntriesList data={data.data ?? []} onDelete={handleDelete} />
      <br /><br />
      {page > 1 ? <Button onClick={() => setPage(curr => curr - 1)}>Newer</Button> : null}{' '}
      {data.data.length >= perPage ? <Button onClick={() => setPage(curr => curr + 1)}>Older</Button> : null}
    </div>
  )
}

export default Home;

import React, { useState } from 'react';
import { Button } from '@mantine/core';
import { useGetLogsQuery } from '../services/logs';
import { format } from 'date-fns';

const LogEntry = ({ data }) => {
  const [show, setShow] = useState(false);

  return (
    <div>
      <br />
      {format(new Date(data.createdAt), 'dd/MM/yyyy h:m')}
      <h3>{data.message}</h3>
      <Button variant="subtle" style={{padding: 0}} onClick={() => setShow(curr => !curr)}>{show ? 'Hide data' : 'Show data'}</Button>
      {show ? <pre>{JSON.stringify(data.data, null, 4)}</pre> : null}
      <hr />
    </div>
  )
}

const Log = () => {
  const [page, setPage] = useState(1);
  const [perPage] = useState(200);

  const {
    data,
    isLoading
  } = useGetLogsQuery({
    page,
    perPage,
  }, {
    refetchOnMountOrArgChange: true
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!data) {
    return <div>No data yet</div>
  }

  return (
    <div>
      {data?.data?.map(logEntry => <LogEntry key={logEntry._id} data={logEntry} />)}
      <br /><br />
      {page > 1 ? <Button onClick={() => setPage(curr => curr - 1)}>Newer</Button> : null}{' '}
      {data.data.length >= perPage ? <Button onClick={() => setPage(curr => curr + 1)}>Older</Button> : null}
    </div>
  )
}

export default Log;

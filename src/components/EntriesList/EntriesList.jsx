
import React, { useState } from 'react';
import { createStyles, Table, ScrollArea, Button } from '@mantine/core';
import { format } from 'date-fns';
import '../../styles/style.css';

const Weather = (data) => {
  const [show, setShow] = useState(false);

  if (!data) {
    return null;
  }

  if (!show) {
    return <Button style={{padding: '5px', margin: '0 -5px'}} variant="subtle" onClick={() => setShow(true)}>Vis vejrdata</Button>
  }

  return (
    <>
      <Button style={{padding: '5px', margin: '0 -5px'}} variant="subtle" onClick={() => setShow(false)}>Skjul vejrdata</Button>
      <br />
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

const useStyles = createStyles((theme) => ({
  header: {
    position: 'sticky',
    top: 0,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
    transition: 'box-shadow 150ms ease',

    '&::after': {
      content: '""',
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[2]
      }`,
    },
  },

  scrolled: {
    boxShadow: theme.shadows.sm,
  },
}));

const Row = ({ data, onDelete }) => {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    await onDelete(data._id);
  }

  return (
      <tr key={data._id}>
      <td style={{ verticalAlign: 'top' }}>{format(new Date(data.createdAt), 'dd/MM/yyyy HH:mm')}</td>
      <td style={{ verticalAlign: 'top' }}>{data.temperature?.toFixed(1)}</td>
      <td style={{ verticalAlign: 'top' }}>
        <Weather data={data.data} />
      </td>
      <td style={{ verticalAlign: 'top' }}>
        <Button disabled={deleting} onClick={handleDelete}>
          Delete
        </Button>
      </td>
    </tr>
)
}

const EntriesList = ({ data, onDelete }) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
<<<<<<< HEAD
    <tr key={row._id}>
      <td style={{ verticalAlign: 'top' }}>{format(new Date(row.createdAt), 'HH:mm')}</td>
      <td style={{ verticalAlign: 'top' }}>{row.temperature}</td>
      <td style={{ verticalAlign: 'top' }}>
        <Weather data={row.data} />
      </td>
    </tr>
=======
    <Row key={row._id} data={row} onDelete={onDelete} />
>>>>>>> origin/master
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700, maxWidth: 1000 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
<<<<<<< HEAD
            <th>Tidspunkt</th>
            <th>Badevandstemperatur</th>
            <th>Vejr</th>
=======
            <th>Timestamp</th>
            <th>Temperature</th>
            <th>Weather</th>
            <th></th>
>>>>>>> origin/master
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default EntriesList;

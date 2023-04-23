
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

const EntriesList = ({ data }) => {
  const { classes, cx } = useStyles();
  const [scrolled, setScrolled] = useState(false);

  const rows = data.map((row) => (
    <tr key={row._id}>
      <td style={{ verticalAlign: 'top' }}>{format(new Date(row.createdAt), 'HH:mm')}</td>
      <td style={{ verticalAlign: 'top' }}>{row.temperature}</td>
      <td style={{ verticalAlign: 'top' }}>
        <Weather data={row.data} />
      </td>
    </tr>
  ));

  return (
    <ScrollArea onScrollPositionChange={({ y }) => setScrolled(y !== 0)}>
      <Table sx={{ minWidth: 700, maxWidth: 1000 }}>
        <thead className={cx(classes.header, { [classes.scrolled]: scrolled })}>
          <tr>
            <th>Tidspunkt</th>
            <th>Badevandstemperatur</th>
            <th>Vejr</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
}

export default EntriesList;

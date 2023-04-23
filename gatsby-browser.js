import 'tailwindcss/base.css';
import 'tailwindcss/components.css';
import 'tailwindcss/utilities.css';
import './src/styles/tailwindcss.css';
import './src/styles/style.css';

import React from "react";
import { MantineProvider } from '@mantine/core';
import { Provider as ReduxProvider } from 'react-redux';
import store from './src/store';
import { Helmet } from "react-helmet";

export const wrapRootElement = ({ element }) => {
  return (
    <ReduxProvider store={store}>
      <Helmet>
        <title>Bankehuset</title>
      </Helmet>
      <MantineProvider>
        {element}
      </MantineProvider>
    </ReduxProvider>
  )
}


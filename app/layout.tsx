'use client';

import { PersistGate } from 'redux-persist/integration/react';
import Nav from '@components/Nav';
import StoreProvider from '@redux/provider';
import { persistor } from '@redux/store';
import { DataProvider } from '@providers/DataProvider';

import '@styles/globals.css';
import SessionProvider from '@providers/SessionProvider';

const RootLayout = ({ children, session }) => (
  <html lang="en">
    <head>
      <title>Code Snippets</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Discover & Share Code Snippets" />
      <link rel="icon" href="/favicon32x32.ico" />
    </head>
    <body>
      <div className="mainWrapper">
        <div className="gradient" />
      </div>

      <SessionProvider session={session}>
        <StoreProvider>
          <PersistGate loading={null} persistor={persistor}>
            <DataProvider>
              <main className="app">
                <Nav />
                {children}
              </main>
            </DataProvider>
          </PersistGate>
        </StoreProvider>
      </SessionProvider>
    </body>
  </html>
);

export default RootLayout;

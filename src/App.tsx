import React, { Suspense, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner';
import useExchangeToken from './hooks/useExchangeToken';
import PlaylistPage from './pages/PlaylistPage/PlaylistPage';

const AppLayout = React.lazy(() => import('./layout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  const urlParams = new URLSearchParams(window.location.search);
  let code = urlParams.get('code');
  const codeVerifier = localStorage.getItem('code_verifier');

  const ranRef = useRef(false);

  const { mutate: exchangeToken } = useExchangeToken();

  useEffect(() => {
    if (code && codeVerifier) {
      ranRef.current = true;

      exchangeToken({ code, codeVerifier });
    }

    const url = new URL(window.location.href);
    url.searchParams.delete('code');
    window.history.replaceState({}, '', url.toString());
  }, [code, codeVerifier, exchangeToken]);

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='callback' element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithKeywordPage />} />
          <Route path='playlist' element={<PlaylistPage />} />
          <Route path='playlist/:id' element={<PlaylistDetailPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

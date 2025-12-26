import React, { Suspense } from 'react';
import { Route, Routes } from 'react-router';
import LoadingSpinner from './common/components/LoadingSpinner/LoadingSpinner';

const AppLayout = React.lazy(() => import('./layout/AppLayout/AppLayout'));
const HomePage = React.lazy(() => import('./pages/HomePage/HomePage'));
const SearchPage = React.lazy(() => import('./pages/SearchPage/SearchPage'));
const SearchWithKeywordPage = React.lazy(() => import('./pages/SearchWithKeywordPage/SearchWithKeywordPage'));
const PlaylistDetailPage = React.lazy(() => import('./pages/PlaylistDetailPage/PlaylistDetailPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const App = () => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<HomePage />} />
          <Route path='search' element={<SearchPage />} />
          <Route path='search/:keyword' element={<SearchWithKeywordPage />} />
          {/* <Route path='playlist' element={<PlaylistPage />} /> */}
          <Route path='playlist/:id' element={<PlaylistDetailPage />} />
        </Route>
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
};

export default App;

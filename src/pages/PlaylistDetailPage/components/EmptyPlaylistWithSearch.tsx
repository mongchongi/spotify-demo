import { Box, styled, Typography } from '@mui/material';
import { useState } from 'react';
import useSearchItemsByKeyword from '../../../hooks/useSearchItemsByKeyword';
import { searchType } from '../../../models/search';
import SearchResultList from './SearchResultList';
import SearchIcon from '@mui/icons-material/Search';
import type { Track } from '../../../models/track';

const EmptyPlaylistWithSearch = () => {
  const [keyword, setKeyword] = useState<string>('');
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } = useSearchItemsByKeyword({
    q: keyword,
    type: [searchType.Track],
  });

  const tracks =
    data?.pages.flatMap((page) => page.tracks?.items ?? []).filter((track): track is Track => !!track) ?? [];
  const hasResults = tracks.length > 0;

  const handleSearchKeyword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <Container>
      <StyledTypography variant='h2'>Let's find something for your playlist</StyledTypography>
      <StyledTextField>
        <SearchIcon />
        <input type='text' placeholder='Search...' value={keyword} onChange={handleSearchKeyword} />
      </StyledTextField>
      <ResultContainer>
        {isLoading ? (
          <LoadingMessage>Loading...</LoadingMessage>
        ) : hasResults ? (
          <SearchResultList
            list={tracks}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            fetchNextPage={fetchNextPage}
          />
        ) : keyword === '' ? (
          <></>
        ) : (
          <Box>{`No search results found for ${keyword}.`}</Box>
        )}
      </ResultContainer>
    </Container>
  );
};

export default EmptyPlaylistWithSearch;

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  gap: '16px',
  minHeight: '0',
});

const StyledTypography = styled(Typography)(({ theme }) => ({
  fontSize: '24px',
  fontWeight: '700',

  [theme.breakpoints.down('sm')]: {
    fontSize: '16px',
  },
}));

const StyledTextField = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  background: theme.palette.background.default,
  borderRadius: '8px',
  gap: '8px',

  '& input': {
    flex: '1',
    background: 'transparent',
    border: 'none',
    color: theme.palette.text.primary,

    '&:focus': {
      outline: 'none',
    },
  },
}));

const ResultContainer = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  flex: '1',
  overflow: 'hidden',
  minHeight: '0',
});

const LoadingMessage = styled('p')(({ theme }) => ({
  margin: '0',
  color: theme.palette.primary.main,
  fontWeight: '700',
}));

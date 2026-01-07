import { styled } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router';

const SearchForm = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const keyword = formData.get('keyword');

    e.preventDefault();
    navigate(`/search/${keyword}`);
  };

  return (
    <SearchFormContainer onSubmit={handleSearch}>
      <SearchIcon />
      <input type='text' placeholder='Search...' name='keyword' />
      <button hidden type='submit'></button>
    </SearchFormContainer>
  );
};

export default SearchForm;

const SearchFormContainer = styled('form')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: '12px',
  background: theme.palette.background.default,
  borderRadius: '50px',
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

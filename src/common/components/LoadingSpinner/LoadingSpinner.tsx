import { styled } from '@mui/material';
import equalizer from '../../../assets/equalizer.gif';

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerWrapper>
      <LoadingSpinnerImage src={equalizer} alt='equalizer gif' />
    </LoadingSpinnerWrapper>
  );
};

export default LoadingSpinner;

const LoadingSpinnerWrapper = styled('div')({
  position: 'fixed',
  top: '0',
  left: '0',
  width: '100%',
  height: '100%',
  background: '#1C1E2A',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

const LoadingSpinnerImage = styled('img')({
  display: 'block',
});

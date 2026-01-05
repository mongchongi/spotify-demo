import { ListItem, ListItemButton, styled, Typography } from '@mui/material';
import type { Category } from '../../../models/category';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem = ({ category }: CategoryItemProps) => {
  const getCategoryColor = (id: string) => {
    const s = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);

    const hue = s % 360;

    return `hsl(${hue}, 40%, 50%)`;
  };

  return (
    <ListItem sx={{ padding: '0' }}>
      <StyledListItemButton style={{ background: getCategoryColor(category.id) }}>
        <Typography variant='h2' fontWeight={700}>
          {category.name}
        </Typography>
        <CategoryImage src={category.icons[0].url} alt={category.name} />
      </StyledListItemButton>
    </ListItem>
  );
};

export default CategoryItem;

const StyledListItemButton = styled(ListItemButton)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  aspectRatio: '1.5 / 1',
  borderRadius: '8px',
  position: 'relative',
  overflow: 'hidden',
});

const CategoryImage = styled('img')({
  position: 'absolute',
  right: '-10%',
  bottom: '-5%',
  transform: 'rotate(30deg)',
  display: 'block',
  width: '50%',
  borderRadius: '8px',
});

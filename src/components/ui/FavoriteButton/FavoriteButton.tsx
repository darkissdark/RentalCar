import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { toggleFavorite } from "../../../store/slices/favoritesSlice";

interface FavoriteButtonProps {
  id: string;
  className?: string;
}

const FavoriteButton = ({ id, className }: FavoriteButtonProps) => {
  const dispatch = useAppDispatch();
  const favoriteIds = useAppSelector((state) => state.favorites.carIds);
  const isFavorite = favoriteIds.includes(id);

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleFavorite(id));
  };

  return (
    <button
      className={className || ""}
      onClick={handleToggleFavorite}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      {isFavorite ? (
        <svg width="16" height="16">
          <use xlinkHref="/assets/sprite.svg#icon-heart-filled"></use>
        </svg>
      ) : (
        <svg width="16" height="16">
          <use xlinkHref="/assets/sprite.svg#icon-heart"></use>
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;

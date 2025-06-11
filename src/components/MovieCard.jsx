
import PropTypes from 'prop-types';


const MovieCard = ({ title, posterPath, voteAverage, isFavorite, onToggleFavorite }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card">
      <img src={imageUrl} alt="" />
      <h3>{title}</h3>
      <p>Rating: {voteAverage}</p>
      <button
        className="favorite-button"
        onClick={(e) => {
            e.stopPropagation();  // prevents the modal from opening
            onToggleFavorite();   // handles the favorite toggle
        }}
        >
        {isFavorite ? '❤️' : '♡'}
      </button>
    </div>
  );
};
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,


};


export default MovieCard;

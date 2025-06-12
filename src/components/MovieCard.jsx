
import PropTypes from 'prop-types';
import '../App.css';



const MovieCard = ({ title, posterPath, voteAverage, isFavorite, onToggleFavorite,hasWatched,onToggleWatched }) => {
  const imageUrl = `https://image.tmdb.org/t/p/w500${posterPath}`;

  return (
    <div className="movie-card">
        <img src={imageUrl} alt="Movie Image" />
        <h3>{title}</h3>
        <p>Rating: {voteAverage}</p>
      <div className='card-icons'>
        <button
            className="favorite-button"
            onClick={(e) => {
                e.stopPropagation();  // prevents the modal from opening
                onToggleFavorite();   // handles the favorite toggle
            }}
            >
            {isFavorite ? '❤️' : '♡'}
        </button>
        <button
            className="eye-icon"
            onClick={(e) => {
                e.stopPropagation();  // prevents the modal from opening
                onToggleWatched();   // handles the watched toggle
            }}
            >
            <img src= {hasWatched ? 'src/assets/eye-icon.jpg' : 'src/assets/close-eye-icon.jpg'}  alt=" Watch Status" />
        </button>
      </div>
    </div>
  );
};
MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  posterPath: PropTypes.string.isRequired,
  voteAverage: PropTypes.number.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  hasWatched: PropTypes.bool.isRequired,
  onToggleWatched: PropTypes.func.isRequired,


};


export default MovieCard;

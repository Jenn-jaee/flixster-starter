import './MovieModal.css';
import PropTypes from 'prop-types';


const MovieModal = ({ movie, onClose }) => {
  if (!movie) return null;

  const backdropUrl = `https://image.tmdb.org/t/p/w780${movie.backdrop_path}`;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <img src={backdropUrl} alt={movie.title} className="modal-backdrop" />
        <h2>{movie.title}</h2>
        <p><strong>Release Date:</strong> {movie.release_date}</p>
        <p><strong>Runtime:</strong> {movie.runtime} min</p>
        <p><strong>Overview:</strong> {movie.overview}</p>
        <p><strong>Genres:</strong> {movie.genres?.map(g => g.name).join(', ')}</p>
        <button onClick={onClose} className="modal-close">Close</button>
      </div>
    </div>
  );
};

MovieModal.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string,
    overview: PropTypes.string,
    runtime: PropTypes.number,
    release_date: PropTypes.string,
    backdrop_path: PropTypes.string,
    genres: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        name: PropTypes.string
      })
    )
  }),
  onClose: PropTypes.func.isRequired
};


export default MovieModal;

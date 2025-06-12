
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({ favorites, watched }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <h3>❤️ Favorites</h3>
        {favorites.length === 0 ? (
          <p>No favorites yet.</p>
        ) : (
          <ul>
            {favorites.map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="sidebar-section">
        <h3>👁️ Watched</h3>
        {watched.length === 0 ? (
          <p>No watched movies.</p>
        ) : (
          <ul>
            {watched.map(movie => (
              <li key={movie.id}>{movie.title}</li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {
  favorites: PropTypes.array.isRequired,
  watched: PropTypes.array.isRequired,
};

export default Sidebar;
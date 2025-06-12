
import PropTypes from 'prop-types';
import './Sidebar.css';

const Sidebar = ({mode, favorites, watched }) => {

 
  return (
    <aside className="sidebar">
      <div className="sidebar-section">
        <button onClick={mode}>🏠 Home</button>       
      </div>
      
      <div className="sidebar-section">
        <button>❤️ Favorites</button>
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
        <button>👁️ Watched</button>
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
  mode: PropTypes.func.isRequired,
};

export default Sidebar;
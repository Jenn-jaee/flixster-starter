import { useEffect, useState } from 'react';
import MovieCard from './MovieCard';
import MovieModal from './MovieModal';
import Sidebar from './Sidebar';
import '../App.css';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [mode, setMode] = useState('nowPlaying');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [sortOption, setSortOption] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watched, setWatched] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (apiKey) {
      fetchMovies(1, mode);
    } else {
      console.error("API key is missing or invalid");
    }
  }, [mode]);

  const fetchMovies = async (pageNum = 1, currentMode = 'nowPlaying') => {
    try {
      const baseUrl = currentMode === 'search'
        ? `https://api.themoviedb.org/3/search/movie`
        : `https://api.themoviedb.org/3/movie/now_playing`;

      const queryParams = currentMode === 'search'
        ? `?query=${searchQuery}&page=${pageNum}&api_key=${apiKey}`
        : `?page=${pageNum}&api_key=${apiKey}`;

      const fullUrl = `${baseUrl}${queryParams}`;
      const res = await fetch(fullUrl);
      const data = await res.json();

      if (!data.results || data.results.length === 0 || pageNum >= data.total_pages) {
        setHasMore(false);
      }

      if (pageNum === 1) {
        setMovies(data.results);
      } else {
        setMovies((prev) => [...prev, ...data.results]);
      }
    } catch (err) {
      console.error("Failed to fetch movies:", err);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMovies(nextPage, mode);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    setPage(1);
    setHasMore(true);
    setMode('search');
    fetchMovies(1, 'search');
  };

  const handleNowPlaying = () => {
    setSearchQuery('');
    setPage(1);
    setHasMore(true);
    setMode('nowPlaying');
    fetchMovies(1, 'nowPlaying');
  };

  const fetchMovieDetails = async (movieId) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`
    );
    const data = await res.json();
    setSelectedMovie(data);
  };

  const toggleFavorite = (movieId) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(movieId)
        ? prevFavorites.filter((id) => id !== movieId)
        : [...prevFavorites, movieId]
    );
  };

  const toggleWatched = (movieId) => {
    setWatched((prev) =>
      prev.includes(movieId)
        ? prev.filter((id) => id !== movieId)
        : [...prev, movieId]
    );
  };

  const getSortedMovies = () => {
    let sorted = [...movies];

    if (sortOption === 'title') {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === 'release') {
      sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
    } else if (sortOption === 'rating') {
      sorted.sort((a, b) => b.vote_average - a.vote_average);
    }

    return sorted;
  };

  const clearSearchBtn = () => {
    setSearchQuery('');
    setMode('nowPlaying');
    return null;
  };

  return (
    <div className="layout-container">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
            ☰
        </button>
        {sidebarOpen && (
            <Sidebar
            favorites={movies.filter((m) => favorites.includes(m.id))}
            watched={movies.filter((m) => watched.includes(m.id))}
            onClose={() => setSidebarOpen(false)}
            />
        )}

        <main>
            {selectedMovie && (
                <MovieModal
                    movie={selectedMovie}
                    onClose={() => setSelectedMovie(null)}
                />
            )}

            <h1 id="Otter">🦦🍿</h1>
             
            <div className="controls">
                <button onClick={handleNowPlaying} disabled={mode === 'nowPlaying'}> Now Playing </button>
                <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={handleSearchChange}
                />
                <button onClick={handleSearch} disabled={!searchQuery.trim()}>Search</button>
                <button onClick={clearSearchBtn} disabled={!searchQuery.trim()}>Clear</button>

                <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                >
                <option value="">Sort by</option>
                <option value="title">Title (A–Z)</option>
                <option value="release">Release Date (Newest)</option>
                <option value="rating">Rating (Highest)</option>
                </select>
            </div>

            <div className="movie-list">
                {getSortedMovies()
                .filter((movie) => movie.poster_path)
                .map((movie) => (
                    <div key={movie.id} onClick={() => fetchMovieDetails(movie.id)}>
                    <MovieCard
                        title={movie.title}
                        posterPath={movie.poster_path}
                        voteAverage={movie.vote_average}
                        isFavorite={favorites.includes(movie.id)}
                        onToggleFavorite={() => toggleFavorite(movie.id)}
                        hasWatched={watched.includes(movie.id)}
                        onToggleWatched={() => toggleWatched(movie.id)}
                    />
                    </div>
                ))}
            </div>

            {hasMore && (<button onClick={handleLoadMore} className="load-more">Load More</button>)} 
            {!hasMore && <p>No more movies to show.</p>}
            </main>
        

      
    </div>
  );
};

export default MovieList;

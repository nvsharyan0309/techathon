import React, { useState } from 'react';

const Movies: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMovie, setSelectedMovie] = useState<any | null>(null);
  const [movies, setMovies] = useState([
    { title: 'The Shawshank Redemption', year: 1994, genre: 'Drama', description: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.' },
    { title: 'The Godfather', year: 1972, genre: 'Crime', description: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.' },
    { title: 'The Dark Knight', year: 2008, genre: 'Action', description: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.' },
    { title: 'Pulp Fiction', year: 1994, genre: 'Crime', description: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.' },
    { title: 'Schindler\'s List', year: 1993, genre: 'Biography', description: 'In German-occupied Poland during World War II, industrialist Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.' },
    { title: 'Inception', year: 2010, genre: 'Sci-Fi', description: 'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.' },
    { title: 'Fight Club', year: 1999, genre: 'Drama', description: 'An insomniac office worker and a devil-may-care soapmaker form an underground fight club that evolves into something much, much more.' },
    { title: 'Forrest Gump', year: 1994, genre: 'Drama', description: 'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.' },
    { title: 'The Matrix', year: 1999, genre: 'Sci-Fi', description: 'A computer programmer discovers that reality as he knows it is a simulation created by machines to subjugate humanity.' },
    { title: 'Goodfellas', year: 1990, genre: 'Crime', description: 'The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners Jimmy Conway and Tommy DeVito in the Italian-American crime syndicate.' }
  ]);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">Movies</h2>
      <div className="mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          placeholder="Search for movies"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMovies.map((movie) => (
          <div key={movie.title} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">{movie.title}</h3>
            <p>Year: {movie.year}</p>
            <p>Genre: {movie.genre}</p>
            <button 
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={() => setSelectedMovie(movie)}
            >
              More Info
            </button>
          </div>
        ))}
      </div>
      {selectedMovie && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-2xl font-bold mb-2">{selectedMovie.title}</h3>
          <p className="mb-2"><strong>Year:</strong> {selectedMovie.year}</p>
          <p className="mb-2"><strong>Genre:</strong> {selectedMovie.genre}</p>
          <p className="mb-4"><strong>Description:</strong> {selectedMovie.description}</p>
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Watch Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Movies;

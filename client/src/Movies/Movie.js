import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie(props) {
  const { push } = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    props.addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const deleteItem = e => {
    e.preventDefault();

    axios.delete(`http://localhost:5000/api/movies/${params.id}`)
    .then(response => {
      console.log(response.data);
      props.setMovieList([
        ...props.movieList.filter(X => X.id != response.data)
      ])
      push("/")
    })
    .catch(error => {
      console.log(error)
    })
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />

      <div className="save-button" onClick={saveMovie}>
        Save
      </div>
      
      <div className="edit-button" onClick={() => push(`/update-movies/${params.id}`)}>
        Edit
      </div>

      <div className="delete-button" onClick={deleteItem}> 
        Delete
      </div>
    </div>
  );
}

export default Movie;

import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
//useParams returns an obj of URL params used to access match.params of current Route
// ex: useParams(title) must match 
// <Route path="/path/:title>"
import { Link } from 'react-router-dom';

import axios from 'axios';

const EditMovieForm = (props) => {

	const { push } = useHistory();
	const { id } = useParams();
	
	const { setMovies } = props;
	const [movie, setMovie] = useState({
		title:"",
		director: "",
		genre: "",
		metascore: 0,
		description: ""
	});
	

	useEffect( () => {
		// retrieve current id's movie from api 
		// and save data returned to local state
		// take movie (from state) and post it to the current movie id
		// then set the state to that data
		axios.get(`http://localhost:9000/api/movies/${id}`)
			.then(res => {
				setMovie(res.data)
			})
			.catch(err => {
				debugger
			})
	}, [])

	const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:9000/api/movies/${id}`, movie)
            .then(res=>{
                setMovies(res.data);
                push(`/movies/${movie.id}`);
			})
			.catch(err=>{
				console.log(err);
			})
	}
	
	const { title, director, genre, metascore, description } = movie;

    return (
	<div className="col">
		<div className="modal-content">
			<form onSubmit={handleSubmit}>
				<div className="modal-header">						
					<h4 className="modal-title">Editing <strong>{movie.title}</strong></h4>
				</div>
				<div className="modal-body">					
					<div className="form-group">
						<label>Title</label>
						<input value={title} onChange={handleChange} name="title" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Director</label>
						<input value={director} onChange={handleChange} name="director" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Genre</label>
						<input value={genre} onChange={handleChange} name="genre" type="text" className="form-control"/>
					</div>
					<div className="form-group">
						<label>Metascore</label>
						<input value={metascore} onChange={handleChange} name="metascore" type="number" className="form-control"/>
					</div>		
					<div className="form-group">
						<label>Description</label>
						<textarea value={description} onChange={handleChange} name="description" className="form-control"></textarea>
					</div>
									
				</div>
				<div className="modal-footer">			    
					<input onClick={ handleSubmit }type="submit" className="btn btn-info" value="Save"/>
					<Link to={`/movies/1`}><input type="button" className="btn btn-default" value="Cancel"/></Link>
				</div>
			</form>
		</div>
	</div>);
}

export default EditMovieForm;
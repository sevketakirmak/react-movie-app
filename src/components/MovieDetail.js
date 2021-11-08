import React from "react";
import Search from "./Search";
import { connect } from "react-redux";
import { fetchDetail, getMovieId, fetchMovie } from "../actions";
import "./MovieDetail.css"
var numeral = require('numeral');

class MovieDetail extends React.Component {

    state = {search: ''};

    componentDidMount(){
        this.props.fetchMovie('');
        this.props.fetchDetail(this.props.movieID);
        this.setState({search: this.props.movieID});
    }
    componentDidUpdate(prevProps){
        if(this.props.movieID !== prevProps.movieID){
            this.props.fetchMovie('');
            this.props.fetchDetail(this.props.movieID);
        }
    }
    render() {
        

        const movieDetail = this.props.details;
        const poster = "https://image.tmdb.org/t/p/original" + movieDetail.poster_path;
        const bg = "https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path;
        const boxOffice = numeral(movieDetail.revenue).format('($0,0)');

        const renderGenres = movieDetail.genres===undefined? '': movieDetail.genres.map((genre)=>{
            return <span key={genre.name}>{genre.name}</span>
        });
        return (
            <div>
                <div className="movie">
                    <div className="movie-bg" style={{ backgroundImage: `url(${bg})` }}>
                        <Search />
                        <div className="movie-name">
                            <h1>{movieDetail.original_title} - "{movieDetail.tagline}"</h1>
                            <h4 className="genres">{renderGenres}</h4>
                        </div>
                    </div>
                    <div className="movie-details">
                        <div className="poster">
                            <img src={poster} />
                        </div>
                        <div className="overview">
                            <h3>Overview</h3>
                            <p>{movieDetail.overview}</p>
                            <div className="flex">
                                <h3><span>Release Date: <br /></span>{movieDetail.release_date}</h3>
                                <h3><span>Running Time: <br /></span>{movieDetail.runtime} mins</h3>
                                <h3><span>Vote Average: <br /></span>{movieDetail.vote_average}/10</h3>
                                <h3><span>Box Office: <br /></span>{boxOffice}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapState = (state) => {
    return { details: state.details, movieID: state.movieID }
}
export default connect(mapState, { fetchDetail, getMovieId, fetchMovie })(MovieDetail);
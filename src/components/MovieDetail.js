import React from "react";
import Search from "./Search";
import { connect } from "react-redux";
import { fetchDetail, getMovieId, fetchMovie, getType } from "../actions";
import "./MovieDetail.css"
var numeral = require('numeral');

class MovieDetail extends React.Component {

    state = { search: '' };

    componentDidMount() {
        this.props.fetchMovie('');
        this.props.fetchDetail(this.props.movieID, this.props.movieType);
        this.setState({ search: this.props.movieID });
    }
    componentDidUpdate(prevProps) {
        if (this.props.movieID !== prevProps.movieID) {
            this.props.fetchMovie('');
            this.props.fetchDetail(this.props.movieID, this.props.movieType);
        }
    }

    render() {
        const movieRun = (movieRunTime) => {
            if (movieRunTime) {
                if (movieRunTime.length > 1) {
                    return movieRunTime[0];
                }
                return movieRunTime;
            }
            return '';
        }

        const movieDetail = this.props.details;
        const poster = "https://image.tmdb.org/t/p/original" + movieDetail.poster_path;
        const bg = "https://image.tmdb.org/t/p/original" + movieDetail.backdrop_path;
        const boxOffice = numeral(movieDetail.revenue).format('($0,0)');

        const renderGenres = movieDetail.genres === undefined ? '' : movieDetail.genres.map((genre) => {
            return <span key={genre.name}>{genre.name}</span>
        });
        return (
            <div>
                <div className="movie">
                    <div className="movie-bg" style={{ backgroundImage: `url(${bg})` }}>
                        <Search />
                        <div className="movie-name">
                            <h1>{this.props.movieType === "movie" ? movieDetail.original_title : movieDetail.name} - "{movieDetail.tagline}"</h1>
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
                                <h3><span>{this.props.movieType === "movie" ? 'Release Date:' : 'First Air Date'} <br /></span>{this.props.movieType === "movie" ? movieDetail.release_date : movieDetail.first_air_date}</h3>
                                <h3><span>Running Time: <br /></span>{this.props.movieType === "movie" ? movieDetail.runtime : movieRun(movieDetail.episode_run_time)} mins</h3>
                                <h3><span>Vote Average: <br /></span>{movieDetail.vote_average}/10</h3>
                                <h3><span>{this.props.movieType === "movie" ? 'Box Office:' : 'Season'} <br /></span>{this.props.movieType === "movie" ? boxOffice : movieDetail.number_of_seasons}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
const mapState = (state) => {
    return { details: state.details, movieID: state.movieID, movieType: state.movieType }
}
export default connect(mapState, { fetchDetail, getMovieId, fetchMovie, getType })(MovieDetail);
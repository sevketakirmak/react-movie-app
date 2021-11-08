import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMovie, fetchDetail, getMovieId } from "../actions";
import "./Search.css"

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.state = { search: '' };
        this.handleChange = this.handleChange.bind(this);
        this.triggerChange = this.triggerChange.bind(this);
    }

    componentWillUnmount() {
        this.timer = null;
    }

    handleChange(search) {
        clearTimeout(this.timer);

        this.setState({ search });

        this.timer = setTimeout(this.triggerChange, 300);

    }

    triggerChange() {
        const { search } = this.state;
        console.log(search);
        this.props.fetchMovie(search);
    }

    render() {
        const renderList = this.props.movie.slice(0, 5).map((post) => {
            if (this.state.search !== '') { return <Link key={post.id} onClick={()=> {this.props.getMovieId(post.id); this.setState({search:'' });}} to="/movie-detail"><li><span>{post.original_title}</span></li></Link> }
            else return ''
        });

        return (
            <div className="input-div">
                <input type="text" placeholder="Ara" value={this.state.search} onChange={(e) => this.handleChange(e.target.value)} />
                <div className="dropdown">
                    <ul>
                        {renderList}
                    </ul>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { movie: state.movie }
}

export default connect(mapState, { fetchMovie, getMovieId })(Search);
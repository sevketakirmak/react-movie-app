import React from "react";
import { connect } from 'react-redux';
import { fetchList, fetchListTv, getMovieId, getType } from './actions';
import { Link } from "react-router-dom";
import Search from './components/Search';
import Slider from 'react-slick';
import Card from './components/Card';
import "./App.css";
import "../node_modules/slick-carousel/slick/slick.css";
import "../node_modules/slick-carousel/slick/slick-theme.css";
import head from "./movie.jpg"

class MainPage extends React.Component {

    componentDidMount() {
        this.props.fetchList();
        this.props.fetchListTv();
    }
    render() {
        const settings = {
            arrows: false,
            dots: false,
            infinite: true,
            slidesToShow: 5,
            swipeToSlide: true,
            autoplay: false,
            autoplaySpeed: 5000,
            pauseOnHover: true,
            responsive: [
                {
                    breakpoint: 1200,
                    settings: {
                        slidesToShow: 4
                    }
                },
                {
                    breakpoint: 992,
                    settings: {
                        slidesToShow: 3
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1
                    }
                }
            ]
        };
        const renderListMovie = this.props.list.map((post) => {
            return (<Link key={post.id} onClick={()=> {this.props.getMovieId(post.id); this.setState({search:'' });}} to="/movie-detail"><Card key={post.id} post={post} /></Link>);
        });

        const renderListTv = this.props.tvList.map((post) => {
            return (<Link key={post.id} onClick={()=> {this.props.getMovieId(post.id); this.props.getType(post.media_type); this.setState({search:'' });}} to="/movie-detail"><Card key={post.id} post={post} /></Link>);
        });
        return (
            <div>
                <div className="image" style={{ backgroundImage: `url(${head})` }}>
                    <Search />
                </div>
                <div className="slide">
                    <h2>Haftanın Popüler Filmleri </h2>
                    <Slider {...settings}>
                        {renderListMovie}
                    </Slider>
                </div>

                <div className="slide">
                    <h2>Haftanın Popüler Dizileri </h2>
                    <Slider {...settings}>
                        {renderListTv}
                    </Slider>
                </div>
            </div>
        );
    }
}

const mapState = (state) => {
    return { list: state.list, tvList: state.tvList }
}

export default connect(mapState, { fetchList, fetchListTv, getMovieId, getType })(MainPage);

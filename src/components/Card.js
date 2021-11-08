import React, { useEffect, useRef, useState } from "react";
import "./Card.css"

const Card = ({post}) => {

    const ref = useRef(null);
    const [height, getHeight] = useState(null);

    const poster = "https://image.tmdb.org/t/p/original" + post.poster_path;

    useEffect(()=>{
        ref.current.addEventListener('load', getHeight(ref.current.clientHeight + 10));
    }, []);

    return (
        <div className="card">
            <img src={poster} />
            <div ref={ref} className="card-content">
                <h3>{post.media_type ==="movie" ? post.original_title : post.name}</h3>
                {
                    post.media_type ==="movie" ? <h4>Çıkış Tarihi: <span>{post.release_date}</span></h4> : <h4>Yayınlandığı Tarih: <span>{post.first_air_date}</span></h4>
                }
            </div>
        </div>
    );
}

export default Card;
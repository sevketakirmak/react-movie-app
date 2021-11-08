import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import listReducer from "./listReducer";
import tvReducer from "./tvReducer";
import movieDetailReducer from "./movieDetailReducer";

const movieIdReducer = (movieID = "438631", action) =>{
    if (action.type === 'GET_MOVIEID'){
        return action.payload;
    }
    return movieID;
}
const movieTypeReducer = (media_type = "movie", action) =>{
    if (action.type === 'GET_TYPE'){
        return action.payload;
    }
    return media_type;
}
export default combineReducers(
    {
        movie: movieReducer,
        list: listReducer,
        tvList: tvReducer,
        details: movieDetailReducer,
        movieID: movieIdReducer,
        movieType: movieTypeReducer
    }
);
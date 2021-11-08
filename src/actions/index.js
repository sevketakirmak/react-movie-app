import getMovies from "../apis/getMovies";

export const fetchMovie = (searchKey) => async (dispatch) => {
    if (searchKey === '') {
        dispatch({ type: 'FETCH_MOVIE', payload: [] });
    }
    else {
        const response = await getMovies.get('/search/movie', {
            params: {
                query: searchKey
            }
        });
        dispatch({ type: 'FETCH_MOVIE', payload: response.data.results });
    }
}

export const fetchList = () => async (dispatch) => {
    const response = await getMovies.get('/trending/movie/week');

    dispatch({ type: 'FETCH_LIST', payload: response.data.results });
}

export const fetchListTv = () => async (dispatch) => {
    const response = await getMovies.get('/trending/tv/week');

    dispatch({ type: 'FETCH_LIST_TV', payload: response.data.results });
}

export const fetchDetail = (movieID) => async (dispatch) => {

    const response = await getMovies.get(`/movie/${movieID}`);

    dispatch({ type: 'FETCH_DETAIL', payload: response.data });
}
export const getMovieId = (movieID) =>{
    return{
        type: 'GET_MOVIEID',
        payload: movieID
    };
}
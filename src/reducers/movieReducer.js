export default (state=[], action) => {
    switch (action.type){
        case 'FETCH_MOVIE':
            return action.payload;
        default:
            return state;
    }
}
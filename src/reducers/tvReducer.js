export default (state=[], action) => {
    switch (action.type){
        case 'FETCH_LIST_TV':
            return action.payload;
        default:
            return state;
    }
}
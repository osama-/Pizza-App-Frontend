import {SET_TOKEN} from '../constants';
export default function(state = {}, action) {
    switch(action.type){
        case SET_TOKEN:
            localStorage.setItem('token', action.payload);
            return {token: action.payload}
        default:
            if( localStorage.getItem('token') ){
                return {token: localStorage.getItem('token')}
            }
            return state;
    }
}
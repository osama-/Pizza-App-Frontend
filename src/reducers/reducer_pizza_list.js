import {FETCH_PIZZA} from '../constants';

export default function(state = [], action) {
    switch(action.type){
        case FETCH_PIZZA:
            return action.payload.data;
        default: 
            return state;
    }
}
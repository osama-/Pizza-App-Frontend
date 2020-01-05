import {CHANGE_CURRENCY} from '../constants';

export default function(state = 'eur', action) {
    switch(action.type){
        case CHANGE_CURRENCY:
            return action.payload;
        default: 
            return state;
    }
}
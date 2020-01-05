import {UPDATE_DELIVERY_CHARGES} from '../constants';

export default function(state = {}, action) {
    switch(action.type){
        case UPDATE_DELIVERY_CHARGES:
            return action.payload;
        default: 
            return state;
    }
}
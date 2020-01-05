import {ADD_PIZZA, REMOVE_PIZZA, INCREASE_QUANTITY, DECREASE_QUANTITY, CLEAR_ORDER} from '../constants';

export default function(state = [], action) {
    switch(action.type){
        case ADD_PIZZA:
            if( state.some(item => item.id === action.payload.id) ){
                return state.map(item => (item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item));
            }
            return state.concat([{...action.payload, quantity: 1}]);
        case REMOVE_PIZZA:
            return state.filter((item, index) => item.id !== action.payload.id);
        case INCREASE_QUANTITY:
            return state.map((item, index) => {
                if(item.id === action.payload.id){
                    item.quantity += 1;
                }
                return item;
            })
        case DECREASE_QUANTITY:
            return state.map((item, index) => {
                if(item.id === action.payload.id){
                    item.quantity = item.quantity > 1 ? item.quantity-1 : item.quantity;
                }
                return item;
            })
        case CLEAR_ORDER:
            return []; 
        default: 
            return state;
    }
}
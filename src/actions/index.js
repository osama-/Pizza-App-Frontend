import axios from 'axios';
import {FETCH_PIZZA, ADD_PIZZA, REMOVE_PIZZA, INCREASE_QUANTITY, DECREASE_QUANTITY, API_URL, CHANGE_CURRENCY, CLEAR_ORDER, SET_TOKEN, UPDATE_DELIVERY_CHARGES} from '../constants';

export function fetchPizzaList(){
    const request = axios.get(API_URL+'/product');
    return (dispatch) => {
        request.then(({data})=>{
            dispatch({type: FETCH_PIZZA, payload: data});
            dispatch({
                type: UPDATE_DELIVERY_CHARGES, 
                payload: {usd_delivery_charges: parseFloat(data.usd_delivery_charges), eur_delivery_charges: parseFloat(data.eur_delivery_charges)}
            });
        })
    }
}

export function addPizza(pizza) {
    return {
        type: ADD_PIZZA,
        payload: pizza
    };
}

export function removePizza(pizza) {
    return {
        type: REMOVE_PIZZA,
        payload: pizza
    };
}

export function increaseQuantity(pizza) {
    return {
        type: INCREASE_QUANTITY,
        payload: pizza
    };
}

export function decreaseQuantity(pizza) {
    return {
        type: DECREASE_QUANTITY,
        payload: pizza
    };
}
export function changeCurrency(currency) {
    return {
        type: CHANGE_CURRENCY,
        payload: currency
    };
}
export function updateDeliveryCharges(deliveryCharges) {
    return {
        type: UPDATE_DELIVERY_CHARGES,
        payload: deliveryCharges
    };
}
export function clearOrder() {
    return {
        type: CLEAR_ORDER
    };
}

export function setToken(token) {
    return {
        type: SET_TOKEN,
        payload: token
    };
}

import { combineReducers } from 'redux';
import reducerPizzaList from './reducer_pizza_list';
import reducerSelectedPizza from './reducer_selected_pizza';
import reducerCurrency from './reducer_currency';
import reducerCustomer from './reducer_customer';
import reducerDeliveryCharges from './reducer_delivery';

const rootReducer = combineReducers({
    pizzaList: reducerPizzaList,
    selectedPizza: reducerSelectedPizza,
    deliveryCharges: reducerDeliveryCharges,
    currency: reducerCurrency,
    customer: reducerCustomer
  });
  
export default rootReducer;
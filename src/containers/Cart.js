import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {increaseQuantity, decreaseQuantity, removePizza, clearOrder} from "../actions";
import Price from '../components/Price';
import Modal from '../components/Modal';
import {API_URL} from '../constants';
import '../assets/css/cart.css';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {showModal: false,orderInfo: {}};
  }

  renderList(){
    const {currency, selectedPizza} = this.props;
    if(!selectedPizza.length){
      return(
        <div className="text-center">No Pizza Added</div>
      )
    }
    return selectedPizza.map((pizza) => {
        return (
              <div className="item" key={"cartitem-"+pizza.id}>
                  <div className="image"><img src={"/"+pizza.photo} alt=""/></div>
                  <div className="title">{pizza.name}</div>
                  <div className="price"><Price pizza={pizza} quantity={pizza.quantity} currency={currency}/></div>
                  <div className="actions">
                      <span className="minus" onClick={()=> this.props.decreaseQuantity(pizza)}>-</span>
                      <span className="qty">{pizza.quantity}</span>
                      <span className="plus" onClick={()=> this.props.increaseQuantity(pizza)}>+</span>
                  </div>
                  <div className="delete" onClick={()=> this.props.removePizza(pizza)}>X</div>
              </div>
        )
    })
}
renderTotal(){
  const {currency, deliveryCharges} = this.props;
  const subtotal = this.props.selectedPizza.reduce(function (accumulator, currentValue) {
    return accumulator + (currentValue[currency+'_price'] * currentValue.quantity);
  }, 0).toFixed(2);
  const fee = deliveryCharges[currency+'_delivery_charges'];
  return(
    <div className="order-details">
      <div className="section-title">
        Order details
      </div>
      <div className="subtotal">
        Subtotal: {subtotal}
      </div>
      <div className="delivery">
        Delivery fee: {fee}
      </div>
      <div className="total">
        Total: <strong>{parseFloat(subtotal)+fee}</strong>
      </div>
      <button type="button" className="btn btn-success w-100 mt-3" ref="btn" onClick={()=> this.placeOrder()}>Place Order</button>
    </div>
  )
}

placeOrder(){
  this.refs.btn.setAttribute("disabled", "disabled");
  const {customer, selectedPizza} = this.props;
  const options = {
    method: 'POST',
    url: API_URL+'/order/create',
    headers: {"Content-Type": "application/json"},
    data: {
      "delivey_notes":"test delivery notes",
      "orderItems": selectedPizza.map((item)=>{
        return {"product_id":item.id,"quantity":item.quantity}
      })
    }
  };
  if( customer.hasOwnProperty('token') ){
    options.url = API_URL+'/order';
    options.headers.Authorization = 'Bearer '+customer.token;
  }
  const request = axios(options);
  request.then((response)=> {
    this.setState({orderInfo: response.data});
    this.toggleModal(true);
    this.refs.btn.removeAttribute("disabled");
    this.props.clearOrder();
  })
}

toggleModal(bool){
  this.setState({showModal: bool});
}
  render() {
      return (
        <div className="cart">
            <div className="section-title">
              My Order
            </div>
            <div className="items">
              {this.renderList()}
            </div>
            {this.props.selectedPizza.length ? this.renderTotal() : ''}
            {this.state.showModal && <Modal title="Order Placed Successfully" 
                   message={"Your order has been placed successfully, your order ID:" + this.state.orderInfo.id}
                   onclose={()=> this.toggleModal(false)} buttonLabel="Create New Order"/>}
        </div>
      );
  }
}
function mapStateToProps(state) {
    return {
        selectedPizza: state.selectedPizza,
        deliveryCharges: state.deliveryCharges,
        currency: state.currency,
        customer: state.customer
    };
  }

function mapDispatchToProps(dispatch) {
  return bindActionCreators({increaseQuantity, decreaseQuantity, removePizza, clearOrder}, dispatch);
  }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart));
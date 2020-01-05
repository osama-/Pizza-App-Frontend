import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../constants';
import Loader from '../components/Loader';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
        historyList: []
    };
  }
  componentDidMount() {
    if( !this.props.customer.hasOwnProperty('token') ){
        this.props.history.push("/");
    }else{
      axios({
        method: 'GET',
        url: API_URL+'/order',
        headers: {"Content-Type": "application/json", "Authorization": "Bearer "+this.props.customer.token}
      }).then((response)=> {
       this.setState({
        historyList: response.data.data
       })
      })
      .catch(function (error) {
          console.log(error);
      })
    }
  }
  renderList(){
    if(!this.state.historyList.length){
      return(<Loader />)
    }
    return this.state.historyList.map((order)=>{
      return(
        <div className="row bg-light mb-3" key={"order-"+order.id}>
          <div className="col-12">
            <div>
              <div>Order Number: {order.id}</div>
              <div>Order Creation Date: {order.creationDate}</div>
              <div>
                Order Items:
                <div className="row row-cols-6">
                  {order.order_items.map((pizza)=>{
                    return(
                      <div className="col mb-4 item" key={"pizza-"+pizza.product_id}>
                        <div className="card h-100">
                          <img src={"/"+pizza.product_image} className="card-img-top" alt="pizza"/>
                          <div className="card-body">
                              <h5 className="card-title">{pizza.product_name}</h5>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    })
  }
  render() {
      return (
        <div className="history-list">
          {this.renderList()}
        </div>
      );
  }
}
function mapStateToProps(state) {
    return {
        currency: state.currency,
        customer: state.customer
    };
  }

export default withRouter(connect(mapStateToProps)(History));
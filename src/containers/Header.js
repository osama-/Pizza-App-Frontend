import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {Link} from "react-router-dom";
import {changeCurrency}  from '../actions';

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event){
        console.log();
        if( event.target.value === 'usd' ){
            this.props.changeCurrency('usd');
        }else{
            this.props.changeCurrency('eur');
        }
    }
  render() {
      const {customer} = this.props;
      return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand logo"><img src="/images/logo.png" alt="logo"/></Link>
            <button className="navbar-toggler" type="button">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
                </li>
                <li className="nav-item">
                <Link to="/about" className="nav-link">About</Link>
                </li>
                <li className="nav-item currency">
                <select onChange={this.handleChange}>
                  <option value="euro">Euro</option>
                  <option value="usd">USD</option>
               </select>
                </li>
            </ul>
            <ul className="navbar-nav">
                {!customer.hasOwnProperty('token') && <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
                </li>}
                {!customer.hasOwnProperty('token') && <li className="nav-item">
                <Link to="/register" className="nav-link">Register</Link>
                </li>}
                {customer.hasOwnProperty('token') && <li className="nav-item">
                <Link to="/historylist" className="nav-link">Order History</Link>
                </li>}
            </ul>
            </div>
        </nav>
      );
  }
}
function mapStateToProps(state) {
    return {
        customer: state.customer,
        currency: state.currency
    };
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({changeCurrency}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
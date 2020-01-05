import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import {fetchPizzaList, addPizza} from "../actions";
import Price from '../components/Price';
import Loader from '../components/Loader';
import '../assets/css/pizzaList.css';

class pizzaList extends Component {
    componentDidMount() {
        this.props.fetchPizzaList();
    }
    renderList(){
        const {pizzaList, addPizza, currency} = this.props;
        if(!pizzaList.length){
            return(<Loader />)
        }
        return this.props.pizzaList.map((pizza) => {
            return (
                <div className="col mb-4 item" key={"pizzalist-"+pizza.id}>
                    <div className="card h-100">
                        <img src={"/"+pizza.photo} className="card-img-top" alt="pizza"/>
                        <div className="card-body">
                            <h5 className="card-title">{pizza.name}</h5>
                            <p className="card-text">{pizza.description}</p>
                            <p className="price">Price: <Price pizza={pizza} currency={currency} /></p>
                            <div className="actions">
                                <button type="button" className="btn btn-primary w-100" onClick={()=> addPizza(pizza)}>Add to Cart</button>
                            </div>
                        </div>
                    </div>
                </div>
            )
        })
    }  
    render() {
        return (
        <div className="pizza-list">
            <div className="row">
                <div className="col-12">
                    <div className="section-title">
                        Pizza List
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3">
                {this.renderList()}
            </div>
        </div>
        );
    }
    }
    function mapStateToProps(state) {
        return {
            pizzaList: state.pizzaList,
            currency: state.currency
        };
    }

    function mapDispatchToProps(dispatch) {
        return bindActionCreators({fetchPizzaList, addPizza}, dispatch);
    }

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(pizzaList));
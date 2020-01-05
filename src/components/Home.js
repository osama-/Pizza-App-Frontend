import React from 'react';
import PizzaList from '../containers/PizzaList';
import Cart from '../containers/Cart';

export default function() {
      return (
          <div className="home page-wrapper">
              <div className="container">
                  <div className="row">
                      <div className="col-12 col-lg-8">
                          <PizzaList />
                      </div>
                      <div className="col-12 col-lg-4">
                          <Cart />
                      </div>
                  </div>
              </div>
          </div>
      );
}

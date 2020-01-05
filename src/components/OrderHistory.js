import React from 'react';
import Historylist from '../containers/Historylist';
export default function(){
    return (
      <div className="history page-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-title">Order History</div>
                    <Historylist />
                </div>
            </div>
        </div>
    </div>
    );
}
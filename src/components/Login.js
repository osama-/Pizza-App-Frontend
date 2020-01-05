import React from 'react';
import Loginform from '../containers/Loginform';
export default function(){
    return (
      <div className="login page-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-title">Login</div>
                    <div className="mt-4 ml-auto mr-auto col-6">
                      <Loginform />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
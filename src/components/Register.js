import React from 'react';
import Registerform from '../containers/Registerform';

export default function(){
    return (
      <div className="register page-wrapper">
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div className="section-title">Register</div>
                    <div className="mt-4 ml-auto mr-auto col-6">
                      <Registerform />
                    </div>
                </div>
            </div>
        </div>
    </div>
    );
}
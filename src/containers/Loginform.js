import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import axios from 'axios';
import {API_URL} from '../constants';
import {setToken} from '../actions';

class Loginform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if( this.props.customer.hasOwnProperty('token') ){
            this.props.history.push("/");
        }
    }

    handleInputChange(event) {
        const target = event.target;
        const name = target.name;
        const value = target.value;
        this.setState({
            [name]: value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const {email, password} = this.state;
        if( !email.length || !password.length) return false;
        const {history, setToken} = this.props;
        const {btn} = this.refs;
        btn.setAttribute("disabled", "disabled");
        axios.post(API_URL+'/login',{
            email,
            password
        }).then(function (response) {
            btn.removeAttribute("disabled");
            if( response.data.hasOwnProperty('success') ){
                setToken(response.data.success.token);
                history.push("/");
            }
        })
        .catch(function (error) {
            btn.removeAttribute("disabled");
            console.log(error);
        })
    }

  render() {
      return (
        <div className="login-form">
            <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" name="email" onChange={this.handleInputChange}/>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" name="password" onChange={this.handleInputChange}/>
                </div>
                <button type="submit" className="btn btn-primary w-100" ref="btn">Submit</button>
                </form>
        </div>
      );
  }
}
function mapStateToProps(state) {
    return {
        customer: state.customer
    };
}

function mapDispatchToProps(dispatch) {
return bindActionCreators({setToken}, dispatch);
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Loginform));
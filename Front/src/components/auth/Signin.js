import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {
    handleSigninInputChange,
    signin
} from "../../store/actions/authActions";

class Signin extends Component {

    handleChange = (e) => {
        this.props.handleInputChange(e.target);
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signin(this.props.signinInputs)
    }

    render() {

        if (this.props.user) {
            return <Redirect to='/' />
        }

        return (
            <div className="container">
                <form onSubmit={e => this.handleSubmit(e)} className="white">
                    <h5 className="grey-text text-darken-3">Signin</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" className="invalid"
                            className={this.props.authValidationErrors.email ? 'invalid': ''}
                            onChange={e => this.handleChange(e)} />
                        <span className="helper-text"
                            data-error={this.props.authValidationErrors.email} data-success="right">
                        </span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                            className={this.props.authValidationErrors.password ? 'invalid': ''}
                            onChange={e => this.handleChange(e)} />
                        <span className="helper-text"
                            data-error={this.props.authValidationErrors.password} data-success="right">
                        </span>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Login</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signinInputs: state.auth.userSigninInputs,
        authValidationErrors: state.auth.authValidationErrors,
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: target => dispatch(handleSigninInputChange(target)),
        signin: userData => dispatch(signin(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin)

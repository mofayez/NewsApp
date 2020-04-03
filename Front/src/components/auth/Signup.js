import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import {
    handleSignupInputChange,
    signup
} from '../../store/actions/authActions'

class Signup extends Component {

    handleChange = (e) => {
        this.props.handleInputChange(e.target)
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.signup(this.props.signupInputs);
    }

    render() {
        if (this.props.successfullyRegistered) {
            return <Redirect to='signin' />
        }

        return (
            <div className="container">
                <form onSubmit={e => this.handleSubmit(e)} className="white">
                    <h5 className="grey-text text-darken-3">Singup</h5>
                    <div className="input-field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email"
                                className={this.props.authValidationErrors.email ? 'invalid': ''}
                                defaultValue={this.props.signupInputs.email}
                                onChange={e => this.handleChange(e)} />
                        <span className="helper-text"
                            data-error={this.props.authValidationErrors.email} data-success="right">
                        </span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="fullName">Full name</label>
                        <input type="text" id="fullName"
                                className={this.props.authValidationErrors.fullName ? 'invalid': ''}
                                defaultValue={this.props.signupInputs.fullName}
                                onChange={e => this.handleChange(e)} />
                        <span className="helper-text"
                            data-error={this.props.authValidationErrors.fullName} data-success="right">
                        </span>
                    </div>
                    <div className="input-field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password"
                                className={this.props.authValidationErrors.password ? 'invalid': ''}
                                defaultValue={this.props.signupInputs.password}
                                onChange={e => this.handleChange(e)} />
                        <span className="helper-text"
                            data-error={this.props.authValidationErrors.password} data-success="right">
                        </span>
                    </div>
                    <div className="input-field">
                        <button className="btn pink lighten-1 z-depth-0">Signup</button>
                    </div>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        signupInputs: state.auth.userSignupInputs,
        authValidationErrors: state.auth.authValidationErrors,
        successfullyRegistered: state.auth.successfullyRegistered
    }
}


const mapDispatchToProps = dispatch => {
    return {
        handleInputChange: target => dispatch(handleSignupInputChange(target)),
        signup: userData => dispatch(signup(userData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)

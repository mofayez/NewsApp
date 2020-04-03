import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import {
    signout,
} from '../../store/actions/authActions'

const SignedinLinks = (props) => {

    return (
        <ul className="right">
            <li><NavLink to="/sources">Manage Sources</NavLink></li>
            <li><NavLink to="#" onClick={props.signout}>Logout</NavLink></li>
        </ul>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        signout: () => dispatch(signout()),
    }
}

export default connect(null, mapDispatchToProps)(SignedinLinks);

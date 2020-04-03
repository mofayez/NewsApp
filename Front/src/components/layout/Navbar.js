import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SignedinLinks from './SinginedLink';
import SignedoutLinks from './SignedoutLink';

class Navbar extends Component {
    render() {
        return (
            <nav className="nav-wrapper grey darken-3">
                <div className="container">
                    <Link to="/" className="brand-logo">World News</Link>
                    {
                        this.props.userIsLogedIn && <SignedinLinks />
                    }
                    {
                        !this.props.userIsLogedIn && <SignedoutLinks />
                    }
                </div>
            </nav>
        );
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userIsLogedIn: state.auth.userIsLogedIn
    }
}

export default connect(mapStateToProps)(Navbar)

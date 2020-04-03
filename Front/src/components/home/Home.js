import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
// import Notifications from './Notifications';
import { connect } from 'react-redux';
import { fetchNewsActionsCreator } from '../../store/actions/newsActions';
import NewsList from '../news/NewsList';


const Home = (props) => {

        if (!props.userIsLogedIn) {
            return (
                <Redirect to='signin' />
            )
        }

        return (
            <div className="dashboard ">
                <NewsList />
            </div>
        )
}

const mapStateToProps = state => {
    return {
        userIsLogedIn: state.auth.userIsLogedIn
    }
}

export default connect(mapStateToProps)(Home)

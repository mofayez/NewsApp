import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchNewsActionsCreator } from '../../store/actions/newsActions';
import New from './New';


class NewsList extends Component {

    componentDidMount() {
        this.props.fetchNews(this.props.user._id, this.props.news.page);
        console.log(this.props.user._id, this.props.news.page)
        window.addEventListener('scroll', () => {
            if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
            if (this.props.news.totalNews <= this.props.totalGotNews) {
                return;
            }
            this.props.fetchNews(this.props.user._id, this.props.news.page);
        });
    }

    
    render() {

        if (!this.props.userIsLogedIn) {
            return <Redirect to='signin' />
        }

        return (
            <div className="row">
                {
                    (this.props.news.news.length > 0) && this.props.news.news.map((_new, i) => {
                        return (
                            < New _new={_new} key={i} />
                        )
                    })
                }
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userIsLogedIn: state.auth.userIsLogedIn,
        news: state.news
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchNews: (id, page) => dispatch(fetchNewsActionsCreator(id, page))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsList)

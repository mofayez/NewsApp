import React, { Component } from 'react';
import NewSource from './NewsSource';
import { fetchNewsSourcesActionsCreator } from '../../store/actions/newsActions';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class NewsSources extends Component {
    

    componentDidMount() {
        this.props.fetchSources(this.props.user._id);
    }

    render() {
        if (!this.props.userIsLogedIn) {
            return <Redirect to='signin' />
        }
        return (
            <div className="container">
                <h4 className="mng-sources">Manage News Sources</h4>
                <ul className="collection">
                    {
                        this.props.sources && this.props.sources.map((source, i) => {
                            if (source && Object.keys(source).length > 0 && source !== undefined) {
                                return (
                                    <NewSource source={source} key={i} />
                                );
                            }
                            
                        })
                    }
                    <NewSource />
                </ul>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        userIsLogedIn: state.auth.userIsLogedIn,
        sources: state.news.sources
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchSources: id => dispatch(fetchNewsSourcesActionsCreator(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewsSources)

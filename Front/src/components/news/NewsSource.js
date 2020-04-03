import React, { Component } from 'react';
import { attachNewsSourceActionsCreator } from '../../store/actions/newsActions';
import { connect } from 'react-redux';

class NewSource extends Component {

    handleChange ({target}) {
        this.props.attachSource(
            this.props.user._id,
            target.getAttribute('source_id'),
            target.checked ? 1 : 0
        );
    }
    
    render() {

        if (!this.props.source) {
            return ('');
        }
        if (this.props.source) {
            const source = this.props.source;
            return (
                <li className="collection-item">
                    <h5><a href={source.url} target="_blank">{source.name}</a></h5>
                    <div className="switch secondary-content">
                        <label>
                            <input type="checkbox"
                                checked={this.props.subscribedSources.includes(source.id)}
                                onChange={() => this.handleChange(event)}
                                source_id={source.id}>
                            </input>
                            <span className="lever"></span>
                        </label>
                    </div>
                    <p><b>Category:</b> {source.category}</p>
                    <p>{source.description}</p>
                </li>
            );
        }
            
    }
}


const mapStateToProps = state => {
    return {
        user: state.auth.user,
        subscribedSources: state.auth.subscribedSources,
        userIsLogedIn: state.auth.userIsLogedIn,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        attachSource: (id, sourceId, attach) => dispatch(attachNewsSourceActionsCreator(id, sourceId, attach))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewSource)
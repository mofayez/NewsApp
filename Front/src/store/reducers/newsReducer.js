import {
    FETCH_NEWS,
    FETCH_SOURCES
} from '../actions/types';

const intiState = {
    news: [],
    page: 1,
    totalNews: 0,
    totalGotNews: 0,
    sources: []
};

const newsReducer = (state = intiState, { type, payload }) => {
    switch (type) {
        case FETCH_NEWS:
            const news = state.news;
            return {
                ...state,
                news: [...news, ...payload.news],
                totalNews: payload.totalNews,
                page: ++payload.page,
                totalGotNews: state.totalGotNews + payload.news.length
            }
        case FETCH_SOURCES:
            return {
                ...state,
                sources: payload.sources
            }
        default:
            return state;
    }
}

export default newsReducer

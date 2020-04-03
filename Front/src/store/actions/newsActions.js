import {
    getSources, getEveryThing, attachSource
} from '../../services/news';
import {
    FETCH_NEWS,
    FETCH_SOURCES,
    ATTACH_SOURCES,
    SIGNOUNT
} from './types';

export const fetchNewsActionsCreator = (userId, page = null) => {
    return async (dispatch, getState) => {
        try {
            const response = await getEveryThing(userId, page);
            if (response.status === 200) {
                if (response.data.status) {

                    dispatch({
                        type: FETCH_NEWS,
                        payload: {
                            news: response.data.data.news,
                            totalNews: response.data.data.totalNews,
                            page
                        }
                    });
                }
            } else {
                alert('Internal Server Error');
            }
        } catch (err) {
            dispatch({
                type: SIGNOUNT,
            });
        }
    }
}

export const fetchNewsSourcesActionsCreator = (userId) => {
    return async (dispatch, getState) => {
        try {
            const response = await getSources(userId);
            if (response.status === 200) {
                if (response.data.status) {
                    dispatch({
                        type: FETCH_SOURCES,
                        payload: {
                            sources: response.data.data.sources,
                        }
                    });
                }
            } else {
                alert('Internal Server Error');
            }
        } catch (err) {
            dispatch({
                type: SIGNOUNT,
            });
        }
    }
}

export const attachNewsSourceActionsCreator = (id, sourceId, attach) => {
    return async (dispatch, getState) => {
        try {
            const response = await attachSource(id, sourceId, attach);
            if (response.status === 200) {
                if (response.data.status) {

                    dispatch({
                        type: ATTACH_SOURCES,
                        payload: {
                            source: response.data.data.source,
                            attach: response.data.data.attach
                        }
                    });
                }
            } else {
                alert('Internal Server Error');
            }
        } catch (err) {
            console.log(err)
            alert('Internal Server Error');
        }
    }
}
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { routerReducer, routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import bookStore from '../reducer/bookStore';

const getInitialState = () => {
    const initialState = {
        bookStore: {
            books: [],
            book: null,
            fetching: false,
            fetched: false,
            error: null,
            queryText: "",
            totalResults: 0,
            page: 1,
            nextPage: 1
        }

    };

    return initialState;
};

const configureStore = () => {
    const store = createStore(
        combineReducers({
            bookStore:bookStore
        }),
        getInitialState(),
        applyMiddleware(thunk)
    );

    return store;
};

export default configureStore;


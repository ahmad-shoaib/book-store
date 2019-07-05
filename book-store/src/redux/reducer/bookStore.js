import ActionTypes from './../constants/index';

const bookstore = (state = {}, action) => {
  const { type, payload } = action;
  console.log(type, payload)
  switch (type) {
    case ActionTypes.HIDE_SUGGESTION: {
      const { showSuggestions } = payload;
      return { ...state, showSuggestions }
    }
    case ActionTypes.FETCHING_BOOKS: {
      const { queryText, page, nextPage } = payload;
      return { ...state, fetching: true, queryText, page, nextPage }
    }
    case ActionTypes.FETCH_BOOKS_ERROR: {
      const { response } = payload;
      return { ...state, fetching: false, error: response, showSuggestions: false }
    }
    case ActionTypes.FETCH_BOOKS_SUCCESS: {
      const { books, totalResults, page } = payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        books: (page == 1) ? books : state.books.concat(books),
        totalResults,
        page,
        showSuggestions: (page == 1) ? true : false
      }
    }
    case ActionTypes.EMPTY_QUERY: {
      const { books, queryText } = payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        books,
        queryText,
        showSuggestions: false
      }
    }

    case ActionTypes.FETCHING_BOOK_DETAILS: {
      return { ...state, fetching: true, showSuggestions: false, book: null }
    }
    case ActionTypes.FETCH_DETAILS_SUCCESS: {
      const { book } = payload;
      return {
        ...state,
        fetching: false,
        fetched: true,
        book,
      }
    }
    default:
      return state;
  }
}

export default bookstore;


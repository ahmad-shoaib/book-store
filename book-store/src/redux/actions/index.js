import axios from "axios";
import constants from './../constants/index';



export function fetchBooks(queryText, page) {
	return function (dispatch) {

		dispatch({ type: constants.FETCHING_BOOKS, payload: { queryText, page, nextPage: page + 1 } });
		if (queryText.length !== 0) {
			const params = { format: "json", q: queryText, search: 'title', page: page, key: constants.API_KEY };
			axios.get('http://localhost:5000/api/fetchBooks', { params: params })
				.then((response) => {
					const { data } = response;
					const { books, totalResults } = data;
					localStorage.setItem("books-search", JSON.stringify(books.slice(0, 5)));
					dispatch({ type: constants.FETCH_BOOKS_SUCCESS, payload: { books, totalResults, page } });
				})
				.catch((err) => {
					dispatch({ type: constants.FETCH_BOOKS_ERROR, payload: { response: err } })
				})
		}
		else {
			console.log("Here")
			dispatch({ type: constants.FETCH_BOOKS_SUCCESS, payload: { books:[], totalResults:0, page:1 } });
		}

	}
}

export function fetchBookDetails(id) {
	return function (dispatch) {

		dispatch({ type: constants.FETCHING_BOOK_DETAILS });
		const params = { id, key: constants.API_KEY };
		axios.get('http://localhost:5000/api/fetchBookDetails', { params: params })
			.then((response) => {
				const { data } = response;
				const { book } = data;

				dispatch({ type: constants.FETCH_DETAILS_SUCCESS, payload: { book } });
			})
			.catch((err) => {
				dispatch({ type: constants.FETCH_BOOKS_ERROR, payload: { response: err } })
			})


	}
}
export function fetchingEmptyQuery(){
	console.log("HEREEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE")
	return function (dispatch) {
	dispatch({type: "EMPTY_QUERY",payload: { books: [],queryText:""}})
	}
}
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Dashboard from "./components/Dashboard";
import { Provider } from "react-redux"
import Store from "./redux/store/index"
import CustomSearchBar from "./components/CustomSearchBox";
import Template from "./components/Template";
import BookDetailPage from "./views/BookDetailPage";
import FullResultPage from "./views/FullResultPage";
import { Redirect } from 'react-router'
// import createHistory from 'history/createBrowserHistory';
// const history = createHistory();
// const store = configureStore({ history: history });

ReactDOM.render(
    <Provider store={Store()}>
        <Router>
            <Template>
                <Route exact path="/" component={CustomSearchBar} />
                <Route path="/BookDetail/:id" component={BookDetailPage} />
                <Route path='/fullResults/:queryText' component={FullResultPage} />
                {/* <Redirect from='/fullResults/BookDetail/:id' to='/BookDetail/:id'/> */}
                {/* <Route path="/fullResults/BookDetail/:id" component={BookDetailPage} /> */}
            </Template>
        </Router>
    </Provider>,
    document.getElementById('root')
);

{/* <BookDetailPage/> */ }
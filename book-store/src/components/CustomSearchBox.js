import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { Button, Input } from 'antd';
import 'antd/dist/antd.css';
import './../assets/css/index.css'
import { Debounce } from 'react-throttle';
import { connect } from "react-redux"
import { isEqual } from 'lodash';
import { fetchBooks, fetchingEmptyQuery } from "../redux/actions/index"

const { Search } = Input;


function searchResult(query, self) {
    if (query.length > 0)
        self.props.fetchBooks(query, 1);
    else {
        self.props.fetchingEmptyQuery();
        self.setState({
            dataSource: [],
            query: '',
            foundResults: 0
        })
    }
}

class CustomSearchBox extends React.Component {
    state = {
        dataSource: [],
        query: '',
        foundResults: 0
    };
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.bookStore.books, this.props.bookStore.books)) {
            if (this.props.bookStore.books.length <= 5) {
                if (this.props.bookStore.books.length === 0) {
                    this.setState({ dataSource: [], foundResults: 0 })
                    return
                }
                this.setState({ dataSource: this.props.bookStore.books, foundResults: this.props.bookStore.totalResults })
            }
            else {
                let obj = new Array(...this.props.bookStore.books.slice(0, 5));
                this.setState({ dataSource: obj, foundResults: this.props.bookStore.totalResults })
            }
        }
    }

    handle_fetchDetail = (id, book) => {
        localStorage.setItem("book", book);
        this.props.history.push(`BookDetail/${id}`);
    }

    handleSearch = event => {
        this.setState({ query: event.target.value })
        searchResult(event.target.value, this)
    };

    handleSearchbtn = value => {
        this.setState({ query: value })
        searchResult(value, this)
    };

    handle_FullResultSearch = () => {
        this.props.history.push(`fullResults/${this.state.query}`);
    }

    render() {
        const { dataSource, foundResults } = this.state;
        return (
            <Fragment>
                <div className="searchBar">
                    <Debounce time="500" handler="handleSearch">
                        <Search placeholder="Search a Book" onChange={this.handleSearch} onSearch={value => this.handleSearchbtn(value)} enterButton />
                    </Debounce>
                    {
                        dataSource.length > 0 ? dataSource.map(data => {
                            return (
                                <div className="searched-result" onClick={() => this.handle_fetchDetail(data.id, data.book)} key={data.id.toString()}>{data.book} <span className="written-by">Written By</span> {data.author}</div>
                            )
                        }) : null
                    }
                    <Fragment>
                        {foundResults > 5 ?
                            <Button className="btn-results-found" type="dashed" onClick={this.handle_FullResultSearch}>
                                {foundResults} more results found
                          </Button> : null
                        }
                    </Fragment>
                </div>
            </Fragment>
        );
    }
}

const mapDispatchToProps = {
    fetchBooks,
    fetchingEmptyQuery
}

export default withRouter(connect(
    state => state,
    mapDispatchToProps
)(CustomSearchBox))
import React from 'react';
import { withRouter } from "react-router-dom";
import { Input } from 'antd';
import 'antd/dist/antd.css';
import './../assets/css/index.css'
import { connect } from "react-redux"
import { isEqual } from 'lodash';
import { fetchBooks, fetchingEmptyQuery } from "../redux/actions/index"
import InfiniteLoader from 'react-infinite-loader'

function searchResult(self) {
    self.props.fetchBooks(self.state.query, self.state.page);
    self.setState({ page: self.state.page + 1 });
}

class FullResultPage extends React.Component {
    state = {
        dataSource: [],
        query: '',
        page: 1
    };
    componentDidMount() {
        if(this.props.bookStore.books.length==0)
        this.props.history.push('/');
        this.setState({query: this.props.match.params.queryText,
            dataSource: this.props.bookStore.books})
    }
    componentDidUpdate(prevProps, prevState) {
        // only update chart if the data has changed
        if (!isEqual(prevProps.bookStore.books, this.props.bookStore.books)) {
            this.setState({ dataSource: this.props.bookStore.books })
        }
    }

    handle_fetchDetail = (id, book) => {
        localStorage.setItem("book", book);
        this.props.history.replace(`BookDetail/${id}`);
    }

    handleSearch = event => {
        this.setState({ query: event.target.value })
        searchResult(event.target.value, this)
    };

    handleSearchbtn = value => {
        this.setState({ query: value })
        searchResult(value, this)
    };

    render() {
        const { dataSource, query } = this.state;
        return (
            <div className="searchBar">
                <Input placeholder="Basic usage" value={query} disabled/>
                {
                    dataSource.length > 0 ? dataSource.map(data => {
                        return (
                            <div className="searched-result" onClick={() => this.handle_fetchDetail(data.id, data.book)} key={data.id.toString()}>{data.book} <span className="written-by">Written By</span> {data.author}</div>
                        )
                    }) : null
                }
                <InfiniteLoader onVisited={() => searchResult(this)} />
            </div>
        )
    }
}

const mapDispatchToProps = {
    fetchBooks,
    fetchingEmptyQuery
}

export default withRouter(connect(
    state => state,
    mapDispatchToProps
)(FullResultPage))
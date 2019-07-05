import React from 'react';
import { Icon, Button, Input, AutoComplete } from 'antd';
import 'antd/dist/antd.css';
import './../assets/css/index.css'
import { Debounce } from 'react-throttle';
import { connect } from "react-redux"
import {isEqual} from 'lodash';
import { fetchBooks } from "../redux/actions/index"


const { Option } = AutoComplete;



function onSelect(value) {
  console.log('onSelect', value);
}

function searchResult(query, self) {//Here
  // return new Array(getRandomInt(5))
  //   .join('.')
  //   .split('.')
  //   .map((item, idx) => ({
  //     // query,
  //     category: `${query}${idx}`,
  //     count: getRandomInt(200, 100),
  //   }));
  debugger;
  if (query.length > 1)
    self.props.fetchBooks(query, 1);
  // fetchResultList(query).then((response) => {
  //   console.log(query,response)
  //   debugger;
  // })
  //let response = fetchResultList(query),searchResults = [],baseUrl = "https://www.goodreads.com/book/show/";
  // if (response.getResponseCode() === 200) {
  //   console.log(response)
  //   // Parse XML Response
  //   var xml = XmlService.parse(response.getContentText());
  //   var results = xml.getRootElement().getChildren('search')[0];

  //   // Save the result in JSON format
  //   results.getChild('results').getChildren().forEach(function(result) {
  //     result.getChildren('best_book').forEach(function(book) {
  //       searchResults.push({
  //         title: book.getChild('title').getText(),
  //         author: book.getChild('author').getChild('name').getText(),
  //         thumbnail: book.getChild('image_url').getText(),
  //         rating: result.getChild("average_rating").getText(),
  //         url: baseUrl + result.getChild("id").getText()
  //       });
  //     });
  //   });

  // }
  return [];
}

function renderOption(item) {
  return (
    <Option key={item.id} text={item.id}>
      <div className="global-search-item">
        <span className="global-search-item-desc">
          Found {item.book} by
            {item.author}
        </span>
      </div>
    </Option>
  );
}

class SearchBox extends React.Component {
  state = {
    dataSource: [],
  };

  componentDidUpdate(prevProps, prevState) {
    // only update chart if the data has changed
    if (!isEqual(prevProps.bookStore.books,this.props.bookStore.books)) {
      console.log(this.props, this.props.books);
        if (this.props.bookStore.books.length <= 5) {
          console.log("this.props.books.length <= 5 ---- ", this.props.bookStore)
          this.setState({ dataSource: this.props.bookStore.books })
        }
        else {
          console.log("else ---- ", this.props.bookStore.books)
          let obj = new Array(...this.props.bookStore.books.slice(0, 5));
          console.log(obj)
          this.setState({ dataSource: obj })
        }
    }
  }

  handleSearch = value => {
    searchResult(value, this)
    this.setState({
      dataSource: JSON.parse(localStorage.getItem("books-search"))
    });
    // this.setState({
    //   dataSource: value ? searchResult(value, this) : [],
    // });
  };

  render() {
    const { dataSource } = this.state;
    return (
      <div className="global-search-wrapper searchBar">
        <Debounce time="500" handler="handleSearch">
          <AutoComplete
            className="global-search"
            size="large"
            style={{ width: '100%' }}
            dataSource={dataSource.map(renderOption)}
            onSelect={onSelect}
            onSearch={this.handleSearch}
            placeholder="input here"
            optionLabelProp="text"
          >
            <Input
              suffix={
                <Button
                  className="search-btn"
                  style={{ marginRight: -12 }}
                  size="large"
                  type="primary"
                >
                  <Icon type="search" />
                </Button>
              }
            />
          </AutoComplete>
        </Debounce>
      </div>
    );
  }
}

const mapDispatchToProps = {
  fetchBooks
}

export default connect(
  state => state,
  mapDispatchToProps
)(SearchBox)
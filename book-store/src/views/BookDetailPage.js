import React, { Fragment } from 'react';
import { withRouter } from "react-router-dom";
import { connect } from "react-redux"
import 'antd/dist/antd.css';
import './../assets/css/index.css'
import { fetchBookDetails } from "../redux/actions/index"
import { isEqual } from 'lodash';
import { PageHeader, Rate } from 'antd';


class BookDetailPage extends React.Component {
    constructor() {
        super();
        this.state = {
            authorName: '',
            averageRating: '',
            description: '',
            imageUrl: "",
            name: '',
            publicationDate: '',
            reviewsWidget: ''
        };
    };
    componentDidMount() {
        this.props.fetchBookDetails(this.props.match.params.id)
        document.title = `detail of book '${localStorage.getItem("book")}'`
    }
    componentDidUpdate(prevProps, prevState) {
        if (!isEqual(prevProps.bookStore.book, this.props.bookStore.book) && this.props.bookStore.book) {
            this.setState({
                authorName: this.props.bookStore.book.authorName,
                averageRating: this.props.bookStore.book.averageRating,
                description: this.props.bookStore.book.description,
                imageUrl: this.props.bookStore.book.imageUrl,
                name: this.props.bookStore.book.name,
                publicationDate: this.props.bookStore.book.publicationDate,
                reviewsWidget: this.props.bookStore.book.reviewsWidget
            })
        }
    }
    render() {
        const { authorName, averageRating, description, imageUrl, name, publicationDate, reviewsWidget } = this.state;
        function createDiscriptionMarkup() {
            return {
                __html: description
            };
        }
        function createReviewsWidgetMarkup() {
            return {
                __html: reviewsWidget
            };
        }
        return (
            <Fragment>
                <PageHeader onBack={() => { this.props.history.push('/') }} subTitle="Book Detail Page" />
                {
                    authorName !== '' ?
                        (<Fragment>
                            <div className="align-details">
                                <div className="book-name">{name}</div>
                                by 
                                <div className="book-author">{authorName}</div>
                                <div className="publish-date">{publicationDate}</div>
                            </div>
                            <div className="align-details">
                                <img src={imageUrl} alt={name}/>
                            </div>
                            <div className="align-details">
                            <Rate allowHalf defaultValue={parseInt(averageRating)} />
                            </div>
                            <div dangerouslySetInnerHTML={createDiscriptionMarkup()} className="align-discription"/>
                            <div dangerouslySetInnerHTML={createReviewsWidgetMarkup()} className="align-reviews"/>
                        </Fragment>)
                        : null
                }
            </Fragment>
        )
    }
}

const mapDispatchToProps = {
    fetchBookDetails
}

export default withRouter(connect(
    state => state,
    mapDispatchToProps
)(BookDetailPage))
const express = require('express');
const axios = require("axios");
const  xml2js  =  require('react-native-xml2js');
const app = express();

const port = process.env.PORT || 5000;

app.get('/api/fetchBooks', (req, res) => {
	axios.get('https://www.goodreads.com/search/index.xml', {params: req.query})
	.then((response) => {
		xml2js.parseString(response.data,(err,result) => {
			const {search} = result.GoodreadsResponse;
			const searchObj = search[0];
			const searchResults = searchObj.results;
			const totalResults = searchObj['total-results'][0];
			
			const books = (searchResults.length > 0)? 
				searchResults[0].work.map((book, index) => { 
					const bookData = book.best_book[0]; 
					return{
							author: bookData.author[0].name[0],
							book: bookData.title[0],
							id: bookData.id[0]._,
							imageUrl: bookData.small_image_url[0],
							small_image_url: bookData.small_image_url[0]
						}
				})	:[];
				
				res.send({books:books,totalResults:totalResults});
					
			});
		
	}).catch(()=> {});
	
	
});


app.get('/api/fetchBookDetails', (req, res) => {
	axios.get('https://www.goodreads.com/book/show/'+req.query.id+'.xml',{params: req.query})
	.then((response) => {
		xml2js.parseString(response.data,(err,result) => {
				let {book} = result.GoodreadsResponse;
				let data = {};
				if(book.length > 0){
					book = book[0];
					data.name = book.title[0];
					data.id = book.id[0];
					data.description = book.description[0];
					data.averageRating = book.average_rating[0];
					data.publicationDate = book.publication_day[0]+'-'+book.publication_month[0]+'-'+book.publication_year[0];
					data.reviewsWidget = book.reviews_widget[0];
					data.imageUrl = book.image_url[0];
					data.authorName = book.authors[0].author[0].name[0];
				}
				else{
					data = null;
				}
				res.send({ book: data});
			});
		
	}).catch(()=> {});
	
	
});


app.listen(port, () => console.log(`Listening on port ${port}`));
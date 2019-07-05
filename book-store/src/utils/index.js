import axios from "axios";
const convert = require('xml-js');
const KEY = 'mpCBJx5S4QsJC4K9YxLQ';

export const fetchResultList = (query) => {
    //  let apiUrl = "https://www.goodreads.com/search/index.xml",
    //   payload = {
    //     q: query,
    //     key: KEY
    //   },
    //   params = {
    //     method: "GET",
    //     payload: payload,
    //     muteHttpExceptions: true
    //   };
    //let api = `https://www.goodreads.com/search/index.xml?key=${KEY}&title=${title}`;
    //return axios.get(api);
    // return axios({
    //     method: 'get',
    //     url: apiUrl,
    //     data: params
    //   });

//     debugger

//     var baseUrl = "https://www.goodreads.com/book/show/",
//       apiUrl = "https://www.goodreads.com/search/index.xml",
//       apiKey = "ctrlq.org",
//       searchResults = [],
//       payload = {
//         q: query,
//         key: apiKey
//       },
//       params = {
//         method: "GET",
//         payload: payload,
//         muteHttpExceptions: true
//       };
  
//   return UrlFetchApp.fetch(apiUrl, params);

const API = `https://www.goodreads.com/search/index.xml?key=${KEY}&q=${query}`;
return axios.get(API).then(response=>{
    console.log(response)
    console.log(convert.xml2json(response))
    return convert.xml2json(response)
});
};

//key: mpCBJx5S4QsJC4K9YxLQ
//secret: td9raVVpc4HwpBW3BWSRRhHxwfOMeM9EaIufgms1T0
# Book Store Application - React/Redux

1. As soon as you open the app, you see one simple screen with only two items in it:
(a). A text field
(b). A search button
2. As soon as you start typing in the field, you should seeing auto-suggestions. Let’s say
you searched for a term “The Hobbit” which had 200 results against it, here’s how autosuggestions should look like:
(a). Top 5 results should appear upfront with book title and author names. Tapping
on a book name should take you to Book Detail Page.
(b). At the end, there should be a button with title “195 more results”. Tapping on this
button should take you to Full Results Page.
3. Tapping anywhere on the screen, other than auto-suggestions box should dismiss the
box.
4. If there is any text in the text field, tapping on the search button should take you to Full
Results Page

#Tools And Technologies Used
This Application has been developed by using React, Redux, Ant Design, react-infinite-loader, lodash and many other exciting technologies for frontend.

For Backend Express is used for API calls.

#APIs Used
Third party API from GoodReads were utilized
https://www.goodreads.com/api

#Usage
Download or clone the project. 
Project has two parts: 
(a) server-book-store [Server/API] 
(b) book-store [Frontend]
Download the dependencies for both by using npm or yarn.

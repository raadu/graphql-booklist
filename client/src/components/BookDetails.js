import React from 'react';
import {graphql} from 'react-apollo';
import {getBookQuery, deleteBookMutation, getBooksQuery} from '../queries/queries';
import {flowRight as compose} from 'lodash';

const BookDetails = (props) => {

    function deleteBook(bookid) {
        props.deleteBookMutation({
            variables: {
                id: bookid    
            },
            refetchQueries: [{ 
                query: getBooksQuery
            }]
        });
    }

    function displayBookDetails() {
        const {book} = props.getBookQuery;

        if(book) {
            return(
                <div>
                    <h2>{book.name}</h2>
                    <p>{book.genre}</p>
                    <p>{book.author.name}</p>
                    <p>All books by this author</p>
                    <ul className="other-books">
                        {book.author.books.map((item)=> {
                            return(
                                <li key={item.id}>
                                    {item.name}
                                </li>
                            );
                        })
                        }
                    </ul>
                    <button id="delete-button" onClick={() => deleteBook(props.bookid)}>
                        Delete Book
                    </button>
                </div>
            );
        } 
        else {
            return(
                <div>
                    No book selected
                </div>
            );
        }
    }

    return (  
        <div id="book-details">
           {displayBookDetails()}
        </div>
    );
}
 
export default compose(
    graphql(getBookQuery, {
        name: "getBookQuery",
        options: (props) => {
            return {
                variables: {
                    id: props.bookid
                }
            }
        }
    }),
    graphql(deleteBookMutation, {name: "deleteBookMutation"})
)(BookDetails);
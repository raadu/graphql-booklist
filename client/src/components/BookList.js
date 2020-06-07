import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {getBooksQuery} from '../queries/queries';
import BookDetails from './BookDetails';


const BookList = ({data}) => {

    const [selected, setSelected] = useState(null);

    
    function displayBooks() {
        if(data.loading) {
            return(
                <div>
                    Loading Books...
                </div>
            );
        } 
        else {
            return data.books.map((book)=> {
                return(
                    <li key={book.id}
                        onClick={(e) => {setSelected(book.id)}}
                    >
                        <b>{book.name}</b>
                        {" by "} 
                        {book.author.name}
                    </li>
                );
            });
        }
    }

    return (  
        <div>
            <div id="booklist-container">
                <ul id="book-list">
                    {displayBooks()}
                </ul> 
            </div>
            <BookDetails 
                bookid = {selected}
            />
        </div>
    );
}
 
export default graphql(getBooksQuery)(BookList);
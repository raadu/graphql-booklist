import React, {useState} from 'react';
import {graphql} from 'react-apollo';
import {flowRight as compose} from 'lodash';
import {getAuthorsQuery, getBooksQuery, addBookMutation} from '../queries/queries';

const AddBook = (props) => {
    
    //States
    const [name, setName] = useState("");
    const [genre, setGenre] = useState("");
    const [authorid, setAuthorid] = useState("");


    function displayAuthor() {
        let data = props.getAuthorsQuery;

        if(data.loading) {
            return(
               <option disabled>
                   Loading Authors...
               </option> 
            );
        }
        else {
            return data.authors.map((author)=> {
                return(
                    <option key={author.id} value={author.id}>
                        {author.name}
                    </option>
                );
            });
        }
    }

    function submitForm(e) {
        //e.preventDefault();
        props.addBookMutation({
            variables: {
                name: name, 
                genre: genre, 
                authorid: authorid
            },
            refetchQueries: [{ 
                query: getBooksQuery 
            }]
        });
    }

    return (  
        <form id="add-book" onSubmit={(e)=>submitForm(e)}>
            <div className="field">
                <label>Book name:</label>
                <input 
                    type="text" 
                    onChange={(e)=>setName(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Genre:</label>
                <input 
                    type="text" 
                    onChange={(e)=>setGenre(e.target.value)}
                />
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e)=>setAuthorid(e.target.value)}>
                    <option>Select author</option>
                    {displayAuthor()}
                </select>
            </div>
            <button>+</button>
        </form>
    );
}
 
export default compose(
    graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
    graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
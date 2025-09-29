import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm  } from "react-hook-form";

import useMarvelService from "../../services/MarvelService";

import './searchForm.scss'

const SearchForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const [content, setContent] = useState(null);
    
    const {error, getCharacterByName, clearError} = useMarvelService();

    const onSubmit = ({nameChar}) => {
        nameChar = nameChar.toLowerCase();
        nameChar = nameChar.charAt(0).toUpperCase() + nameChar.slice(1);
        
        clearError();
        getCharacterByName(nameChar)
            .then(resultSearching);
    }

    const resultSearching = (res) => {
        setContent(
                <div className="submitInput">
                    <div className="message message-success">There is! Visit {res.name} page?</div>
                    <Link to={`/${res.id}`} className="button button__secondary"><div className="inner">to page</div></Link>
                </div>
        );
    }


    const errorMessage = error ? (<div className="message message-error">The character was not found. Check the name and try again</div>)
    : null 

    

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="form">
            <label htmlFor="nameChar">Or find a character by name:</label>
            <div className="submitInput">
                <input  defaultValue="" {...register("nameChar", {required: true})} placeholder="Enter name" />
                <button type="submit" className="button button__main"><div className="inner">find</div></button>
            </div>
            {errors.nameChar
            ? <div className="message message-error">This field is required</div> 
            : errorMessage || content}
            
            
        </form>
    )
}

export default SearchForm;
             
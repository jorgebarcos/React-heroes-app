import React from 'react'
import { heroes } from '../../data/heroes'
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';

export const SearchScreen = () => {

    const heroesFiltered = heroes;
    
    const [ values, handleInputChange ] = useForm( {
        searchText: ''
    })

    const {searchText} = values

    const handleSearch = (e) => {
        e.preventDefault();
        
        console.log(searchText)
    }


    return (
        <div>
            <h1>SearchSceen</h1>
            <hr/>

            <div className="row">
                <div className="col-5">
                    <h4>Search Form</h4>
                    <hr/>

                    <form onSubmit={handleSearch}>
                        <input type="text"
                        placeholder="Find your hero"
                        className="form-control"
                        name="searchText"
                        value={searchText}
                        autoComplete="off"
                        onChange={handleInputChange}
                        />

                        <button className="btn mt-2 btn-block btn-outline-primary">
                            Search...
                        </button>
                    </form>
                </div>

                <div className="col-7">

                    <h4>Results</h4>
                    <hr/>

                    {
                        heroesFiltered.map( hero => (
                            <HeroCard 
                                key={ hero.id}
                                {...hero}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

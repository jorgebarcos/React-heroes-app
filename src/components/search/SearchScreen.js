import React, { useMemo } from 'react'
import queryString from 'query-string';
import { HeroCard } from '../heroes/HeroCard';
import { useForm } from '../hooks/useForm';
import { useLocation } from 'react-router-dom';
import { getHeroesByName } from '../../selectors/getHeroesByName';


export const SearchScreen = ({history}) => {

    const location = useLocation();
    const { q  = ''} = queryString.parse( location.search );
    console.log(q)

    
    const [ values, handleInputChange ] = useForm( {
        searchText: q
    })
    
    const {searchText} = values

    const heroesFiltered = useMemo(() => getHeroesByName(q), [q])
    


    const handleSearch = (e) => {
        e.preventDefault();
        
        history.push(`?q=${searchText}`)
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
                        (q === '') 
                        && 
                        <div className="alert alert-info">
                        Search a hero
                    </div>
                    }

                    { 
                        (q !== '' && heroesFiltered.length === 0) 
                        && 
                        <div className="alert alert-danger">
                        There is no a hero with {q}
                    </div>
                    }


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

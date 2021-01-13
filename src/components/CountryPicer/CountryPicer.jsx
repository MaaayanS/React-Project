import React, {useState, useEffect} from 'react';
import {NativeSelect, FormControl, StylesProvider} from '@material-ui/core';

import styles from './CountryPicer.module.css';

import {fetchCountries} from '../../api';

const CountryPicker = ({handleCoutryChange}) => {
    const [ fetchedCountries, setFetchedCountries] = useState([]);

    useEffect(() =>{
        const fetchAPI = async () => {
          setFetchedCountries(await fetchCountries());
        }
        fetchAPI();
    }, [setFetchedCountries]);

    console.table(fetchedCountries); //console.log(fetchedCountries); //Arranges the information more clearly

    return( //Gives the selection box
        <FormControl>
            <NativeSelect defaultValue="" onChange={(e) => handleCoutryChange(e.target.value)}>
               <option value="">Global</option>
              {fetchedCountries.map((country, i) => <option key={i} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
}

export default CountryPicker;

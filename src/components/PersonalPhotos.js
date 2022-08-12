import React, { useState, useEffect, useCallback } from 'react';
import PortfolioDataService from '../services/portfolio'

const PersonalPhotos = ({user}) => {

    const[photos, setPhotos] = useState([]);

    const retrivePhotos = useCallback((id) => {
        
        PortfolioDataService.getPortfolio(id)
            .then(response => {
                setPhotos(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    }, [photos]);

    useEffect(() => {
        retrivePhotos();
    }, [retrivePhotos])

return (
    <div className='App'>
        This is the PersonalPhotos page.
    </div>
)}

export default PersonalPhotos;
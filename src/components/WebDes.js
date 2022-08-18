import "./WebDes.css"
import react, {useCallback, useEffect, useState} from "react"
import PhotoDataService from "../services/photos"

const WebDes = ({}) => {

    const[photos, setPhotos] = useState([]);

    const retrivePhotos = useCallback(() => {
        
        PhotoDataService.getAll()
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

        
        <div>
            {photos.map((photo) => {
                return (
                    <div>
                        <img src={photo.img} 
                        alt="Home" 
                        className="homePic"
                        onError={({currentTarget}) => {
                            currentTarget.onError = null;
                            currentTarget.src ="../homepic.jpg"
                        }}/>
                    </div>
                )
            })}
            {/* <img src={photos[0].img} alt="Home picture" className="homePic"/> */}
            <div className="desContainer">
                <h1 className="descriptionTitle">We are Hala Madrid</h1>
                <h5 className="desText">        
                Maybe you want to keep a blog of moments captured on their cameraphone, 
                or maybe you want to show off your best pictures to the whole world in a bid for web celebrity. 
                Or maybe you want to securely and privately share photos of your kids with your family across the country. 
                We make all these things possible and more!
                </h5>
            </div>

            <div className="copyrightContainer">
                <p className="foot">© 2022 Hala Madrid. </p>
            </div>
        </div>
    )
}

export default WebDes;
import "./WebDes.css"

const WebDes = () => {
    return (

        
        <div>
            <img src="../homepic.jpg" alt="Home picture" className="homePic"/>
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
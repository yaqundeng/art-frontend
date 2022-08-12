import { useParams } from "react-router-dom";

const SinglePhoto = ({user}) => {
    let params = useParams();

return (
    <div className='App'>
        This is the SinglePhoto page.
    </div>
)}

export default SinglePhoto;
import React, {useState} from 'react';
import ReactStars from 'react-rating-star-with-type'

function RatingStar(props){
    const [star, setStar] = useState(5);

    const onChange=(nextValue)=>{
        setStar(nextValue)
    }
    
    return <ReactStars 
    onChange={onChange} 
    value={props.productRating}  
    edit={false}  
    activeColor={"#F78D2E"}
    />
}

export {RatingStar}
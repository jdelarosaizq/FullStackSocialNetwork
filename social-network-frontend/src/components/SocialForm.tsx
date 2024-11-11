import React from "react";



const SocialForm:React.FC=() =>{



return (
    <div>
        <form >
            <input type ="text" placeholder="Enter person name" />
            <input type ="text" placeholder="Enter network name" />
            <button type="submit">Check unconnected people</button>
        </form>
    </div>
)

};

export default SocialForm
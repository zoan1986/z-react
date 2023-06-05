import React, { useState } from "react";

function Exemple(){
    const [count, setCount] = useState(0);

    return(
        <div>
            <p>clicked {count} times</p>
            <button onClick={() => setCount(count+1)}>click</button>
        </div>
    );
}

export default Exemple;
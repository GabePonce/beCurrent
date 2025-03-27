import { useState } from "react"
import ExistingHang from "./ExistingHang/ExistingHang"
import NewHang from "./NewHang/NewHang"



const AddHangout = () => {

    // const [hangout, setHangout] = useState(null)
    const [adding, setAdding] = useState(false)
    
    return (
        <div className="addHangout">
            <button onClick={()=>{setAdding(!adding)}}>{ adding ? "Create A Hangout" : "Join A Hangout"}</button>
            {adding ?
             <ExistingHang></ExistingHang>
             :
             <NewHang></NewHang>
            }
            
        </div>
    )
}

export default AddHangout
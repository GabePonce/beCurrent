import { useState } from 'react';
import './HomeScreen.css'

// Component for the Home Screen
function HomeScreen() {
    // Array of hangouts
    const hangouts = [
        {id: 1, name: "Hangout 1", description: "This is the first hangout"},
        {id: 2, name: "Hangout 2", description: "This is the second hangout"},
        {id: 3, name: "Hangout 3", description: "This is the third hangout"},
        {id: 4, name: "Hangout 3", description: "This is the third hangout"},
        {id: 5, name: "Hangout 3", description: "This is the third hangout"},
        {id: 6, name: "Hangout 3", description: "This is the third hangout"},
        {id: 7, name: "Hangout 3", description: "This is the third hangout"},
        {id: 8, name: "Hangout 3", description: "This is the third hangout"},
        {id: 9, name: "Hangout 3", description: "This is the third hangout"},
        {id: 10, name: "Hangout 3", description: "This is the third hangout"}
    ];
    const [selectedIndex, setSelectedIndex] = useState(-1);

    return (
        <>
            {/* If there are no hangouts */}
            {hangouts.length === 0 && <div></div>}
            {/* Display hangouts as a list */}
            <div className="hang">
                <ul>
                    {hangouts.map((hangout, index) => (
                        <li className= {selectedIndex === index ? 'hangouts active' : 'hangouts'}
                        key={hangout.id} 
                        onClick={() => { setSelectedIndex (index)}}>
                            <div className="hangImg">
                                <h2>{hangout.name}</h2>
                                <p>{hangout.description}</p>
                            </div>
                        </li>
                    ))}
                    <li className="addHang">
                        <div>
                            <p>+</p>
                        </div>
                    </li>
                </ul>
            </div>
        </>
  );
}

export default HomeScreen;
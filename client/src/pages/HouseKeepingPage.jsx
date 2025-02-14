import { useState } from "react";
import "/src/index.css";

export default function HouseKeepingPage() {
    const [roomStatuses, setRoomStatuses] = useState(Array(12).fill("red"));

    // Function to handle button click and cycle colors
    const handleClick = (index) => {
        setRoomStatuses(prevStatuses =>
            prevStatuses.map((status, i) => {
                if (i === index) {
                    return status === "red" ? "yellow" : status === "yellow" ? "green" : "red";
                }
                return status;
            })
        );
    };

    return (
        <div className="housekeeping-grid">
            {roomStatuses.map((color, index) => (
                <button
                    key={index}
                    className="housekeeping-button"
                    onClick={() => handleClick(index)}
                    style={{ backgroundColor: color }} // Keep only dynamic styles
                >
                    Room {index + 1}
                </button>
            ))}
        </div>
    );
}
import { useState } from "react";

export default function HouseKeepingPage() {
    const [roomStatuses, setRoomStatuses] = useState(Array(10).fill("red"));

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
        <div style={{ textAlign: "center", padding: "20px" }}>
            <h1>Housekeeping Page</h1>
            <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)", 
                gap: "10px",
                maxWidth: "300px",
                margin: "0 auto"
            }}>
                {roomStatuses.map((color, index) => (
                    <button 
                        key={index}
                        onClick={() => handleClick(index)}
                        style={{
                            backgroundColor: color,
                            color: "black",
                            padding: "20px",
                            border: "none",
                            borderRadius: "5px",
                            fontSize: "16px",
                            cursor: "pointer"
                        }}
                    >
                        Room {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}
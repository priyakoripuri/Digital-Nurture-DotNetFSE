// Using const for fixed values
const eventName = "Music Festival";
const eventDate = "15-July-2026";

// Using let for changing values
let availableSeats = 50;

// Display event information using template literals
let eventInfo = `
Event Name: ${eventName}<br>
Event Date: ${eventDate}<br>
Available Seats: ${availableSeats}
`;

document.getElementById("output").innerHTML = eventInfo;

// Registration decreases seat count
availableSeats--;

console.log("Seats Remaining:", availableSeats);
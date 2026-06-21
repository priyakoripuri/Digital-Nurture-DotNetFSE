// Event Class
class Event {

    constructor(name, date, seats) {
        this.name = name;
        this.date = date;
        this.seats = seats;
    }
}

// Prototype Method
Event.prototype.checkAvailability = function() {

    if(this.seats > 0)
        return "Seats Available";
    else
        return "Registration Closed";
};

// Create Object
const event1 = new Event(
    "Music Festival",
    "15-July-2026",
    50
);

// Display Object Entries
let output = "<h3>Event Details</h3>";

Object.entries(event1).forEach(([key, value]) => {

    output += `<p><b>${key}</b>: ${value}</p>`;
});

output += `<p><b>Status</b>: ${event1.checkAvailability()}</p>`;

document.getElementById("output").innerHTML = output;
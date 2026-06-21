// Event List
const events = [
    { name: "Music Festival", seats: 20 },
    { name: "Food Carnival", seats: 0 },
    { name: "Sports Meet", seats: 15 }
];

// Display only events with available seats
events.forEach(event => {

    if (event.seats > 0) {

        document.getElementById("events").innerHTML +=
        `<p>${event.name} - Seats Available: ${event.seats}</p>`;
    }
    else {

        document.getElementById("events").innerHTML +=
        `<p>${event.name} - Registration Closed</p>`;
    }
});

// Registration Function
function registerEvent(eventName) {

    try {

        let selectedEvent =
        events.find(event => event.name === eventName);

        if (!selectedEvent) {
            throw "Event Not Found";
        }

        if (selectedEvent.seats <= 0) {
            throw "No Seats Available";
        }

        selectedEvent.seats--;

        console.log(
            `${eventName} Registered Successfully`
        );

    } catch(error) {

        console.log("Error: " + error);
    }
}

// Test Registration
registerEvent("Music Festival");
registerEvent("Food Carnival");
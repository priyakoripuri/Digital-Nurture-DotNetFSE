// Event Array
let events = [];

// Function to Add Event
function addEvent(name, category) {

    events.push({
        name: name,
        category: category
    });

    console.log(`${name} added successfully`);
}

// Function to Register User
function registerUser(userName, eventName) {

    console.log(
        `${userName} registered for ${eventName}`
    );
}

// Function to Filter Events
function filterEventsByCategory(category) {

    return events.filter(
        event => event.category === category
    );
}

// Closure to Track Registrations
function registrationCounter() {

    let count = 0;

    return function () {

        count++;

        return count;
    };
}

const musicRegistrations = registrationCounter();

console.log(
    "Music Registration Count:",
    musicRegistrations()
);

console.log(
    "Music Registration Count:",
    musicRegistrations()
);

// Higher-Order Function
function searchEvents(callback) {

    return callback(events);
}

// Add Events
addEvent("Music Festival", "Music");
addEvent("Food Carnival", "Food");
addEvent("Sports Meet", "Sports");

// Callback Function
let musicEvents = searchEvents(function(eventList) {

    return eventList.filter(
        event => event.category === "Music"
    );
});

// Display Output
document.getElementById("output").innerHTML =
`
<h3>Music Events</h3>
<p>${musicEvents[0].name}</p>
`;

registerUser("Priya", "Music Festival");
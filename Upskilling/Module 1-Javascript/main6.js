// Event Array
let events = [
    { name: "Music Festival", category: "Music" },
    { name: "Food Carnival", category: "Food" }
];

// Add New Events using push()
events.push(
    { name: "Workshop on Baking", category: "Food" }
);

events.push(
    { name: "Live Concert", category: "Music" }
);

// Filter only Music Events
let musicEvents = events.filter(
    event => event.category === "Music"
);

// Format Event Names using map()
let formattedEvents = events.map(
    event => `Event: ${event.name}`
);

// Display Output
let output = "<h3>Music Events</h3>";

musicEvents.forEach(event => {
    output += `<p>${event.name}</p>`;
});

output += "<h3>Formatted Events</h3>";

formattedEvents.forEach(event => {
    output += `<p>${event}</p>`;
});

document.getElementById("output").innerHTML = output;
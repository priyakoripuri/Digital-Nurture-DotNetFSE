// Event Data
const events = [
    {
        name: "Music Festival",
        seats: 20
    },
    {
        name: "Food Carnival",
        seats: 15
    }
];

// Access Container
const container =
document.querySelector("#eventContainer");

// Create Event Cards
events.forEach(event => {

    let card =
    document.createElement("div");

    card.style.border = "1px solid black";
    card.style.padding = "10px";
    card.style.margin = "10px";

    card.innerHTML =
    `
    <h3>${event.name}</h3>
    <p>Seats: <span>${event.seats}</span></p>

    <button onclick="register(this)">
        Register
    </button>

    <button onclick="cancel(this)">
        Cancel
    </button>
    `;

    container.appendChild(card);
});

// Register Event
function register(button) {

    let seatSpan =
    button.parentElement.querySelector("span");

    let seats =
    parseInt(seatSpan.textContent);

    if(seats > 0) {
        seatSpan.textContent = seats - 1;
    }
}

// Cancel Registration
function cancel(button) {

    let seatSpan =
    button.parentElement.querySelector("span");

    let seats =
    parseInt(seatSpan.textContent);

    seatSpan.textContent = seats + 1;
}
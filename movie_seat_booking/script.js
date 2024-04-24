const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieSelect = document.getElementById("movie");
let ticketPrice = +movieSelect.value;

populateUI();

//update total and count
const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const seatIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat);
  });

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  const selectedSeatsCount = selectedSeats.length;
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
};

//get data from local storange and populate ui
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if ((selectedSeats != null) & (selectedSeats.length > 0)) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const SelectedMovieIndex = localStorage.getItem("SelectedMovieIndex");
  if (SelectedMovieIndex != null) {
    movieSelect.selectedIndex = SelectedMovieIndex;
  }
}
//movie select event
movieSelect.addEventListener("change", (e) => {
  ticketPrice = +e.target.value;
  localStorage.setItem("SelectedMoviePrice", e.target.value);
  localStorage.setItem("SelectedMovieIndex", e.target.selectedIndex);
  updateSelectedCount();
});
//seat click event
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});
updateSelectedCount();

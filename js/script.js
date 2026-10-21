// SEARCH FUNCTIONALITY
const searchInput = document.getElementById("serviceSearch");

if (searchInput) {
  searchInput.addEventListener("keyup", function () {
    // Get what the user typed and make it lowercase
    const searchValue = searchInput.value.toLowerCase();

    // Get all the service cards
    const serviceCards = document.querySelectorAll(".service-card");

    // Loop through each card
    serviceCards.forEach(function (card) {
      // Get the data-name attribute of the card
      const serviceName = card.getAttribute("data-name").toLowerCase();

      // If the service name includes the search value, show it. Otherwise, hide it.
      if (serviceName.includes(searchValue)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });
}

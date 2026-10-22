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

// --- IMAGE LIGHTBOX ---
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const closeLightbox = document.querySelector(".close-lightbox");

// 1. Get all images inside the services list (or anywhere you want)
const galleryImages = document.querySelectorAll(".service-item img");

if (lightbox && lightboxImg) {
  // 2. Loop through each image and add a click event
  galleryImages.forEach((img) => {
    img.style.cursor = "pointer"; // Show a pointer cursor on hover

    img.addEventListener("click", function () {
      lightbox.classList.add("active"); // Show overlay
      lightboxImg.src = this.src; // Put clicked image inside the overlay
    });
  });

  // 3. Close when clicking the X button
  closeLightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
  });

  // 4. Close when clicking anywhere on the dark background
  lightbox.addEventListener("click", function (e) {
    if (e.target !== lightboxImg) {
      lightbox.classList.remove("active");
    }
  });
}
// --- ENQUIRY FORM CALCULATION ---
const enquiryForm = document.getElementById("enquiryForm");
const enquiryResult = document.getElementById("enquiryResult");

if (enquiryForm && enquiryResult) {
  enquiryForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Stop the page from reloading

    const interest = document.getElementById("interest").value;
    const name = document.getElementById("name").value;

    let responseMessage = "";

    // Check what they selected and generate a custom response
    if (interest === "volunteer") {
      responseMessage = `Thank you, ${name}! We are always looking for volunteers. A team member will email you the available shifts soon.`;
    } else if (interest === "donate-food") {
      responseMessage = `Thank you, ${name}! We need non-perishable foods. Please drop them off at the kitchen on weekdays between 9 AM and 2 PM.`;
    } else if (interest === "donate-funds") {
      responseMessage = `Thank you for your generosity, ${name}! Our banking details are: Bank: FNB, Acc: 123456789. Please use "${name}" as your reference.`;
    } else if (interest === "sponsor") {
      responseMessage = `Thank you, ${name}! We have a sponsorship package available. Our manager will call you to discuss details.`;
    } else {
      responseMessage = `Thank you, ${name}. We have received your enquiry.`;
    }

    // Display the message on the screen
    enquiryResult.innerHTML = responseMessage;
    enquiryResult.className = "form-result success"; // Makes it green

    // Optional: clear the form
    enquiryForm.reset();
  });
}

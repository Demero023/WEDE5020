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

// 1. Get ALL images on the page (excluding the logo and the lightbox image itself)
const galleryImages = document.querySelectorAll("main img, section img");

if (lightbox && lightboxImg) {
  // 2. Loop through each image and add a click event
  galleryImages.forEach((img) => {
    // Don't make the logo clickable
    if (img.src.includes("logo.jpg")) return;

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

//I have created a Formspree form with the endpoint
const contactForm = document.getElementById("contactForm");
const contactError = document.getElementById("contactError");

if (contactForm && contactError) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("contactName").value;
    const email = document.getElementById("contactEmail").value;
    const phone = document.getElementById("contactPhone").value;
    const message = document.getElementById("contactMessage").value;

    contactError.style.display = "none";

    // Validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      contactError.style.display = "block";
      contactError.className = "form-result error";
      contactError.innerHTML =
        "Error: Please enter a valid 10-digit phone number.";
      return;
    }

    // Show loading message
    contactError.style.display = "block";
    contactError.className = "form-result success";
    contactError.innerHTML = "Sending your message...";

    // AJAX Fetch Request
    fetch("https://formspree.io/f/mgaaeoak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        email: email,
        phone: phone,
        message: message,
      }),
    })
      .then((response) => {
        if (response.ok) {
          contactError.innerHTML =
            "Message sent successfully! We will get back to you soon.";
          contactForm.reset();
        } else {
          contactError.className = "form-result error";
          contactError.innerHTML =
            "Oops! There was a problem sending your message.";
        }
      })
      .catch((error) => {
        contactError.className = "form-result error";
        contactError.innerHTML = "Network error. Please try again later.";
      });
  });
}

// --- ACCORDION FUNCTIONALITY ---
const accordionButtons = document.querySelectorAll(".accordion-btn");

if (accordionButtons.length > 0) {
  accordionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Toggle the 'active' class on the content next to the button
      const content = this.nextElementSibling;
      content.classList.toggle("active");

      // Change button text to show +/- (optional)
      if (content.classList.contains("active")) {
        this.style.backgroundColor = "#e3f0fc";
      } else {
        this.style.backgroundColor = "#f7fbff";
      }
    });
  });
}

// --- BACK TO TOP BUTTON ---
const backToTopBtn = document.getElementById("backToTop");

if (backToTopBtn) {
  window.onscroll = function () {
    // Show button after scrolling down 300px
    if (
      document.body.scrollTop > 300 ||
      document.documentElement.scrollTop > 300
    ) {
      backToTopBtn.style.display = "block";
    } else {
      backToTopBtn.style.display = "none";
    }
  };

  backToTopBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
// --- TABS FUNCTIONALITY ---
const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

if (tabBtns.length > 0) {
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      // 1. Remove 'active' from all buttons and contents
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      // 2. Add 'active' to the clicked button
      this.classList.add("active");

      // 3. Find the matching content div and show it
      const targetId = this.getAttribute("data-target");
      document.getElementById(targetId).classList.add("active");
    });
  });
}

const apiUrl = "https://veronicabp.com/ecommerce/wp-json/wp/v2/posts";
const carouselContainer = document.querySelector(".carousel-container");
const carouselInner = carouselContainer.querySelector(".carousel-inner");
const carouselPrevButton = carouselContainer.querySelector(".carousel-prev");
const carouselNextButton = carouselContainer.querySelector(".carousel-next");

let currentIndex = 0; // Index of current image displayed
let images = []; // Global scope for image data

// Create the charging indicator
const loadingIndicator = document.createElement("div");
loadingIndicator.classList.add("loading-indicator");
carouselContainer.appendChild(loadingIndicator);

// Function to display the charging indicator
function showLoadingIndicator() {
    loadingIndicator.style.display = "block";
}

// Function to hide the charging indicator
function hideLoadingIndicator() {
    loadingIndicator.style.display = "none";
}

// Function to retrieve image data from the API
async function fetchImages() {
    try {
        showLoadingIndicator(); // Show the loading indicator before retrieving images
        const response = await fetch(apiUrl);
        const posts = await response.json();

        // Extract the image URLs from the API response
        images = posts.map(post => ({
            src: post.jetpack_featured_media_url,
            alt: post.title.rendered
        }));

        return images;
    } catch (error) {
        console.error("Error fetching images:", error);
    } finally {
        hideLoadingIndicator(); // Hide the loading indicator after image data is fetched
    }
}

// Function to update the carousel with images
async function updateCarousel() {
    if (!images || images.length === 0) {
        console.log("No images found.");
        return;
    }

    // Remove previous image elements
    carouselInner.innerHTML = " ";

    // Limit the view to only three images
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + 3, images.length);

    for (let i = startIndex; i < endIndex; i++) {
        const image = images[i];

        // Create carousel elements
        const carouselCard = document.createElement("div");
        carouselCard.classList.add("carousel-card", "carousel-featured");

        const img = document.createElement("img");
        img.classList.add("carousel__image");
        img.src = image.src;
        img.alt = image.alt;

        // Adjust the opacity of image based on whether it is the current image or not
        if (i === currentIndex) {
            img.style.opacity = 1; // Current image
        } else {
            img.style.opacity = 0.5; // Other images
        }

        const link = document.createElement("a");
        link.href = "blog.html";
        link.appendChild(img);

       // Add carousel elements to the carousel container
        carouselCard.appendChild(link);
        carouselInner.appendChild(carouselCard);
    }
}

// Click function to go to previous image
carouselPrevButton.addEventListener("click", () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
});

// Click function to go to the next image
carouselNextButton.addEventListener("click", () => {
    currentIndex = Math.min(currentIndex + 1, images.length - 1);
    updateCarousel();
});

// Call the function to retrieve image data and update the carousel on page load
fetchImages().then(updateCarousel);




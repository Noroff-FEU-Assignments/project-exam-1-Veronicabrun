const apiUrl = "https://veronicabp.com/ecommerce/wp-json/wp/v2/posts";
let offset = 0;

import { displayErrorMessage, removeErrorMessage } from "./error-message.js";

function showLoadingIndicator(container) {
    const loadingIndicator = document.createElement("div");
    loadingIndicator.classList.add("loading-indicator");
    container.appendChild(loadingIndicator);
}

function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector(".loading-indicator");
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}?per_page=10&offset=${offset}`);

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error("Error fetching posts:", error);
        throw error; // Pass the error to catch it in displayPosts
    }
}

async function displayPosts() {
    const blogContainer = document.querySelector(".blog-container");
   
    showLoadingIndicator(blogContainer); // Show the loading indicator near the blog posts

    try {
        const posts = await fetchPosts();

        hideLoadingIndicator(); // Hide the loading indicator when the records are loaded

        if (!posts || posts.length === 0) {
            console.log("No more posts to load.");
            return;
        }

        posts.forEach(post => {
            const blogSection = document.createElement("section");
            blogSection.classList.add("blog-section");

            const leftContainer = document.createElement("div");
            leftContainer.classList.add("left-blog-container");
            leftContainer.innerHTML = `
                <div class="container-text">
                    <h2 class="text-blog-container">${post.title.rendered}</h2>
                    <a href="post.html?id=${post.id}" class="cta-blog">READ HERE</a>
                </div>
            `;

            const rightContainer = document.createElement("div");
            rightContainer.classList.add("right-blog-container");
            rightContainer.innerHTML = `
                <img class="blog-img" src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
            `;

            blogSection.appendChild(leftContainer);
            blogSection.appendChild(rightContainer);

            blogContainer.appendChild(blogSection);
        });

        // Increase offset for next call
        offset += 10;
    }
    catch (error) {
        console.error("Error displaying posts:", error);
        displayErrorMessage("Something went wrong while retrieving posts. Please try again later.");
   } 
    finally {
        hideLoadingIndicator(); // Hides the charging indicator regardless of whether an error occurred or not
   }
}

// Listen function for click on "READ MORE" button
document.querySelector(".cta-blog-bottom").addEventListener("click", displayPosts);

// Load the first 10 blog posts when the page loads
window.addEventListener("load", displayPosts);

document.querySelector(".cta-blog-bottom").addEventListener("click", async function(event) {
    event.preventDefault(); // Prevents default behavior (jumping to the top of the page)


    const numberOfPosts = document.querySelectorAll(".blog-section").length;
    if (numberOfPosts >= 10) {
        console.log("All posts already loaded.");
        return;
    }
   // Load more records
   await displayPosts();
});



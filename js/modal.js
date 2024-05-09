document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('id');

    // Get the specific blog post based on postId
    async function fetchPost() {
        try {
            const response = await fetch(`https://veronicabp.com/ecommerce/wp-json/wp/v2/posts/${postId}`);
            const post = await response.json();

            displayPost(post);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }

    // Show the loading indicator while the blog post is loading
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    const mainElement = document.querySelector('main');
    const secondHrLineDiv = document.querySelectorAll('.hr-line')[1];
    mainElement.insertBefore(loadingIndicator, secondHrLineDiv);

   // Display the specific blog post
    function displayPost(post) {
      // Remove the charging indicator
        loadingIndicator.remove();

      // Create a new section element for the blog post
        const postContainer = document.createElement('section');
        postContainer.classList.add('post-container');

       // Create a new div element for the header
        const postHeaderContainer = document.createElement('div');
        postHeaderContainer.classList.add('post-header-container');

       // Create a new h2 element for the header
        const postHeader = document.createElement('h2');
        postHeader.classList.add('post-header');
        postHeader.textContent = post.title.rendered;

        // Add the header to the header container
        postHeaderContainer.appendChild(postHeader);

        // Add the header container to the post container
        postContainer.appendChild(postHeaderContainer);

        // Create a new div element for the image
        const postImageContainer = document.createElement('div');
        postImageContainer.classList.add('post-image-container');

        // Create a new img element for the image
        const postImage = document.createElement('img');
        postImage.classList.add('post__image');
        postImage.src = post.jetpack_featured_media_url; // Change to the correct image URL
        postImage.alt = post.title.rendered;

       // Update title of the specific blog post
        document.title = post.title.rendered + ' | My Blog';

        // Legg til bildet i bildcontaineren
        postImageContainer.appendChild(postImage);

        // Add the image to the image container
        postContainer.appendChild(postImageContainer);

        // Create a new section element for the text
        const postTextContainer = document.createElement('section');
        postTextContainer.classList.add('post-text-container');

        const postText = document.createElement('div');
        postText.classList.add('post-text');
        postText.innerHTML = post.content.rendered;

        postTextContainer.appendChild(postText);

        postContainer.appendChild(postTextContainer);

// Create a new button element for the "Back to All Posts" button
const backToAllPostsButton = document.createElement('button');
backToAllPostsButton.classList.add('back-to-posts');
backToAllPostsButton.textContent = 'ALL POSTS';

// Add event listener to the "Back to All Posts" button
backToAllPostsButton.addEventListener('click', function() {
    // Handle the click event by navigating back to the page that displays all posts
    window.location.href = 'blog.html'; // Erstatt 'URL to All Posts Page' med den faktiske URL-en
});

// Add the button after the text container
postContainer.appendChild(backToAllPostsButton);

        

        // Find the location where you want to insert the postContainer in the HTML structure
        mainElement.insertBefore(postContainer, secondHrLineDiv);

        // Remove image gallery content
        document.querySelectorAll('.post-container *').forEach(element => {
            if (isGalleryFigure(element)) {
                element.remove();
            }
        });

        // Add the image click event listener to the displayPost function
        postImage.addEventListener('click', function() {
            openModal(post.jetpack_featured_media_url);
        });
    }

    // Function to open the modal and display the image
    function openModal(imageUrl) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        modal.style.display = 'block';
        modalImage.src = imageUrl;
    }
  
   // Function to close the modal
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }
  
   // Add event listeners to close the modal when the user clicks outside the image
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
  
    // Add event listeners to close the modal when the user clicks the close button
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    fetchPost();
});

// Function to filter out image gallery content
function isGalleryFigure(element) {
    return element.tagName === 'FIGURE' && element.classList.contains('wp-block-gallery');
}



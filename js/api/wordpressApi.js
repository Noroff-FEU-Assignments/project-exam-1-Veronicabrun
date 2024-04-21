const apiUrl = 'https://veronicabp.com/ecommerce/wp-json/wp/v2/posts';
let offset = 0;

// Funksjon for å vise ladeindikatoren
function showLoadingIndicator(container) {
    const loadingIndicator = document.createElement('div');
    loadingIndicator.classList.add('loading-indicator');
    container.appendChild(loadingIndicator);
}

// Funksjon for å skjule ladeindikatoren
function hideLoadingIndicator() {
    const loadingIndicator = document.querySelector('.loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.remove();
    }
}

async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}?per_page=10&offset=${offset}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

async function displayPosts() {
    const blogContainer = document.querySelector('.blog-container');
    showLoadingIndicator(blogContainer); // Vis ladeindikatoren nær bloggpostene

    const posts = await fetchPosts();

    hideLoadingIndicator(); // Skjul ladeindikatoren når postene er lastet inn

    if (!posts || posts.length === 0) {
        console.log('No more posts to load.');
        return;
    }

    posts.forEach(post => {
        const blogSection = document.createElement('section');
        blogSection.classList.add('blog-section');

        const leftContainer = document.createElement('div');
        leftContainer.classList.add('left-blog-container');
        leftContainer.innerHTML = `
            <div class="container-text">
                <h2 class="text-blog-container">${post.title.rendered}</h2>
                <a href="post.html?id=${post.id}" class="cta-blog">READ HERE</a>
            </div>
        `;

        const rightContainer = document.createElement('div');
        rightContainer.classList.add('right-blog-container');
        rightContainer.innerHTML = `
            <img class="blog-img" src="${post.jetpack_featured_media_url}" alt="${post.title.rendered}">
        `;

        blogSection.appendChild(leftContainer);
        blogSection.appendChild(rightContainer);

        blogContainer.appendChild(blogSection);
    });

    // Øk offset for neste kall
    offset += 10;
}

// Lyttefunksjon for klikk på "READ MORE" -knappen
document.querySelector('.cta-blog-bottom').addEventListener('click', displayPosts);

// Last inn de første 10 bloggpostene når siden lastes
window.addEventListener('load', displayPosts);

// Lyttefunksjon for klikk på "READ MORE" -knappen
document.querySelector('.cta-blog-bottom').addEventListener('click', async function(event) {
  event.preventDefault(); // Forhindrer standard oppførsel (å hoppe til toppen av siden)

  // Sjekk om det allerede er lastet inn nok poster
  const numberOfPosts = document.querySelectorAll('.blog-section').length;
  if (numberOfPosts >= 10) {
    console.log('All posts already loaded.');
    return;
  }

  // Last inn flere poster
  await displayPosts();
});



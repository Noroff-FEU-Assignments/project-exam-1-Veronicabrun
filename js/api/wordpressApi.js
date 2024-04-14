













// wordpressApi.js

//const apiUrl = 'https://veronicabp.com/ecommerce/wp-json/wp/v2/posts';

//async function fetchPosts() {
  //try {
    //const response = await fetch(apiUrl);
    //const posts = await response.json();
    //displayPosts(posts);
  //} catch (error) {
    //console.error('Error fetching posts:', error);
  //}
//}

//function displayPosts(posts) {
  //const blogContainer = document.querySelector('.blog-container');
  //blogContainer.innerHTML = ''; // Clear previous content

  //posts.forEach(post => {
    //const blogSection = document.createElement('section');
    //blogSection.classList.add('blog-post');

    //const leftContainer = document.createElement('div');
    //leftContainer.classList.add('left-blog-container');

    //const containerText = document.createElement('div');
    //containerText.classList.add('container-text');

    //const title = document.createElement('h2');
    //title.classList.add('text-blog-container');
    //title.textContent = post.title.rendered;

    //const readLink = document.createElement('a');
    //readLink.classList.add('cta-blog');
    //readLink.setAttribute('href', post.link);
    //readLink.textContent = 'READ HERE';

    //containerText.appendChild(title);
    //leftContainer.appendChild(containerText);
    //leftContainer.appendChild(readLink);

    //const rightContainer = document.createElement('div');
    //rightContainer.classList.add('right-blog-container');

    //const img = document.createElement('img');
    //img.classList.add('blog-img');
    //img.setAttribute('src', post.image_url); // Replace 'image_url' with the correct property for the image in your WordPress API response
    //img.setAttribute('alt', post.image_alt); // Replace 'image_alt' with the correct property for the alt text in your WordPress API response

    //rightContainer.appendChild(img);

    //blogSection.appendChild(leftContainer);
    //blogSection.appendChild(rightContainer);

    //blogContainer.appendChild(blogSection);
  //});
//}

//fetchPosts();


// wordpressApi.js

// wordpressApi.js denne fungerer til blo.html

const apiUrl = 'https://veronicabp.com/ecommerce/wp-json/wp/v2/posts';


async function fetchPosts() {
    try {
        const response = await fetch(apiUrl);
        const posts = await response.json();

        displayPosts(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

function displayPosts(posts) {
    const blogContainer = document.querySelector('.blog-container');

    posts.forEach(post => {
        const blogSection = document.createElement('section');
        blogSection.classList.add('blog-section'); // Legg til en ny klasse for hver bloggseksjon

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
    
}

//Legge denne funksjonen i en egen fil?

let offset = 0; // Antall poster som allerede er lastet inn

// Funksjon for å hente bloggposter fra API-et
async function fetchPosts() {
    try {
        const response = await fetch(`${apiUrl}?per_page=10&offset=${offset}`);
        const posts = await response.json();
        return posts;
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
}

// Funksjon for å vise bloggposter på siden
async function displayPosts() {
    const blogContainer = document.querySelector('.blog-container');
    const posts = await fetchPosts();

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


fetchPosts();



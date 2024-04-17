
//const apiUrl = 'https://veronicabp.com/ecommerce/wp-json/wp/v2/posts';

//async function fetchPosts() {
  //try {
    //const response = await fetch(apiUrl);
    //const posts = await response.json();
    //displayPosts(posts);
  //} catch (error) {
   // console.error('Error fetching posts:', error);
  //}
//}

//function displayPosts(posts) {
  //const carouselInner = document.querySelector('.carousel-inner');
  //carouselInner.innerHTML = ''; // Clear previous content
  //posts.forEach(post => {
    //const slide = document.createElement('div');
    //slide.classList.add('carousel-slide');
    //slide.innerHTML = `
      //<h2>${post.title.rendered}</h2>
      //<p>${post.content.rendered}</p>
    //`;
    //carouselInner.appendChild(slide);
  //});
//}

const apiUrl = 'https://veronicabp.com/ecommerce/wp-json/wp/v2/posts';
const carouselContainer = document.querySelector('.carousel-container');
const carouselInner = carouselContainer.querySelector('.carousel-inner');
const carouselPrevButton = carouselContainer.querySelector('.carousel-prev');
const carouselNextButton = carouselContainer.querySelector('.carousel-next');

let currentIndex = 0; // Indeks for gjeldende bilde som vises
let images = []; // Globalt omfang for bildedata

// Opprett ladeindikatoren
const loadingIndicator = document.createElement('div');
loadingIndicator.classList.add('loading-indicator');
carouselContainer.appendChild(loadingIndicator);

// Funksjon for å vise ladeindikatoren
function showLoadingIndicator() {
    loadingIndicator.style.display = 'block';
}

// Funksjon for å skjule ladeindikatoren
function hideLoadingIndicator() {
    loadingIndicator.style.display = 'none';
}

// Funksjon for å hente bildedata fra API-et
async function fetchImages() {
    try {
        showLoadingIndicator(); // Vis ladeindikatoren før henting av bilder
        const response = await fetch(apiUrl);
        const posts = await response.json();

        // Hent ut bilde-URL-ene fra API-responsen
        images = posts.map(post => ({
            src: post.jetpack_featured_media_url,
            alt: post.title.rendered
        }));

        return images;
    } catch (error) {
        console.error('Error fetching images:', error);
    } finally {
        hideLoadingIndicator(); // Skjul ladeindikatoren etter at bildedata er hentet
    }
}

// Funksjon for å oppdatere karusellen med bilder
async function updateCarousel() {
    if (!images || images.length === 0) {
        console.log('No images found.');
        return;
    }

    // Fjern tidligere bildeelementer
    carouselInner.innerHTML = '';

    // Begrens visningen til bare tre bilder
    const startIndex = currentIndex;
    const endIndex = Math.min(currentIndex + 3, images.length);

    for (let i = startIndex; i < endIndex; i++) {
        const image = images[i];

        // Opprett karusellelementer
        const carouselCard = document.createElement('div');
        carouselCard.classList.add('carousel-card', 'carousel-featured');

        const img = document.createElement('img');
        img.classList.add('carousel__image');
        img.src = image.src;
        img.alt = image.alt;

        // Juster opasiteten til bilde basert på om det er det gjeldende bildet eller ikke
        if (i === currentIndex) {
            img.style.opacity = 1; // Gjeldende bilde
        } else {
            img.style.opacity = 0.5; // Andre bilder
        }

        const link = document.createElement('a');
        link.href = 'blog.html';
        link.appendChild(img);

        // Legg karusellelementer til karusell-containeren
        carouselCard.appendChild(link);
        carouselInner.appendChild(carouselCard);
    }
}

// Klikkfunksjon for å gå til forrige bilde
carouselPrevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - 1);
    updateCarousel();
});

// Klikkfunksjon for å gå til neste bilde
carouselNextButton.addEventListener('click', () => {
    currentIndex = Math.min(currentIndex + 1, images.length - 1);
    updateCarousel();
});

// Kall funksjonen for å hente bildedata og oppdatere karusellen ved lasting av siden
fetchImages().then(updateCarousel);




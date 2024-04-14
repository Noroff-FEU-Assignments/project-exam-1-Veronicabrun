// Henter modalen og knappen for å åpne modalen
//const modal = document.getElementById("myModal");
//const btn = document.getElementById("myBtn");
//const span = document.getElementsByClassName("close")[0];

// Når brukeren klikker på knappen, åpner modalen
//btn.onclick = function() {
    //modal.style.display = "block";
//}

// Når brukeren klikker på lukkeknappen (x), lukker modalen
//span.onclick = funcktion() {
    //modal.style.display = "none";
//}

// Når brukeren klikker utenfor modalen, lukker modalen
//window.onclick = function(event) {
    //if (event.target == modal) {
        //modal.style.display ="none";
    //}
//}

document.addEventListener('DOMContentLoaded', async function () {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const postId = urlParams.get('id');

    // Hent den spesifikke bloggposten basert på postId
    async function fetchPost() {
        try {
            const response = await fetch(`https://veronicabp.com/ecommerce/wp-json/wp/v2/posts/${postId}`);
            const post = await response.json();

            displayPost(post);
        } catch (error) {
            console.error('Error fetching post:', error);
        }
    }

    // Vis den spesifikke bloggposten
    function displayPost(post) {
        // Opprett et nytt seksjonselement for bloggposten
        const postContainer = document.createElement('section');
        postContainer.classList.add('post-container');

        // Opprett et nytt div-element for overskriften
        const postHeaderContainer = document.createElement('div');
        postHeaderContainer.classList.add('post-header-container');

        // Opprett et nytt h2-element for overskriften
        const postHeader = document.createElement('h2');
        postHeader.classList.add('post-header');
        postHeader.textContent = post.title.rendered;

        // Legg til overskriften i overskriftscontaineren
        postHeaderContainer.appendChild(postHeader);

        // Legg til overskriftscontaineren i post-containeren
        postContainer.appendChild(postHeaderContainer);

        // Opprett et nytt div-element for bildet
        const postImageContainer = document.createElement('div');
        postImageContainer.classList.add('post-image-container');

        // Opprett et nytt img-element for bildet
        const postImage = document.createElement('img');
        postImage.classList.add('post__image');
        postImage.src = post.jetpack_featured_media_url; // Endre til riktig bilde-URL
        postImage.alt = post.title.rendered;

        // Oppdater tittel til den spesifikke bloggposten
        document.title = post.title.rendered + ' | My Blog';

        // Legg til bildet i bildcontaineren
        postImageContainer.appendChild(postImage);

        // Legg til bildcontaineren i post-containeren
        postContainer.appendChild(postImageContainer);

        // Opprett et nytt seksjonselement for teksten
        const postTextContainer = document.createElement('section');
        postTextContainer.classList.add('post-text-container');

        const postText = document.createElement('div');
        postText.classList.add('post-text');
        postText.innerHTML = post.content.rendered;

        postTextContainer.appendChild(postText);

        postContainer.appendChild(postTextContainer);

        // Finn plasseringen der du vil sette inn postContainer i HTML-strukturen
        const mainElement = document.querySelector('main');
        const secondHrLineDiv = document.querySelectorAll('.hr-line')[1];
        mainElement.insertBefore(postContainer, secondHrLineDiv);

        // Fjern bildegalleri-innhold
        document.querySelectorAll('.post-container *').forEach(element => {
            if (isGalleryFigure(element)) {
                element.remove();
            }
        });

        // Legg til bildeklikk-hendelseslytteren i displayPost-funksjonen
        postImage.addEventListener('click', function() {
            openModal(post.jetpack_featured_media_url);
        });
    }

    // Funksjon for å åpne modalen og vise bildet
    function openModal(imageUrl) {
        const modal = document.getElementById('modal');
        const modalImage = document.getElementById('modal-image');
        modal.style.display = 'block';
        modalImage.src = imageUrl;
    }
  
    // Funksjon for å lukke modalen
    function closeModal() {
        const modal = document.getElementById('modal');
        modal.style.display = 'none';
    }
  
    // Legg til hendelseslytter for å lukke modalen når brukeren klikker utenfor bildet
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modal');
        if (event.target === modal) {
            closeModal();
        }
    });
  
    // Legg til hendelseslytter for å lukke modalen når brukeren klikker på lukkeknappen
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', closeModal);

    fetchPost();
});

// Funksjon for å filtrere ut bildegalleri-innhold
function isGalleryFigure(element) {
    return element.tagName === 'FIGURE' && element.classList.contains('wp-block-gallery');
}


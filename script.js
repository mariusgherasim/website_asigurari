// ========================================
// GOOGLE ANALYTICS
// ========================================

function trackEvent(eventName, parameters = {}) {

    if (typeof gtag === "function") {

        gtag("event", eventName, parameters);

        console.log(
            "GA4:",
            eventName,
            parameters
        );

    }

}

// ========================================
// VARIABILE GLOBALE
// ========================================

const hamburger = document.querySelector('.hamburger');

const menu = document.querySelector('.menu');hamburger.addEventListener('click',()=>{menu.classList.toggle('active');});

const accordion =document.querySelector('.accordion');

const content =document.querySelector('.accordion-content');

accordion.addEventListener('click',()=>{if(content.style.display==="block"){content.style.display="none";}else{content.style.display="block";}});

fetch('data/reviste.json')
.then(response => response.json())
.then(data => {

const container =document.getElementById('reviste-container');
data.forEach(revista => {

container.innerHTML += `
<div class="card">
<h3>${revista.titlu}</h3>
<a href="${revista.link}"
target="_blank"
class="btn">
Deschide revista
</a>
</div>
`;
});
});



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

// ========================================
// CONTACT FORM
// ========================================

const contactForm = document.querySelector("form");

if (contactForm) {

    contactForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(contactForm);

        const object = Object.fromEntries(formData);
        const json = JSON.stringify(object);

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: json
            });

            const result = await response.json();

            if (result.success) {

                trackEvent("generate_lead", {
                    form_name: "contact_asigurari"
                });

                window.location.href =
                    "https://gherasimmarius.com/contact-multumesc.html";

            } else {

                alert("A apărut o eroare. Încearcă din nou.");

            }

        } catch (error) {

            console.error(error);

            alert("A apărut o eroare de conexiune.");

        }

    });

}

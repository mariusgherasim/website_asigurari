document.addEventListener("DOMContentLoaded", () => {

    fetch("reviste.json")
        .then(response => response.json())
        .then(reviste => {

            const container =
                document.getElementById("magazine-grid");

            reviste.forEach(revista => {

                const card =
                    document.createElement("div");

                card.className =
                    "magazine-card";

                const textButon =
                    revista.tip === "pdf"
                        ? "Descarcă PDF →"
                        : "Vezi ediția completă →";

                card.innerHTML = `
                    <img src="${revista.coperta}" alt="${revista.titlu}">

                    <h3>${revista.titlu}</h3>

                    ${revista.descriere
                        ? `<p>${revista.descriere}</p>`
                        : ""}

                    <a href="${revista.link}"
                       target="_blank"
                       class="btn-primary">

                        ${textButon}

                    </a>
                `;

                container.appendChild(card);

            });

            initCarousel();

        })
        .catch(error => {
            console.error(error);
        });

});

function initCarousel(){

    const slider =
        document.getElementById("magazine-grid");

    const cards =
        document.querySelectorAll(".magazine-card");

    const leftBtn =
        document.getElementById("mag-left");

    const rightBtn =
        document.getElementById("mag-right");

    let currentIndex =
        Math.floor(cards.length / 2);

    function updateActiveCard(){

        cards.forEach(card => {
            card.classList.remove("active");
        });

        cards[currentIndex].classList.add("active");

        cards[currentIndex].scrollIntoView({
            behavior:"smooth",
            inline:"center",
            block:"nearest"
        });

    }

    updateActiveCard();

    rightBtn.addEventListener("click", () => {

        if(currentIndex < cards.length - 1){

            currentIndex++;

            updateActiveCard();

        }

    });

    leftBtn.addEventListener("click", () => {

        if(currentIndex > 0){

            currentIndex--;

            updateActiveCard();

        }

    });

    slider.addEventListener("scroll", () => {

        let closestIndex = 0;

        let smallestDistance = Infinity;

        cards.forEach((card,index)=>{

            const rect =
                card.getBoundingClientRect();

            const center =
                window.innerWidth / 2;

            const distance =
                Math.abs(
                    rect.left +
                    rect.width/2 -
                    center
                );

            if(distance < smallestDistance){

                smallestDistance =
                    distance;

                closestIndex =
                    index;

            }

        });

        cards.forEach(card => {
            card.classList.remove("active");
        });

        cards[closestIndex]
            .classList.add("active");

        currentIndex =
            closestIndex;

    });

}
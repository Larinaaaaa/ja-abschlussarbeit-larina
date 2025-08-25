async function loadData() {
    const response = await fetch('http://localhost:8080/api/animals');
    const animals = await response.json();
    console.log(animals);

    const cardContainer = document.getElementById('cardContainer');

    animals.forEach(animal => {
        cardContainer.innerHTML += generateCard(animal);
    });

    const loadingSpinner = document.getElementById("loading-spinner");
    loadingSpinner.remove();
}

function generateCard(content) {
    return `<groupui-card>
                <groupui-headline font-variant="TheGroupHEAD-Light" serif="true" weight="light" heading="h6">${content.name}</groupui-headline>
                ${content.numberOfLegs}
            </groupui-card>`
}

loadData();
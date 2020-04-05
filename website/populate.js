/* 
 * This function is used to dynamically generate content 
 * cards for the data retrieved from DynamoDB.
 */
function generateSpeciesCards() {
    console.log("Called generateSpeciesCards() with available Dynamo data.");
    let data = JSON.parse(localStorage.getItem("crowFactsSpeciesData"));
    data['body']['Items'].forEach(createSpeciesCard);
}

function createSpeciesCard(item, index) {
    let topLevel = document.getElementById("crowFacts");
    let newCard = document.createElement("div");
    newCard.classList.add('col-12', 'col-md-6');
    let newCardRow = document.createElement("div");
    newCardRow.classList.add("row");

    /* Create image div */
    let newCardImage = document.createElement("div");
    newCardImage.classList.add("col-12", "col-md-7");
    let newCardImageItem = document.createElement("img");
    newCardImageItem.classList.add("img-fluid", "crow-img");
    // TODO: get correct URL for image!
    newCardImageItem.src = item['image'];
    // TODO: add alt text from species name
    newCardImageItem.setAttribute("alt", item['CrowSpecies']);
    newCardImage.appendChild(newCardImageItem);

    /* Create species metadata div */
    let newCardSpeciesData = document.createElement("div");
    newCardSpeciesData.classList.add("col-12", "col-md-5");
    let newCardSpeciesName = document.createElement("h1");
    // TODO: add name from Dynamo data
    newCardSpeciesName.innerHTML = "Name: " + item['CrowSpecies'];
    let newCardSpeciesGenus = document.createElement("h4");
    // TODO: add genus from Dynamo data
    newCardSpeciesGenus.innerHTML = "Taxonomy: " + item['scientific'];
    let newCardSpeciesHabitat = document.createElement("h4");
    // TODO: add habitat from Dynamo data
    newCardSpeciesHabitat.innerHTML = "Location: " + item['habitat'];
    newCardSpeciesData.appendChild(newCardSpeciesName);
    newCardSpeciesData.appendChild(newCardSpeciesGenus);
    newCardSpeciesData.appendChild(newCardSpeciesHabitat);

    /* create species description div */
    let newCardDescription = document.createElement("div");
    newCardDescription.classList.add("col-12", "crow-text");
    let description = document.createElement("p");
    // TODO: add description from Dynamo data
    description.innerHTML = item['description'];
    newCardDescription.appendChild(description);

    /* Add all divs up together~ */
    newCardRow.appendChild(newCardImage);
    newCardRow.appendChild(newCardSpeciesData);
    newCardRow.appendChild(newCardDescription);
    newCard.appendChild(newCardRow);
    topLevel.appendChild(newCard);
}

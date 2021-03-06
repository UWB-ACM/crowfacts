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
    // get correct URL for image!
    newCardImageItem.src = item['image'];
    // add alt text from species name
    newCardImageItem.setAttribute("alt", item['CrowSpecies']);
    newCardImage.appendChild(newCardImageItem);

    /* Create species metadata div */
    let newCardSpeciesData = document.createElement("div");
    newCardSpeciesData.classList.add("col-12", "col-md-5");
    let newCardSpeciesName = document.createElement("h1");
    // add name from Dynamo data
    newCardSpeciesName.innerHTML = "Name: " + item['CrowSpecies'];
    let newCardSpeciesGenus = document.createElement("h4");
    // add genus from Dynamo data
    newCardSpeciesGenus.innerHTML = "Taxonomy: " + item['scientific'];
    let newCardSpeciesHabitat = document.createElement("h4");
    // add habitat from Dynamo data
    newCardSpeciesHabitat.innerHTML = "Location: " + item['habitat'];
    newCardSpeciesData.appendChild(newCardSpeciesName);
    newCardSpeciesData.appendChild(newCardSpeciesGenus);
    newCardSpeciesData.appendChild(newCardSpeciesHabitat);

    /* create species description div */
    let newCardDescription = document.createElement("div");
    newCardDescription.classList.add("col-12", "crow-text");
    let description = document.createElement("p");
    // add description from Dynamo data
    description.innerHTML = item['description'];
    newCardDescription.appendChild(description);

    /* Add all divs up together~ */
    newCardRow.appendChild(newCardImage);
    newCardRow.appendChild(newCardSpeciesData);
    newCardRow.appendChild(newCardDescription);
    newCard.appendChild(newCardRow);
    topLevel.appendChild(newCard);
}

function showSubmittedFactInfo(response, submission) {
    // add status message to HTML element
    let str = "Your request was successful!";
    if (response['body'] && response['body']['Attributes']) {
        str += "\nYour input overwrote the input previously added by '" + response['body']['Attributes']['source'] + "', another crow expert.";
    }
    let msgDiv = document.getElementById("factRequestPlaceholder");
    msgDiv.innerHTML = str;

    // add new submission to lastFactsSubmitted div
    let submittedDiv = document.getElementById("lastFactsSubmitted");
    let newSubmission = document.createElement("p");
    newSubmission.classList.add("submission");
    newSubmission.innerHTML = submission['fact'];
    submittedDiv.appendChild(newSubmission);
    let placeholderDiv = document.getElementById("factSubmissionPlaceholder");
    placeholderDiv.classList.add("hidden");
}

function displayUserFacts(data) {
    data['body']['Items'].forEach(createFactCard);
}

function createFactCard(item) {
    let topLevel = document.getElementById("allFacts");
    let newFact = document.createElement("div");
    newFact.classList.add("col-12", "col-sm-4", "col-md-3");
    let newFactInner = document.createElement("div");
    newFactInner.classList.add("factcard");
    let factQuote = document.createElement("blockquote");
    factQuote.classList.add("factquote");
    factQuote.innerHTML = escape(item['fact']);
    let factAttribution = document.createElement("p");
    console.log('Contents before escaping: ' + item['source']);
    console.log('Contents after escaping: ' + escape(item['source']));
    factAttribution.innerHTML = "-- " + escape(item['source']);
    newFactInner.appendChild(factQuote);
    newFactInner.appendChild(factAttribution);
    newFact.appendChild(newFactInner);
    topLevel.appendChild(newFact);
}

function escape(s) {
    let lookup = {
        '&': "&amp;",
        '"': "&quot;",
        '<': "&lt;",
        '>': "&gt;",
        '/': "&#x2F;",
        '\'': "&#x27;"
    };
    return s.replace( /[&"'\/<>]/g, (c) => lookup[c] );
}

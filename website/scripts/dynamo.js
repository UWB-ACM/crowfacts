/*
 * This function is used to retrieve all data from the 
 * Crow Species table in DynamoDB.
 * It is accomplished via an API Gateway HTTP method 
 * and returns a JSON object which contains information 
 * about the request as well as the DynamoDB table data.
 */
function getAllCrowSpecies() {
    // To lower API requests (and costs), we store previously found 
    // results in local browser storage.
    // When this function is called, we attempt to retrieve this data.
    let crowData = localStorage.getItem("crowFactsSpeciesData");
    // The getItem() call will return null if it doesn't exist, and 
    // so we proceed with the AJAX call because there is no 
    // persisted data.
    if (!crowData) {
        console.log("Getting data from Dynamo...");
    } else {
        // we already have the Dynamo data
        console.log("Already have Dynamo data.");
        generateSpeciesCards();
        return;
    }

    // The call which retrieves the DynamoDB data for crow species.
    $.ajax({
        type: "GET",
        url: "https://i9b1mxftnh.execute-api.us-west-2.amazonaws.com/test/getCrowSpecies",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // show a success message
            alert("Success!");
            localStorage.setItem("crowFactsSpeciesData", JSON.stringify(data));
            generateSpeciesCards();
        },
        error: function () {
            alert("Unsuccessful");
        }
    });
}

function resetCrowSpeciesData() {
    localStorage.removeItem("crowFactsSpeciesData");
    console.log("Storage cleared.");
}

function submitUserFact() {
    // get values in form fields
    let name = document.getElementById("userFactSubmitter").value;
    let fact = document.getElementById("userFactContent").value;
    let blob = { "source": name, "fact": fact };
    blob = JSON.stringify(blob);
    // TODO: sanitize info
    // TODO: ajax call
    // The call which posts the user's data to DynamoDB.
    $.ajax({
        type: "POST",
        url: "https://i9b1mxftnh.execute-api.us-west-2.amazonaws.com/test/UserFacts",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        data: blob,
        success: function (data) {
            // show a success message
            alert("Success!");
            // update page content
            showSubmittedFactInfo(data, JSON.parse(blob));
            // clear form
            document.getElementById("userFactSubmitter").value = "";
            document.getElementById("userFactContent").value = "";
        },
        error: function (response) {
            alert("Unsuccessful");
            document.getElementById("factRequestPlaceholder").innerHTML = "Your last request was unsuccessful. The error was:<br/><strong>" + response['responseJSON']['errorMessage'] + "</strong>";
        }
    });
}

function getAllUserFacts() {
    // The call which retrieves the DynamoDB data for crow species.
    $.ajax({
        type: "GET",
        url: "https://i9b1mxftnh.execute-api.us-west-2.amazonaws.com/test/UserFacts",
        dataType: "json",
        crossDomain: true,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            // show a success message
            alert("Success!");
            // add content to page
            displayUserFacts(data);
        },
        error: function () {
            alert("Unsuccessful");
        }
    });
}

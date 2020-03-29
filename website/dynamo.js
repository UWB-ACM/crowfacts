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


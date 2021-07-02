

function myFunction() {
    var postcode = document.getElementById("postcode").value
    var xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/departureBoards?postcode=' + postcode, true);
    xhttp.setRequestHeader('Content-Type', 'application/json');

    xhttp.onload = function() {
        // Handle response here using e.g. xhttp.status, xhttp.response, xhttp.responseText
        var result = JSON.parse(xhttp.response)
        console.log(result)
        display_results(result)
        document.getElementById("results").style.display = "block";
    }

    xhttp.send();
}

window.onload = function () {
    document.getElementById("results").style.display = "none"
}

function display_results(response){
    for(var j = 0; j < 2; j++){
        console.log(response[j].arrivals)
        document.getElementById("Stop" + (j+1)).innerHTML = response[j].stopName

        for(var i = 0; i < 5; i++){
            var arrival = document.getElementById("stop" + (j+1) + "bus" + (i+1))
            var arrivalData = response[j].arrivals[i]

            var eta = Math.floor(arrivalData.timeToStation/60)
            var etaString = generate_eta(eta)

            arrival.innerHTML = arrivalData.lineName +
                " to " + arrivalData.destinationName +
                etaString

        }
    }

}

function generate_eta(eta) {
    if (eta === 0) {
        return " is Due"
    } else if (eta === 1) {
        return " arriving 1 minute"
    } else {
        return " arriving in " + eta + " minutes"
    }
}

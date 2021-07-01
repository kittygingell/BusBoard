import {BusArrival} from "./busArrival";
import axios from "axios";
const readline = require('readline-sync');

function get_postcode_location(postcode: string) {
    axios.get('https://api.postcodes.io/postcodes?q='+ postcode)
        .then(function (response) {
            console.log("The longitude is: " + response.data.result[0].longitude.toFixed(3) +
            " the latitude is: " + response.data.result[0].latitude.toFixed(3))
        }).catch(function (error:any) {
        console.log(error);
    })
}

function validate_postcode(postcode: string) {
    axios.get('https://api.postcodes.io/postcodes/' + postcode + '/validate')
        .then(function (response) {
            if (response.data.result){
                get_postcode_location(postcode)
            }
        }).catch(function (error:any) {
        console.log(error);
    })
}

/**
 * Ask user for STOP ID and output next 5 buses
 */
function main(){
    console.log('\nEnter a postcode');
    const postcode : string = readline.prompt();
    validate_postcode(postcode)

}

main()

/**
 * Outputs a list of arrivals of a TFL stop. [BusArrival] Objects store bus route name
 * destination and arrival time
 * @param stopID ID of TFL Bus Stop
 */
function get_stop_arrivals(stopID:string) {
    let arrivalList : BusArrival[] = []
    axios.get('https://api.tfl.gov.uk/StopPoint/' + stopID +'/Arrivals')
        .then(function (response) {
            for(let i = 0; i < response.data.length ; i++){
                arrivalList.push(new BusArrival(
                    response.data[i].lineName,
                    response.data[i].destinationName,
                    response.data[i].timeToStation))
            }
            arrivalList.sort((b1:BusArrival,b2:BusArrival) => b1.timeToStation - b2.timeToStation)
            output_arrivals(arrivalList)
        }).catch(function (error:any) {
        console.log(error);
    })
}

/**
 * Generates the correct eta string based on time
 * @param eta
 */
function generate_eta(eta: number) {
    if (eta === 0) {
        return " is Due"
    } else if (eta === 1) {
        return " arriving 1 minute"
    } else {
        return " arriving in " + eta + " minutes"
    }
}

/**
 * Print each arrival in readable format
 */
function output_arrivals(arrivalList:BusArrival[]){
    for(let i = 0; i < 5; i++){
        let arrival : BusArrival = arrivalList[i]
        let eta : number = Math.floor(arrival.timeToStation/60)
        let etaString = generate_eta(eta);
        console.log(arrival.lineName + " to " +
            arrival.destinationName + etaString)
    }
}


import {BusArrival} from "./busArrival";
import {validate_postcode} from "./postcode";

const readline = require('readline-sync');

/**
 * Ask user for STOP ID and output next 5 buses
 */
function main(){
    console.log('\nEnter a postcode');
    const postcode : string = readline.prompt();
    validate_postcode(postcode).then()
}

// main()

/**
 * Generates the correct eta string based on time
 * @param eta
 */


/**
 * Print each arrival in readable format
 */
export function output_arrivals(arrivalList:BusArrival[]){
    for(let i = 0; i < 5; i++){
        let arrival : BusArrival = arrivalList[i]
        let eta : number = Math.floor(arrival.timeToStation/60)
        let etaString = generate_eta(eta);
        console.log(arrival.lineName + " to " +
            arrival.destinationName + etaString)
    }
}


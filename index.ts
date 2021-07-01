import {BusArrival} from "./busArrival";
const axios = require('axios').default;

/**
 * Outputs a list of arrivals of a TFL stop. [BusArrival] Objects store bus route name
 * destination and arrival time
 * @param stopID ID of TFL Bus Stop
 */
function get_stop_arrivals(stopID:String){
    axios.get('https://api.tfl.gov.uk/StopPoint/' + stopID +'/Arrivals')
        .then(function (response:any) {
            let arrivalList : BusArrival[] = []

            for(let i = 0; i < response.data.length ; i++){
                arrivalList.push(new BusArrival(
                    response.data[i].lineName,
                    response.data[i].destinationName,
                    response.data[i].timeToStation))
            }

            // JSON Object does NOT sort arrivals by time
            arrivalList.sort((b1:BusArrival,b2:BusArrival) => b1.timeToStation - b2.timeToStation)

            // Print each arrival in readable format
            for(let i = 0; i < 5; i++){
                let arrival : BusArrival = arrivalList[i]
                console.log(arrival.lineName + " to " +
                     arrival.destinationName + " arriving in " +
                 Math.floor(arrival.timeToStation/60) + " minutes")
            }
        }).catch(function (error:any) {
        console.log(error);
    })
}

get_stop_arrivals("490008660N")
import {NearestStops} from "./NearestStops";
import {BusArrival} from "./busArrival";
import axios from "axios";
import {StopArrivals} from "./StopArrivals";

export async function get_nearest_stops(longitude: number, latitude: number) {
    let stopList: NearestStops[] = []

    const response = await axios.get('https://api.tfl.gov.uk/StopPoint/?lat=' + latitude + '&lon=%20' + longitude + '&stopTypes=NaptanPublicBusCoachTram&radius=1000')
    for (let i = 0; i < response.data.stopPoints.length; i++) {
        const stopPoint = response.data.stopPoints[i];
        if (stopPoint.lines.length == 0){
            continue
        }
        stopList.push(new NearestStops(
            stopPoint.naptanId,
            stopPoint.commonName,
            stopPoint.distance))
    }
    stopList.sort((n1: NearestStops, n2: NearestStops) => n1.distance - n2.distance)
    return stopList
}

/**
 * Outputs a list of arrivals of a TFL stop. [BusArrival] Objects store bus route name
 * destination and arrival time
 * @param stopID ID of TFL Bus Stop
 */
export async function get_stop_arrivals(stop: NearestStops) {
    let arrivalList: BusArrival[] = []
    let stopID = stop.naptanId
    const response = await axios.get('https://api.tfl.gov.uk/StopPoint/' + stopID + '/Arrivals')
    for (let i = 0; i < response.data.length && i < 5; i++) {
        arrivalList.push(new BusArrival(
            response.data[i].lineName,
            response.data[i].destinationName,
            response.data[i].timeToStation))
    }
    arrivalList.sort((b1: BusArrival, b2: BusArrival) => b1.timeToStation - b2.timeToStation)
    return new StopArrivals(stop.naptanId, stop.commonName, arrivalList)
}
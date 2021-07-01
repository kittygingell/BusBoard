/**
 * Class to store Bus Arrival Data From TFL API
 * timeToStation is in seconds
 */
export class BusArrival {
    lineName: string;
    destinationName: string;
    timeToStation: number;

    constructor(lineName: string, destinationName: string, timeToStation: number) {
        this.lineName = lineName;
        this.destinationName = destinationName
        this.timeToStation = timeToStation
    }
}
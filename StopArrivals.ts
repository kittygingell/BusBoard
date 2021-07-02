import {BusArrival} from "./busArrival";

export class StopArrivals {
    stopCode: string;
    stopName: string;
    arrivals: BusArrival[];

    constructor(stopCode: string, stopName: string, arrivals: BusArrival[]) {
        this.stopCode = stopCode;
        this.stopName = stopName
        this.arrivals = arrivals
    }
}
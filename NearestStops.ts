export class NearestStops {
    naptanId: string;
    commonName: string;
    distance: number;

    constructor(naptanId: string, commonName: string, distance: number) {
        this.naptanId = naptanId;
        this.commonName = commonName
        this.distance = distance
    }
}
import axios from "axios";
import {get_nearest_stops} from "./tfl";

/**
 * Returns the latitude and longitude of a given postcode,
 * @param postcode must be a validated postcode
 */
export function get_postcode_location(postcode: string) {
    return axios.get('https://api.postcodes.io/postcodes?q=' + postcode)
}

/***
 * validates a postcode, if true calls get_postcode_location
 * @param postcode
 */
export function validate_postcode(postcode: string) {
    return axios.get('https://api.postcodes.io/postcodes/' + postcode + '/validate')
}
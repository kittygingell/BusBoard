import axios from "axios";
import {get_nearest_stops} from "./tfl";

/**
 * Returns the latitude and longitude of a given postcode,
 * @param postcode must be a validated postcode
 */
async function get_postcode_location(postcode: string) {
    const response = await axios.get('https://api.postcodes.io/postcodes?q=' + postcode)
    await get_nearest_stops(response.data.result[0].longitude.toFixed(3),response.data.result[0].latitude.toFixed(3))
}

/***
 * validates a postcode, if true calls get_postcode_location
 * @param postcode
 */
export async function validate_postcode(postcode: string) {
    const response = await axios.get('https://api.postcodes.io/postcodes/' + postcode + '/validate')
    if (response.data.result) {
        await get_postcode_location(postcode).then
    }

}
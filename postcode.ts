import axios from "axios";

/**
 * Returns the latitude and longitude of a given postcode,
 * @param postcode must be a validated postcode
 */
function get_postcode_location(postcode: string) {
    axios.get('https://api.postcodes.io/postcodes?q=' + postcode)
        .then(function (response) {
            console.log("The longitude is: " + response.data.result[0].longitude.toFixed(3) +
                " the latitude is: " + response.data.result[0].latitude.toFixed(3))
        }).catch(function (error: any) {
        console.log(error);
    })
}

/***
 * validates a postcode, if true calls get_postcode_location
 * @param postcode
 */
export function validate_postcode(postcode: string) {
    axios.get('https://api.postcodes.io/postcodes/' + postcode + '/validate')
        .then(function (response) {
            if (response.data.result) {
                get_postcode_location(postcode)
            }
        }).catch(function (error: any) {
        console.log(error);
    })
}
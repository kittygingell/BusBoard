import express = require('express')
import {validate_postcode, get_postcode_location} from "./postcode";
import {get_nearest_stops, get_stop_arrivals} from "./tfl";
const app = express()
const port = 3000

async function main(){
    app.get('/departureBoards', async (req, res) => {
        let postcode = req.query.postcode!.toString();
        let validResponse = await validate_postcode(postcode)
        if(!validResponse.data.result){
            res.send('400 Bad Request - Invalid Postcode')
            return
        }

        let longLatResponse = await get_postcode_location(postcode)
        let longitude = longLatResponse.data.result[0].longitude.toFixed(3)
        let latitude = longLatResponse.data.result[0].latitude.toFixed(3)
        let nearestResponse = await get_nearest_stops(longitude,latitude)
        // loop over nearest stops
        // get arrivals in JSON form
        let JSONArrivals = []
        for (let i = 0; i < 2 && i < nearestResponse.length; i++) {
            JSONArrivals.push(await get_stop_arrivals(nearestResponse[i]))
        }
        res.send(JSONArrivals)
    })

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
}

main().then()

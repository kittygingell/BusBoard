const axios = require('axios').default;



function get_stop_arrivals(stopID:String){
    axios.get('https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals')
        .then(function (response:any) {
            console.log(response.data[0])
        }).catch(function (error:any) {
        // handle error
        console.log(error);
    })
}

get_stop_arrivals("Hi")
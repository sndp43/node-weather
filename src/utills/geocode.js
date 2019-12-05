request = require('request')

const geocode = (address,callback)=>
{
    url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1Ijoic25kcDE0MyIsImEiOiJjazJseWpoZXowOTQyM21ueHFscmR6bjBrIn0.UDQBnFeJp2Qn05jFBjHyFA&limit=1"

    request({url,json:true},(error,{body})=>
    {
        if(error)
        {
            callback("Unable to connect to wether service",undefined)
        }else if(body.error)
        {
            callback("something went wrong",undefined)
        }else if(body.features.length===0)
        {
            callback("something went wrong",undefined)
        }else
        {

            let features = body.features 
            let lat =features[0].center[1]
            let lon =features[0].center[0]   
            let place_name = features[0].place_name
            callback(undefined,{
                'lat':lat,
                'lon':lon,
                'location':place_name
            })

        }

    })

}

module.exports=geocode
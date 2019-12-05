request = require('request')
const forecast = (lat,long,callback)=>
{
    const url = "https://api.darksky.net/forecast/1a04e1002fb3b015cd55f09004caa079/"+lat+","+long
    request({url,json:true},(error,{body})=>
    {

            if(error)
            {
                callback("Unable to connect to forcast",undefined)
            }else if(body.error)
            {
                callback("Something went wrong",undefined)
            }else if(body.currently.length===0)
            {
                callback("Something went wrong again",undefined)
            }else
            {
                 const data = body.currently
                 callback(undefined,data)
            }
    })


}

module.exports=forecast
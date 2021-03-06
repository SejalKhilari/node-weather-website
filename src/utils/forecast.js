const request=require('request')

const forecast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=303de871a12c1816b14bb8917422ead3&query='+longitude+','+latitude +'&units=f'
    request({url,json:true},(error,{body})=>{

        if(error){
            callback('Unable to connect to weather stack!!',undefined)
        }
        else if(body.error){
            callback("Unable to find location",undefined)
        }
        else{
        callback(undefined,"Weather is "+body.current.weather_descriptions[0]+" .It is currently "+body.current.temperature+" degrees out. It feels like "+body.current.feelslike+" degrees outside. Humidity is "+body.current.humidity+" percent period")
        }
    })
}

module.exports=forecast
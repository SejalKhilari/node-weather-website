const path=require('path')
const express = require('express')
const hbs=require('hbs')

const app = express()
//Define paths for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')



//Setup handlebars engine and views location
//alternative for it is given below
app.set('view engine','hbs')  //it is necessary to store hbs in folder named view only otherwise it wont run
app.set('views',viewPath)
hbs.registerPartials(partialPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name: 'Sejal'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'ABOUT ME',
        name: 'SEJAL'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'HELPP..',
        message: 'Do you need any help',
        name:'SEJAL'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1><center>Welcome to Node.js</center></h1>')
// })
 
// app.get('/help',(req,res)=>{
//     res.send([{
//         name:'Sejal',
//         age:19
//     }])
// })

// app.get('/about',(req,res)=>{
//     app.use(express.static(seconddirpath))
//     // res.send('<h1>About page</h1>')
// })
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address of the location to be searched'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
    
        forecast(latitude,longitude,(error,forecastdata)=>{
    
            if(error){
                return res.send({error})
            }
            res.send({
                address:req.query.address,
                forecast: forecastdata,
                location
            })

        })
    }
    )
   
})

app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
         msg:'Help article not found'})
})
app.get('*',(req,res)=>{
    res.render('404',{
        msg: 'My 404 Page'})
})


app.listen(3000, () => {
    console.log('server is up on port 3000')
})
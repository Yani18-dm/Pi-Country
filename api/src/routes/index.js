const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const axios = require('axios');
const {Country,Activity} = require('../db');
const e = require('express');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

const getApiInfo = async () => {
    const apiUrl = await axios.get('https://restcountries.com/v3/all');
    const apiInfo = await apiUrl.data.map(el => {
 
        return {
            nombre: el.name.common,
            continente: el.region,
            capital: el.capital,
            bandera: el.flags[0],
            poblacion: el.population,
            area: el.area
        }
    })
    return apiInfo;
}

const getDbInfoCountries = async () => {
    return await Country.findAll({
        include:{
            model: Activity,
            attributes: ['nombre','dificultad','duracion','temporada'],
            through: {
                attributes: [],
            },
        }
    })
}

const getDbInfoActivities = async () => {
    return await Activity.findAll({
        include:{
            model: Country,
            attributes: ['id','nombre','continente','bandera','capital','area'],
            through: {
                attributes: [],
            },
        }
    })
}

const getAllCountries = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
}

router.get('/countries', async(req,res) => {
    const name = req.query.name

    //Codigo que se ejecutará la primera vez 
    let countriesDesdeLaApi = await getApiInfo();
    //console.log(countriesDesdeLaApi)

    countriesDesdeLaApi.forEach(el => { 

        let capitalPais = "Sin Capital"
        
        if (el.capital)
            capitalPais = el.capital[0] 

        Country.findOrCreate({
            where: { 
                nombre: el.nombre,
                continente: el.continente,
                capital: capitalPais,
                bandera: el.bandera,
                poblacion: el.poblacion,
                area: el.area   
            }
        })
        
    })

    //res.json(countriesDesdeLaApi)
    //res.status(200).send("Los paises fueron creados correctamente");
    //Fin codigo que se ejecuta la primera vez
    
    let countriesTotal = await getDbInfoCountries();

    if(name){
        let countryName = await countriesTotal.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()));
        countryName.length ?
        res.status(200).send(countryName) :
        res.status(404).send('No esta el país');
    } else {
        res.status(200).send(countriesTotal);
    }
    
    //res.status(200).send(countriesDesdeLaApi);
    //res.json(countriesDesdeLaApi)   


})

router.get('/activities', async(req,res) => {
    const name = req.query.name
    let actividades = await getDbInfoActivities();
    if(name){
        let activityName = await actividades.filter(el => el.nombre.toLowerCase().includes(name.toLowerCase()));
        activityName.length ?
        res.status(200).send(activityName) :
        res.status(404).send('No se encuentra esta actividad');
    } else {
        res.status(200).send(actividades);
    }
})

router.get('/activities', async(req,res) => {
    const name = req.query.name
    let actividades = await getDbInfoActivities();
    if(name){
        let activityName = await actividades.filter(el => el.nombre.toLowerCase() === name.toLowerCase());
        activityName.length ?
        res.status(200).send(activityName) :
        res.status(404).send('No se encuentra esta actividad');
    } else {
        res.status(404).send("No cargo el parametro de busqueda");
    }
})

router.get('/activities/:id', async(req,res) => {
    const id = req.params.id
    let actividades = await getDbInfoActivities();
    if(id){
        let activity = await actividades.filter(el => el.id === id);
        activity.length ?
        res.status(200).send(activity) :
        res.status(404).send('No se encuentra esta actividad');
    } else {
        res.status(404).send("No cargo el parametro de busqueda");
    }
})

router.get('/countries/:id', async(req,res) => {
    const id = req.params.id
    let paises = await getDbInfoCountries();
    if(id){
        let country = await paises.filter(el => el.id === id);
        country.length ?
        //res.status(200).send(country) :
        res.status(200).json(country) :
        res.status(404).send('No se encuentra este pais');
    } else {
        res.status(404).send("No cargo el parametro de busqueda");
    }
})

/*
router.post('/country', async (req,res) => {
    let {
        nombre,
        continente,
        capital,
        bandera,
        actividades
    } = req.body

    let countryCreated = await Country.create({
         nombre,
         continente,
         capital,
         bandera
    })

    let activityDb = await Activity.findAll({
        where: { nombre : actividades}
    })

    countryCreated.addActivity(activityDb)
    res.send('Pais creado con exito')
})
*/

router.post('/activity', async (req,res) => {
    let {
        nombre,
        dificultad,
        duracion,
        temporada,
        paises
    } = req.body

    console.log(nombre + dificultad + duracion + temporada + paises);

    /*

    let activityCreated = await Activity.create({
         nombre,
         dificultad,
         duracion,
         temporada
    })

    let countryDb = await Country.findAll({
        where: { nombre : paises }
    })
    
    activityCreated.addCountry(countryDb)
    */

    if (!temporada)
        res.status(404).send('Temporada no cargada');
    else
        res.status(200).send('Actividad creada con exito');
})

module.exports = router;

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
            attributes: ['id','nombre','continente','bandera','capital','area','poblacion'],
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

router.get('/countriesFilter', async(req,res) => {
    const filter = req.query.filter

    let actividades = await getDbInfoActivities();
    let paisesTodos = await getDbInfoCountries();

    let filtros = []
    filtros = filter.split('-')

    //console.log(filter)
    //console.log(filtros[0])

    let continente = filtros[0] //Todos / Asia / Americas ...
    let actividad = filtros[1]  //Todas / Cabalgata / Ciclismo ...
    let orden = filtros[2]      //asc / des
    let segun = filtros[3]      //alf / pob 
    let porNombrePais = filtros[4] //En blanco == '' --> No filtrar / Ej: arg --> filtra por '%arg%'

    //Inicializo con todos los paises
    let paisesFiltrados = paisesTodos

    if(actividad!='Todas')
        paisesFiltrados = actividades.filter(el => el.nombre === actividad)[0].countries
    
    //Si elige un continente lo filtro
    if(continente!='Todos')
        paisesFiltrados = await paisesFiltrados.filter(el => el.continente.toLowerCase().includes(continente.toLowerCase()));

    //Si filtro por nombre de pais
    if(porNombrePais!='')
        paisesFiltrados = await paisesFiltrados.filter(el => el.nombre.toLowerCase().includes(porNombrePais.toLowerCase()));

    paisesFiltrados.sort(function (a,b){
        //alf --> Orden por nombre del pais
        if (segun == 'alf'){
            if (a.nombre > b.nombre){
                if(orden == 'asc')
                    return 1;
                else
                    return -1;
            }
            if (b.nombre > a.nombre){
                if(orden == 'asc')
                    return -1;
                else    
                    return 1;
            }
            return 0;
        } else { //pob --> Orden por cantidad de poblacion
            if (a.poblacion > b.poblacion){
                if(orden == 'asc')
                    return 1;
                else
                    return -1;
            }
            if (b.poblacion > a.poblacion){
                if(orden == 'asc')
                    return -1;
                else    
                    return 1;
            }
            return 0;
        }
    })
    
    console.log(filtros[4])
    console.log(paisesFiltrados.length)

    //paisesFiltrados.length ?
    res.status(200).send(paisesFiltrados)// :
    //res.status(404).send('No existe ningun país para el continente ' + continente);

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

    let actividades = await getDbInfoActivities();

    let {
        nombre,
        dificultad,
        duracion,
        temporada,
        paises
    } = req.body

    
    //Verifico si existe una actividad con el mismo nombre
    if(nombre)
        actividades = actividades.filter(el => el.nombre.toLowerCase() === nombre.toLowerCase())

    //Es una nueva actividad
    if(actividades.length === 0){

        if (!nombre || !dificultad || !temporada || !duracion || paises.length == 0 )
           res.status(404).send('Existen campos incompletos');
        else {
            
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

            res.status(200).send('Actividad creada con exito');
        }
    } else {
        res.status(404).send('Existen campos incompletos');
    }
    
})

module.exports = router;

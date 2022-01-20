import axios from 'axios';


export const getCountries=()=>{
    return async function(dispach){
        var json = await axios.get('http://localhost:3001/countries', {
        });
        return dispach({
            type: 'GET_COUNTRIES',
            payload: json.data
        })
        
    }
}



export function getActivities(){
    return async function(dispach){
        var json = await axios.get('http://localhost:3001/activities', {
        });
        return dispach({
            type: 'GET_ACTIVITIES',
            payload: json.data
        })
    }
}

export function postActivity (payload){
    return async function (dispatch){
        const response = await axios.post ('http://localhost:3001/activity',payload);
        console.log(response)
        return response;
    }
}

//le paso un payload:nombre y devuelvo una funcion asincrona
//con get traigo la ruta del back y el nombre
//el json.data devuelve lo que contiene de la ruta countries una vez que yo le asigne algo por nombre
//mandar un error por si falla
export function getNombreCountries(nombre){
    return async function (dispatch){
        try {
            console.log('http://localhost:3001/countries?name' + nombre);
            var json = await axios.get ('http://localhost:3001/countries?name=' + nombre);

            return dispatch ({
                type: "GET_NOMBRE_COUNTRIES",
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }  
    }
}

export function filterCountriesByContinente(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_CONTINENTE',
        payload
    }

}

export function filterCountriesByActivity(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_ACTIVIDAD',
        payload
    }

}

export function setOrderCountries(payload){
    console.log(payload)
    return {
        type: 'ORDER_BY_NOMBRE_PAIS',
        payload
    }

}

export function setOrderPoblacion(payload){
    console.log(payload)
    return {
        type: 'ORDER_BY_POBLACION_PAIS',
        payload
    }

}

export function getDetail (id){
    return async function (dispatch){
        try{
            var json = await axios.get("http://localhost:3001/countries/" + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch(error){
            console.log(error)
        }
    }
}
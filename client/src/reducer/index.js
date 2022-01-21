const initialState = {
    countries : [],
    allCountries : [],
    detail : []
}

function rootReducer (state= initialState, action){
    switch (action.type) {
        case 'GET_ACTIVITIES':
            //va  devolver un estado
            return{
                ...state,
                activities: action.payload
            } 

        case 'GET_COUNTRIES':
            //va  devolver un estado
            const countriesOrdenados =  action.payload

            countriesOrdenados.sort(function (a,b){
                if (a.nombre > b.nombre){
                    return 1;
                }
                if (b.nombre > a.nombre){
                    return -1;
                }
                return 0;
            })

          
            return{
                    ...state,
                    countries: countriesOrdenados,
                    allCountries: countriesOrdenados

            } 

        //creo un case para la busqueda de paises
        //Devolover un estado 
        //y en countries importo action.payload porque es un arreglo lo que va a mostrar y renderizando
        //el serbarch es un filtrado mas hecho en el back
        case 'GET_NOMBRE_COUNTRIES':

            return{
                ...state,
                    countries: action.payload,
            }

        case 'FILTER_BY_CONTINENTE': 
            //payload contiene informacion del continente y del ordenamiento actual
            //Ejemplo: Americas-desc
            //console.log(action.payload)
            const continenteYOrden = action.payload.split('-')

            console.log(action.payload)

            const continenteFiltered = continenteYOrden[0] === 'All' ? state.allCountries 
                                                                     : state.allCountries.filter(el =>el.continente === continenteYOrden[0])

            if (continenteYOrden[1]  === 'asc'){
                continenteFiltered.sort(function (a,b){
                    if (a.nombre > b.nombre){
                        return 1;
                    }
                    if (b.nombre > a.nombre){
                        return -1;
                    }
                    return 0;
                }) 
            } else {
                continenteFiltered.sort(function (a,b ){
                    if (a.nombre > b.nombre){
                        return -1;
                    }
                    if (b.nombre > a.nombre){
                        return 1;
                    }
                    return 0;
                })
            }
                
            return{
                ...state,
                countries: continenteFiltered

            }
        case 'FILTER_BY_ACTIVIDAD': 
            //payload contiene informacion del continente y del ordenamiento actual
            //Ejemplo: Americas-desc
            //console.log(action.payload)
            const actividadYOrden = action.payload.split('-')

            console.log(action.payload)

            const actividadFiltered = actividadYOrden[0] === 'All' ? state.allCountries 
                                                                   : state.activities.filter(el =>el.nombre === actividadYOrden[0])[0].countries

            if (actividadYOrden[1]  === 'asc'){
                actividadFiltered.sort(function (a,b){
                    if (a.nombre > b.nombre){
                        return 1;
                    }
                    if (b.nombre > a.nombre){
                        return -1;
                    }
                    return 0;
                }) 
            } else {
                actividadFiltered.sort(function (a,b ){
                    if (a.nombre > b.nombre){
                        return -1;
                    }
                    if (b.nombre > a.nombre){
                        return 1;
                    }
                    return 0;
                })
            }
                
            return{
                ...state,
                countries: actividadFiltered

            }
        case 'ORDER_BY_NOMBRE_PAIS': 

            let sortedArr = action.payload === 'asc' ?
                state.countries.sort(function (a,b){
                    if (a.nombre > b.nombre){
                        return 1;
                    }
                    if (b.nombre > a.nombre){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a,b){
                    if (a.nombre > b.nombre){
                        return -1;
                    }
                    if (b.nombre > a.nombre){
                        return 1;
                    }
                    return 0;
                })

            return{
                ...state,
                countries: sortedArr

            }

        case 'ORDER_BY_POBLACION_PAIS': 

                let sortedArrPob = action.payload === 'asc' ?
                state.countries.sort(function (a,b){
                    if (a.poblacion > b.poblacion){
                        return 1;
                    }
                    if (b.poblacion > a.poblacion){
                        return -1;
                    }
                    return 0;
                }) :
                state.countries.sort(function (a,b){
                    if (a.poblacion > b.poblacion){
                        return -1;
                    }
                    if (b.poblacion > a.poblacion){
                        return 1;
                    }
                    return 0;
                })

            return{
                ...state,
                countries: sortedArrPob

            }

        case 'GET_DETAILS': 
            return{
                ...state,
                detail: action.payload
            }

        case 'FILTRA_TODO': 
            return{
                ...state,
                countries: action.payload
            }
            
        default:
            return state;
    }
}

export default rootReducer;
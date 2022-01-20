import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
//importo los hook que voy a usar de react
import {useState, useEffect} from 'react';
//importo los hooks de react-redux(previamente lo instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
//importo las actions que me interesa usar en este componente
import { getActivities, getCountries, filterCountriesByContinente, filterCountriesByActivity, setOrderCountries, setOrderPoblacion } from '../actions';
//importo los componentes que voy a usar
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';

//comienza el componente
export default function Home () {
    const dispatch = useDispatch()
    
    
    //momento de carga atraves de dispach y useeffect. Corchetes vacios, porque no depende de nada 
    useEffect(()=>{
        dispatch(getCountries());
        dispatch(getActivities());
    }, [dispatch])

    const allCountries = useSelector ((state) => state.countries)
    const allActivities = useSelector ((state) => state.activities)
    
    const [orden, setOrden] = useState('asc')
    const [segun, setSegun] = useState('alf')
    const [currentPage, setCurrentPage] = useState(1)
    const [countriesPerPage, setCountriesPerPage] = useState(10)
    const indexOfLastCountry = currentPage * countriesPerPage // 
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage 
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry )
    const currentCountriesParte1 = currentCountries.slice(0, 5 )
    const currentCountriesParte2 = currentCountries.slice(5, 10 )


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    function handleClick_Actividades(e){
        e.preventDefault();
        document.getElementById('txtNombre').value = '';
        dispatch(getActivities());
    }

    function handleClick_Paises(e){
        e.preventDefault();
        document.getElementById('txtNombre').value = '';
        dispatch(getCountries());
    }

    function handleFilterContinente(e){
        e.preventDefault();
        document.getElementById('txtNombre').value = '';
        dispatch(filterCountriesByContinente(e.target.value+'-'+orden));
    }

    function handleSetOrder(e){
        e.preventDefault();
        //alert(segun)
        if(segun === 'alf'){
            dispatch(setOrderCountries(orden));
        } else {
            dispatch(setOrderPoblacion(orden));
        }
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleSetOrderPoblacion(e){
        e.preventDefault();
        console.log(orden)
        console.log(orden)
        //alert("Ordena " + (e.target.value === 'alf' ? "alfabeticamente" : "segun poblacion"));
        if(e.target.value === 'alf'){
            dispatch(setOrderCountries(orden));
        } else {
            dispatch(setOrderPoblacion(orden));
        }
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
        setSegun(e.target.value)
    }


    function handleCountriesByActivity(e){
        e.preventDefault();
        document.getElementById('txtNombre').value = '';
        dispatch(filterCountriesByActivity(e.target.value+'-'+orden));
    }

    //Es necesario crear una funcion para la accion del boton (que carga las actividades)
    return (
        <div>

            <Link to= '/activity'>Crear actividad</Link>

            <h1>Busqueda de países</h1>

            <div>
                Continente:
                <select onChange={e => handleFilterContinente(e)}>
                    <option value= 'All'>Todos</option>
                    <option value= 'Europe'>Europa</option>
                    <option value= 'Oceania'>Oceania</option>
                    <option value= 'Americas'>America</option>
                    <option value= 'Africa'>Africa</option>
                    <option value= 'Asia'>Asia</option>
                    <option value= 'Antarctic'>Antartida</option>
                </select>
                Actividad:
                <select onChange={e => handleCountriesByActivity(e)}>
                    <option value= 'All'>Todas</option>    
                {
                    allActivities?.map((c) => {
                        return (
                                <option value= {c.nombre}>{c.nombre}</option>
                        )
                    })                       
                }
                </select>
                Orden:
                <select onChange={e => handleSetOrder(e)}>
                    <option value= 'asc'>Ascendente </option>
                    <option value= 'des'>Descendente </option>
                </select>
                <select onChange={e => handleSetOrderPoblacion(e)}>
                    <option value="alf" selected>alfabeticamente</option>
                    <option value="pob">según población</option>
                </select>
                <Paginado 
                countriesPerPage={countriesPerPage} 
                allCountries={allCountries.length} 
                paginado={paginado}
                />

                <SearchBar/>
                <br></br>
                {
                    currentCountriesParte1?.map((c) => {
                        return (
                            <Fragment>
                                <div className='rPais'>
                                    <Link to={"/home/" + c.id}>
                                        <Card nombre={c.nombre} imagen={c.bandera} continente={c.continente}/>
                                    </Link>
                                </div>
                            </Fragment>
                        )
                    })                       
                }
                <br></br>
                {
                    currentCountriesParte2?.map((c) => {
                        return (
                            
                            <Fragment>
                                <div className='rPais'>
                                    <Link to={"/home/" + c.id}>
                                        <Card nombre={c.nombre} imagen={c.bandera} continente={c.continente}/>
                                    </Link>
                                </div>
                            </Fragment>
                        )
                    })                       
                }
        
            </div>
            <button onClick={e=> {handleClick_Paises(e)}}>
                Volver a cargar todos los paises
            </button>
        </div>
    )
}

import React, { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
//importo los hook que voy a usar de react
import {useState, useEffect} from 'react';
//importo los hooks de react-redux(previamente lo instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
//importo las actions que me interesa usar en este componente
import { getActivities, getCountries, setOrderCountries, setOrderPoblacion, filterPaisesByBack } from '../actions';
//importo los componentes que voy a usar
import Card from './Card';
import Paginado from './Paginado';

import './Home.css'

//comienza el componente
export default function Home () {
    let navigate = useNavigate();
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
    const [continente, setContinente] = useState('Todos')
    const [actividad, setActividad] = useState('Todas')
    const [nombrePais, setNombrePais] = useState('')

    const [paginaActual, setPaginaActual] = useState(1)
    const [cantidadPaisesPorPagina] = useState(10)
    const indiceMaximoDeLaPagina = paginaActual * cantidadPaisesPorPagina // 
    const indiceDelPrimerPais = indiceMaximoDeLaPagina - cantidadPaisesPorPagina 
    const paisesPaginaActual = allCountries.slice(indiceDelPrimerPais, indiceMaximoDeLaPagina )

    const paisesParteSuperior = paisesPaginaActual.slice(0, 5)
    const paisesParteInferior = paisesPaginaActual.slice(5, 10)


    const paginado = (pageNumber) => {
        setPaginaActual(pageNumber)
    }

    function handleClick_Actividades(e){
        e.preventDefault();
        //alert(continente)
        setNombrePais('')
        //document.getElementById('txtNombre').value = '';
        dispatch(getActivities());
    }

    function handleCountriesByActivity(e){
        e.preventDefault();
        let filtroCombinado = ''

        //document.getElementById('txtNombre').value = '';
        
        setActividad(e.target.value)
        filtroCombinado = continente + '-' + e.target.value + '-' + orden + '-' + segun + '-' + nombrePais
        
        //alert(filtroCombinado)
        //dispatch(filterCountriesByActivity(e.target.value+'-'+orden));

        dispatch(filterPaisesByBack(filtroCombinado))

        setPaginaActual(1);
    }

    function handleClick_Paises(e){
        e.preventDefault();
        setNombrePais('')
        //document.getElementById('txtNombre').value = '';
        dispatch(getCountries());
        setPaginaActual(1)
    }

    function handleFilterContinente(e){
        e.preventDefault();
        let filtroCombinado = ''

        //document.getElementById('txtNombre').value = '';
        
        setContinente(e.target.value)
        filtroCombinado = e.target.value + '-' + actividad + '-' + orden + '-' + segun + '-' + nombrePais
        
        //alert(filtroCombinado)
        //dispatch(filterCountriesByContinente(e.target.value+'-'+orden));

        dispatch(filterPaisesByBack(filtroCombinado))

        setPaginaActual(1);
    }

    function handleSetOrder(e){
        e.preventDefault();
        
        //No necesita el filtro combinado porque lo resuelvo en el FrontEnd
        //filtroCombinado = continente + '-' + actividad + '-' + e.target.value + '-' + segun + '-' + nombrePais
        
        //alert(filtroCombinado)

        if(segun === 'alf'){
            dispatch(setOrderCountries(e.target.value));
        } else {
            dispatch(setOrderPoblacion(e.target.value));
        }

        setOrden(e.target.value)

        setPaginaActual(1);

    }
    //A medida que escribe el usuario en el txtSearchBar
    function handleInputCountries(e){
        setNombrePais(e.target.value)
        console.log(e.target.value)
        console.log(nombrePais)
    }

    //txtSearchBar
    function handleSubmit(e){
        e.preventDefault();

        let filtroCombinado = ''
        
        setNombrePais(e.target.value)
        console.log('Submit ' + e.target.value)
        console.log(nombrePais)

        filtroCombinado = continente + '-' + actividad + '-' + orden + '-' + segun + '-' + nombrePais

        dispatch(filterPaisesByBack(filtroCombinado))

        setPaginaActual(1);
    }

    function handleClick_SetOrderSegun(e){
        e.preventDefault();

        //let filtroCombinado = ''
        
        setSegun(e.target.value)
        //No necesita el filtro combinado porque lo resuelvo en el FrontEnd
        //filtroCombinado = continente + '-' + actividad + '-' + orden + '-' + e.target.value + '-' + nombrePais
        
        //alert(filtroCombinado)
        //alert("Ordena " + (e.target.value === 'alf' ? "alfabeticamente" : "segun poblacion"));

        if(e.target.value === 'alf'){
            dispatch(setOrderCountries(orden));
        } else { //'pob' para ordenar segun la cantidad de poblacion
            dispatch(setOrderPoblacion(orden));
        }

        setPaginaActual(1);

    }

    function handle_Click_CrearActividad(){
        navigate("../activity");
    }

    //Es necesario crear una funcion para la accion del boton (que carga las actividades)
    return (
        <div className='rHome'>
            
            {//<!-- <Link to= '/activity'>Crear actividad</Link>
            }

            <h1>Busqueda de pa??ses</h1>

            <div>
                Continente:
                <select onChange={e => handleFilterContinente(e)}>
                    <option value= 'Todos'>Todos</option>
                    <option value= 'Europe'>Europa</option>
                    <option value= 'Oceania'>Oceania</option>
                    <option value= 'Americas'>America</option>
                    <option value= 'Africa'>Africa</option>
                    <option value= 'Asia'>Asia</option>
                    <option value= 'Antarctic'>Antartida</option>
                </select>
                Actividad:
                <select onChange={e => handleCountriesByActivity(e)}>
                    <option value= 'Todas'>Todas</option>    
                {
                    allActivities?.map((c) => {
                        return (
                                <option value= {c.nombre}>{c.nombre}</option>
                        )
                    })                       
                }
                </select>
                
                <button onClick={e=> {handle_Click_CrearActividad(e)}}>
                    Crear Actividad
                </button>

                <button onClick={e=> {handleClick_Actividades(e)}}>
                    Refrescar Actividades
                </button>

                Orden:
                <select onChange={e => handleSetOrder(e)}>
                    <option value= 'asc'>Ascendente </option>
                    <option value= 'des'>Descendente </option>
                </select>
                <select onChange={e => handleClick_SetOrderSegun(e)}>
                    <option value="alf" selected>alfabeticamente</option>
                    <option value="pob">seg??n poblaci??n</option>
                </select>
                <Paginado 
                countriesPerPage={cantidadPaisesPorPagina} 
                allCountries={allCountries.length} 
                paginado={paginado}
                />

                <div>
                    <input id='txtSearchBar' value={nombrePais} type="text" placeholder='Buscar' onChange = {(e) => handleInputCountries(e)}/>
                    <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
                </div>

                <br></br>
                {
                    paisesParteSuperior?.map((c) => {
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
                    paisesParteInferior?.map((c) => {
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
                {  paisesParteSuperior.length === 0 && (
                    <p className='errors'>No existen pa??ses con el filtro aplicado</p>
                   )
                }

        
            </div>
            <button onClick={e=> {handleClick_Paises(e)}}>
                Volver a cargar todos los paises
            </button>
        </div>
    )
}

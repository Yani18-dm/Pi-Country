import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

//importo los hooks de react-redux(previamente lo instalo npm i react-redux)
import {useDispatch, useSelector} from 'react-redux';
import { getActivities, getCountries } from '../actions';
import { postActivity } from '../actions';

//crear un obj vacio
//input es mi estado local 
//Y sino hay nada en mi estado local, coloco string donde requiere un nombre y sino vuelvo preguntar

function validate(input) {
    let errors = {}; // deja el campo vacio
    console.log(!input.nombre?'No completo el nombre':input.nombre)
    console.log(!input.temporada? 'No completo temporada':input.temporada)

    if (!input.nombre) {
        errors.nombre = 'Se requiere un Nombre';  
    } 
    if (!input.temporada) {
        errors.temporada = 'Temporada debe ser completado';
    }
    if (!input.dificultad) {
        errors.dificultad = 'Dificultad debe ser completado';
    }
    if (!input.duracion) {
        errors.duracion = 'Duracion debe ser completado';
    }
    if(input.paises.length==0){
        errors.paises = 'Paises debe ser completado';
    }         

    //console.log('Asi sale de validar: ' + errors)
    return errors;
};

export default function ActivityCreate() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const countries = useSelector((state) => state.countries);
    
    const [errors, setErrors] = useState({});


    //lo que necesita el post por input
    //guardamos mas de un pais en un arreglo
    const [input,setInput] = useState({
        nombre:"",
        dificultad:"",
        duracion:"",
        temporada:"",
        paises:[]
    })

    /*
    useEffect(()=>{
        //dispatch(postActivity(input));
        dispatch(getActivities());
    }, [dispatch])

    const act = useSelector ((state) => state.activities);
    alert(act)
    */

    //va modificando y guardando en mi estado input, los cambios que realize el usuario
    //setInput(estado) ademas de lo que tiene,agrego el target value de lo que este modificando
    //e.target.value va a tomar algunos de los input, va a ir modificando dependiendo de lo que este escrito
    //handleChange pasarlo a los input
    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value
        });

        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }, e.target.name));
        /*
        console.log('Asi llega a handleChange: ' + 
                       (!errors.nombre?'Escribio su nombre':errors.nombre) + 
                       (!errors.temporada?'Bien, seleccionaste temporada':errors.temporada) +
                       (!input.nombre?'':input.nombre) + 
                       (!input.temporada?'':input.temporada))
        */
    }


    function handleSelect(e){
        setInput({
            ...input,
            paises : [...input.paises, e.target.value]
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }));
    }

    //necesito despachar y renderizar el dispatch de mi accion: paises
    useEffect(() => {
        dispatch(getCountries());
    }, []);

    function handleSubmit(e){
        e.preventDefault();

        const reporteErrores = []

        if(!input.nombre){
            if(errors.nombre)
                reporteErrores.push(errors.nombre)
            else
                reporteErrores.push("Debe completar la nombre")
        }
        if(!input.temporada){
            if(errors.temporada)
                reporteErrores.push(errors.temporada)
            else
                reporteErrores.push("Debe completar la temporada")
        }  
        if(!input.dificultad){
            if(errors.dificultad)
                reporteErrores.push(errors.dificultad)
            else
                reporteErrores.push("Debe completar la dificultad")
        }  
        if(!input.duracion){
            if(errors.duracion)
                reporteErrores.push(errors.duracion)
            else
                reporteErrores.push("Debe completar la duracion")           
        } 
        if(input.paises.length==0){
            if(errors.paises)
                reporteErrores.push(errors.paises)
            else
                reporteErrores.push("Debe completar los paises")
            
        } 

        let mensajeError = ''
        let i = 0
    
        while (i < reporteErrores.length) {
            //console.log('Paso por el while')
            mensajeError += "\n" + reporteErrores[i];
            i++;
        }

        if(reporteErrores.length > 0)
            alert(mensajeError);
        else {
            dispatch(postActivity(input));

            setInput({
                nombre:"",
                dificultad:"",
                duracion:"",
                temporada:"",
                paises:[]
            })
            
            navigate("../home");
        }

    }
    
    //creo el boton
    return(
        <div key={"ActivityCreate"}>
            <Link to= '/home'><button>Volver</button></Link>
            <h1>Crea tu actividad</h1>
            <form onSubmit={(e)=>handleSubmit(e)}>
                <div className='Card'>
                    <div>
                        <label>Nombre</label>
                        <input type= "text" 
                        value={input.nombre} 
                        name='nombre' onChange={handleChange}
                        />
                        {errors.nombre && (
                            <p className='errors'>{errors.nombre}</p>
                        )}
                    </div>
                    <div>
                        <br></br>
                        <label>Dificultad</label>
                        <select name = "dificultad" onChange={handleChange}>
                            <option value= 'Seleccionar'>Seleccionar</option>
                            <option value= '1'>Muy baja</option>
                            <option value= '2'>Baja</option>
                            <option value= '3'>Media</option>
                            <option value= '4'>Alta</option>
                            <option value= '5'>Muy alta</option>
                        </select>
                        {errors.dificultad && (
                            <p className='errors'>{errors.dificultad}</p>
                        )}
                    </div>
                    <div>
                        <br></br>
                        <label>Duracion</label>
                        <input type= "text" value={input.duracion} name='duracion' onChange={handleChange} 
                        />
                        {errors.duracion && (
                            <p className='errors'>{errors.duracion}</p>
                        )}                        
                    </div>
                    <div>
                        <br></br>
                        <label>Temporada</label>
                        <select name="temporada" onChange={handleChange}>
                            <option value= 'Seleccionar'>Seleccionar</option>
                            <option value= 'Otoño'>Otoño</option>
                            <option value= 'Invierno'>Invierno</option>
                            <option value= 'Primavera'>Primavera</option>
                            <option value= 'Verano'>Verano</option>
                        </select>
                        {errors.temporada && (
                            <p className='errors'>{errors.temporada}</p>
                        )}
                    </div>
                    <div>
                        <br></br>
                        <label>Paises</label>
                        <select name="paises" onChange={handleSelect}>
                            <option value= 'Seleccionar'>Seleccionar</option>
                            {countries.map((c) => (
                                <option value= {c.nombre}>{c.nombre}</option>
                            ))}
                        </select>
                        <ul><li>{input.paises.map(el => el + " ,")}</li></ul>
                        {errors.paises && (
                            <p className='errors'>{errors.paises}</p>
                        )} 

                    </div>
                        <button type='submit'>Crear actividad</button>
                </div>
            </form>
        </div>

    )
}
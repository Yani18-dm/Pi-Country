import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
//importo getNombreCountries de actions
import { getNombreCountries } from '../actions';

export default function SearchBar (){
    const dispatch = useDispatch()

    const [nombre,setNombre] = useState("")

    //el value del input va a tomar el valor del state
    //Setear el setNombre
    //Luego a esta funcion se lo paso al input que esta debajo: Onchange
    function handleInputCountries(e){
        e.preventDefault()
        setNombre(e.target.value)
        console.log(nombre)
    }

    function handleSubmit(e){
        e.preventDefault()
        dispatch(getNombreCountries(nombre))
    }

    //Boton renderizado y crear la funcion. 
    //tengo un input [nombre,setnombre]guardar en mi estado local lo que vaya apareciendo en el input   
    return (
            <div>
                <input id='txtNombre' type="text" placeholder='Buscar' onChange = {(e) => handleInputCountries(e)}/>
                <button type='submit' onClick={(e) => handleSubmit(e)}>Buscar</button>
            </div>
        )

}
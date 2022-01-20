import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getDetail } from '../actions';
import { useEffect } from 'react';

export default function Detail(){
    const { id } = useParams();
    //console.log(id)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDetail(id));
    }, [dispatch])

    const myCountry = useSelector((state) => state.detail)

    return (
        <div>
            <Link to= '/home'><button>Volver</button></Link>
            {
                myCountry.length > 0 ?
                <div>
                    <h1>{myCountry[0].nombre}</h1>
                    <h3>Continente: {myCountry[0].continente}</h3>
                    <h4>Capital: {myCountry[0].capital}</h4>
                    <img src={myCountry[0].bandera} alt="img not found" width="200px" height="160px"/>
                    <h3>Población: {myCountry[0].poblacion} habitantes</h3>
                    <h3>Area: {myCountry[0].area} m2 </h3>
                    <h3>Actividades:</h3>
                    <ul className='listaActividades'>
                    {
                        myCountry[0].activities.map((c) => {
                            return (
                            <li>{c.nombre}</li>
                            )
                        })
                    }
                    </ul>

                </div>
                : 
                <div>No trajo al pais</div>
            }
        </div>    
    );
}
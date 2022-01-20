import React from 'react';

export default function Card({ nombre, imagen, continente}){

    return (
        <div>
            <h3 className='cardPais'>{nombre}</h3>
            <img src={imagen} alt="img not found" width="140px" height="100px"/>
            <h5 className='cardPaisContinente'>{continente}</h5>
        </div>
    );
}
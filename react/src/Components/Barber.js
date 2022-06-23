import React, { useState } from 'react'
import api from './Api'
import Card from './Card';
import "./css.css";



export default function Barber() {

    const [apidata, setapidata] = useState(api);

    const filteritem = (category) => {
        const updatelist = api.filter((curElem) => {
            return curElem.category === category;
        });

        setapidata(updatelist);
    }
    return (
        <>

            <nav className='navbar'>
                <div className='btn-group'>
                    <button className='btn-group__item' onClick={() => filteritem("HairCut")}>HairCut</button>
                    <button className='btn-group__item' onClick={() => filteritem("shaving")}>shaving</button>
                    <button className='btn-group__item' onClick={() => filteritem("styling")}>styling</button>
                    <button className='btn-group__item' onClick={() => filteritem("Triming")}>Triming</button>
                    <button className='btn-group__item' onClick={() => setapidata(api)}>all</button>
                </div>

            </nav>
            <Card apidata={apidata} />

        </>
    );
};







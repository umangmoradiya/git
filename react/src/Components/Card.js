import React from 'react'

export default function Card({ apidata }) {
    // console.log(apidata);
    return (
        <>
            <section className='main-card--cointainer'>
                {apidata.map((curElem) => {
                    return (
                        <>
                            <div className='card-container' key={curElem.id}>
                                <div className="card">
                                    <div className='card-body'>
                                        <span className='card-number card-circle subtle'><h5>{curElem.id}</h5></span>
                                        <span className='card-author subtle'>{curElem.category}</span>
                                        <h2 className='card-title'>{curElem.name}</h2>
                                        <span className='card-description subtle'>
                                           <h5>{curElem.description}</h5>
                                        </span>
                                        <div className='card-price'><h4>{curElem.price}</h4></div>
                                    </div>
                                    <img src={curElem.image} alt="images" className='card-media' /><br />
                                    <span className='card-teg subtle'><button>order now</button></span>
                                </div>
                            </div>
                        </>
                    );
                })}
            </section>

        </>
    );
};

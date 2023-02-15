import React from 'react'

export default function Product(props){


    return (
        <div className='item'>
            <img className='item--img' src={props.itemsData.image} alt="img1"></img>
            <h1 className='item--title'>{JSON.stringify(props.itemsData.title)}</h1>
            <h4 className='item--price'>{JSON.stringify(props.itemsData.price)}€</h4>
        </div>
    )

}
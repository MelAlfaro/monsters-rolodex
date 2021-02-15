import React from 'react';

import './search-box.styles.css';

// functional component: no tienen acceso a state, ya que no tienen acceso a Constructor, porque no tienen acceso a Component
// no tiene acceso a life-cycle methods, no tienen nada de esto, porque no lo necesitan, no siempre es necesario crear Class Components
// algunas veces, solo es necesario desplegar algún contenido HTML, y ahí es donde se crean y funcionan esto functional components.
// un functional component, en pocas palabras, es una función que recibe algunos props y con eso despliega HTML
export const SearchBox = ({ placeholder, handleChange }) => (
    <input
    className='search' 
    type='search' 
    placeholder={placeholder}
    onChange={handleChange}
    /> 
);

/* el hecho de usar type "search" me permite agregar un place holder al input, con onChange, e representa 
un evento sintético que se le envía como parámetro,  setState es un evento asíncrono, por lo tanto, 
si se quiere ejecutar un evento realmente después de que se complete el setState, se puede enviar como 
segundo parámetro como en este caso por medio del uso de "() =>" */
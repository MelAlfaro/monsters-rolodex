import React from 'react';

import { Card } from '../card/card.component';

import './card-list.styles.css';

// esto es un functional component - existen los functional components y los class components: https://www.freecodecamp.org/news/functional-components-vs-class-components-in-react/
// algo importante de los componentes, es que toman "props", que son los parámetros que obtenemos del componente.
export const CardList = props => (
    <div className='card-list'>
        {props.monsters.map(monster => (
            <Card key={monster.id} monster={monster} />
        ))}
    </div>
);
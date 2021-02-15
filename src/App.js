import React, { Component } from 'react' // importo component con el fin de utilizar clases

import { CardList } from './components/card-list/card-list.component.jsx';
import { SearchBox } from './components/search-box/search-box.component.jsx';

import './App.css';


// Component, me da acceso a usar el método render()
// dentro de las clases puedo usar state, el cual es un obejto de js con propiedades, que se puede accesar desde cualquier punto dentro de la clase
// Component, también da acceso acceso al método setState, el cual permite cambiar los valores de las propiedades del state
class App extends Component {
  // los constructores se ejecutan de primero siempre, antes que cualquier otra cosa dentro de la clase
  constructor() { // los constructores en react solo se utilizan para dos propósitos, 1. para inicializar un estado local asignando un objeto al this.state. 2. Para enlazar manejadores de eventos a una instancia
    super(); // super, llama el método constructor, de Component que es su padre, lo cual da acceso a this.state

    this.state = { //this.state asigna el estado inicial, setState lo modifica luego, ya fuera del constructor.
      //dentro de este state, se crean las propiedades que se usarán a lo largo y dentro de la clase
      monsters: [], // el estado inicial es un array vacío, que cuando se monta, pasa a ejecutarse componentDidMount, y ahí empieza a llamar el API y hacer el setState que luego renderiza la lista con un map()
      searchField: '' // lo que se digita en el campo de búsqueda, se debe almacenar en el state, para luego poder filtrar
    }

    // Este enlace usando 'bind' es necesario para hacer que 'this' funcione en el callback, es decir, 
    // por si solo, dentro del método 'handleChange' creado, this no tiene contexto hacia  App como si la 
    // tienen los demás métodos de life-cycle por ejemplo.
    // https://es.reactjs.org/docs/handling-events.html
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {// lo que hace este método es que cuando el componente se monta (cuando react pone el componente en la página por primera vez), se ejecuta lo que sea que haya en este bloque de código
    fetch('https://jsonplaceholder.typicode.com/users') // retorna promise
    .then(response => response.json()) //  retorna promise
    .then(users => this.setState({ monsters: users })); // el setState asigna la respuesta de la promise, a la propiedad monsters del estado
  }

  handleChange(e) {
    // this.setState funciona acá gracias al enlace creado con .bind en el constructor.
    // SIN EMBARGO, esto ya no es necesario desde ES6 gracias a los arrow functions, 
    // que definen el contexto basado en el objeto donde se están creando (lexica scope), 
    // como en este caso handleChange dentro de App.
    this.setState({ searchField: e.target.value })
  }

  //forma correcta de manejar el handleChange con ES6 sin necesidad de crear un enlace con bind en el constructor
  /* handleChange = (e)  => {
    this.setState({ searchField: e.target.value })
  } */
  // una buena regla, es usar arrow functions SIEMPRE que se defina una clase propia 
  // (que no sea de react), con solo eso se evita la necesidad del bind y código adicional, aparte que se ve más limpio


  render() {
    //destructured
    const { monsters, searchField } = this.state;
    // abajo, lo mismo de arriba pero de la forma antigua y clásica
      // const monsters = this.state.monsters
      // const searchField = this.state.searchField

    // por medio de este filtro, se logra que dinámicamente se renderice el app con las búsquedas que hace el usuario
    // ya que este filtro, es pasado como prop a CardList y se renderiza nuevamente gracias al onChange en el input.
    const filteredMonsters = monsters.filter(monster =>
        monster.name.toLowerCase().includes(searchField.toLocaleLowerCase())
        )

    return (
      <div className="App">
        <h1>Monsters Rolodex</h1>
        <SearchBox
          placeholder='search monsters' 
          handleChange= {this.handleChange}
          /* Esta función recibe un evento como parámetro, representado por la letra e en este caso */
        />
        <CardList monsters={filteredMonsters}>
          {/* map, retorna el retorno de cualquier función que se le pase, iterado sobre cada elemento en un array */}
          {/* además de los parámetros, al componente le puedo enviar "children", y sería cualquier cosa que se envíe dentro de los tags del componente, puede ser cualquier cosa  */}
          {/* Los children no se renderizan automáticamente, es necesario hacerlo en el componente como tal, se llaman dentro de brackets de esta manera: {props.children} */}
        </CardList>
        { /* Los brackets son necesarios, dentro de estos, se puede remderizar lo que sea en js*/ }
      </div>
    ); // return cierra con ;
  }
}

export default App;

// setState
// En react, la unica forma en que se puede actualizar el estado del componente, es por medio del uso de setState. 
// no es posible, como en JS normal, asignar un valor a una variable, por ejemplo, esto porque la forma en que funciona
// react, donde la data fluye en un solo sentido, no permite este tipo de acciones.

// setState  y render
// de la forma en que funciona react, el componente se renderiza (render()), cada vez que se actualiza el estado
// es decir, cuando una acción, ejecuta un setState, y se actualiza el estado, se vuelve a ejecutar render()

// JSX
// Hay que tener en cuenta, que en react, nunca se está escribiendo HTML por más que se le asemeje, siempre
// se está escribiendo código JSX, como "className", "onClick", "src"

// Lifecycle methods
// métodos que se llaman en diferente etapas de cuando el componente es renderizado. tales como componentDidMount, componentDidUpdate, componentWillUnmount...


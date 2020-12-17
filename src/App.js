import React, { Fragment, useState, useEffect } from "react";
import Clima from './components/Clima'
import Formulario from './components/Formulario'
import Header from './components/Header'
import Error from './components/Error'

function App() {
  //state del formulario
  const [busqueda, guardarBusqueda]=useState({
    ciudad:'',
    pais:'',
  })
  const [consultar, guardarConsultar]= useState(false)
  const [resultado, guardarResultado] = useState({})
  const [error, guardarError]= useState(false)
  const {ciudad, pais} = busqueda
  useEffect(()=>{
    const consultarApi = async()=>{
      if(consultar){
        const myApiKey = 'e3e024588e70b3b96ac167ec7ec440fc'
        const url = `
        https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${myApiKey}
        `
        const resupuesta = await fetch(url)
        const resultado = await resupuesta.json()
        guardarResultado(resultado)
        guardarConsultar(false)
        //detecta si hubo errores en la consulta 
        if(resultado.cod==='404'){
          guardarError(true)
        }else{
          guardarError(false)
        }
      }
    }
    consultarApi()
    // eslint-disable-next-line
  },[consultar])
  let componente
  if(error){
    componente = <Error mensaje='No hay resultados'/>
  }else{
    componente= <Clima
                  resultado={resultado}
                />
  }
  return (
    <Fragment>
      <Header
        titulo='Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
            <div className="col m6 s12">
              <Formulario
                busqueda={busqueda}
                guardarBusqueda={guardarBusqueda}
                guardarConsultar={guardarConsultar}
              />
            </div>
            <div className="col m6 s12">
              {componente}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;

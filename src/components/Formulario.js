import React, {useState} from 'react';
import Error from './Error'
import PropTypes from 'prop-types';

const Formulario = ({busqueda, guardarBusqueda, guardarConsultar}) => {
    //api key 
    //e3e024588e70b3b96ac167ec7ec440fc
    //url api
    //http://api.openweathermap.org/data/2.5/weather?q=guadalajara,mexico&appid=e3e024588e70b3b96ac167ec7ec440fc
    //https://openweathermap.org/api
    const [error, guardarError]=useState(false)
    //extraer ciudad y pais
    const {ciudad, pais}= busqueda
    //funcion que coloca los elementos en el state
    const handleChange = e =>{
        //e.preventDefault()
        //actualizar el state
        guardarBusqueda({
            ...busqueda,
            [e.target.name]:e.target.value
        })
    }
    //cuando el usuario da submit al form
    const handleSubmit = e => {
        e.preventDefault()
        //validar
        if(ciudad.trim()==='' || pais.trim()===''){
            guardarError(true)
            return
        }
        guardarError(false)
        //pasar al componente principal
        guardarConsultar(true)
    }
    return ( 
        <form
            onSubmit={handleSubmit} 
        >
            {error ? <Error mensaje='Todos los campos son obligatorios'/> : null}
            <div className="input-field col s12">
                <input 
                    type="text" 
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange} 
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select 
                    name="pais" 
                    id="pais"
                    value={pais}
                    onChange={handleChange}
                >
                    <option value="">-- selecciona --</option>
                    <option value="MX">México</option>
                    <option value="CO">Colombia</option>
                </select>
                <label htmlFor="pais">País: </label>
            </div>
            <div className="input-field col s12">
                <input 
                    type="submit" 
                    value="Buscar Clima" 
                    className="waves-effect waves-light btn-large btn-block yellow accent-4"
                />
            </div>
        </form>
     );
}

Formulario.propTypes = {
    busqueda : PropTypes.object.isRequired,
    guardarBusqueda : PropTypes.func.isRequired,
    guardarConsultar : PropTypes.func.isRequired,
}

export default Formulario;
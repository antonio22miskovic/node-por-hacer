const fs = require('fs')

let listadoPorHacer = []

	// se lista el array con los datos de data.json
const listarDB = () => {
	try{
		return listadoPorHacer = require('../db/data.json')
	}
	catch(error){
		return listadoPorHacer = []
	}
}

const guardarDB = () => {

	let data = JSON.stringify(listadoPorHacer)
	fs.writeFile(`db/data.json`, data, (err) => {
  			if (err) throw new Error(`no se pudo grabar `, err)
			})
}


const crear = ( descripcion ) => {

	return new Promise(( resolve , reject ) => {

		try{
			if (descripcion == undefined || descripcion ==  true || descripcion == false)
				return reject('es probable que haya introducido el campo de manera incorrecta pruebe con la sintaxis: -d "la descripcion"')

			listarDB()

			let PorHacer = {
				descripcion,
				completado:false
			}

			listadoPorHacer.push( PorHacer )
			guardarDB()

			return resolve( PorHacer )

		}
		catch(e)
		{
		  return reject(e)
		}
	})
}

const actualizar = ( descripcion, completado) => {
	listarDB()
	let index = listadoPorHacer.findIndex( tarea => tarea.descripcion === descripcion )
	if (index >= 0){
		listadoPorHacer[index].completado = completado
	guardarDB()
		return true
	}else{
		return false
	}
}

const eliminar = (descripcion) => {
	listarDB()
 	let resultado = listadoPorHacer.filter(tareas => descripcion != tareas.descripcion)
 	// aqui lo que hago es sacar el item del array osea lo empujo fuera y con eso lo elimino
 	if (resultado.length === listadoPorHacer.length){
 		return false
 	}else{
 		listadoPorHacer = resultado
 		guardarDB()
 		return true
 	}
}

const filtro = (descripcion = null , completado = null ) => {

	listarDB()

	if (descripcion != null && completado != null) {
			if (completado == 'true') {
				let dyc = listadoPorHacer.filter(tareas => tareas.descripcion == descripcion && tareas.completado == true)
				return dyc
			}
			let dyc = listadoPorHacer.filter(tareas => tareas.descripcion == descripcion && tareas.completado == false)
				return dyc

	}else if (descripcion != null) {
		let lista = listadoPorHacer.filter(tareas => tareas.descripcion == descripcion)
			return lista

	}else if ( completado != null) {

			if (completado == 'true') {
				let completadolist = listadoPorHacer.filter(tareas => tareas.completado == true)
				return completadolist
			}
			let completadolist = listadoPorHacer.filter(tareas => tareas.completado == false)
				return completadolist
	}
}

module.exports = {
	crear,
	listarDB,
	actualizar,
	eliminar,
	filtro
}
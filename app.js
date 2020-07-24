const argv = require('./config/yargs').argv
const colors = require('colors')
const { crear, listarDB, actualizar, eliminar, filtro } = require('./por-hacer/por-hacer')

let comando = argv._[0]

switch( comando )
{
	case 'crear' :
		crear(argv.descripcion)
		.then(porHacer => console.log(porHacer))
		.catch(e => console.log(e))
	break

	case 'listar' :
	if (argv.descripcion != undefined || argv.completado != undefined) {
	 let filtros = filtro(argv.descripcion , argv.completado)
	 if (filtros == 0) {
	 	return console.log('no hay resultado de la busqueda por favor verifique'.red)
	 }
	 for(let list of filtros){
		   console.log('======= Por Hacer ======'.green)
		   console.log(`tarea: ${list.descripcion}`)
		   console.log(`listado: ${list.completado}`)
		   console.log('======================='.green)
		}
		return
	}

	  let listado = listarDB()
	  	if (listado == 0)
	  		return console.log('no hay tareas por hacer'.red)
		for(let lista of listado){
		   console.log('======= Por Hacer ======'.green)
		   console.log(`tarea: ${lista.descripcion}`)
		   console.log(`listado: ${lista.completado}`)
		   console.log('======================='.green)
		}
	break

	case 'actualizar' :
	 let resultado = actualizar(argv.descripcion, argv.completado)
	 	if (resultado ===  true)
	 		return console.log('se actualizo correctamente'.green)
	 	else
	 		return console.log('la tarea no existe'.red)
	break

	case 'eliminar' :
		let result = eliminar(argv.descripcion)
		if (result === true)
			return console.log('tarea eliminada'.green)
		else
			return console.log('no se encontro la tarea'.red)

	break

	default : console.log('comando no es reconocido'.red)

}
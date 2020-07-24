
	const descripcion = {
			demand: true, // requerido
			alias:'d',
			desc:'descripcion de la tarea '
	}
 const completado = {
			alias:'c',
			default:true,
			desc:'marca como completado o pendiente la tarea'
		}

	const argv = require('yargs')
				.command('crear','crea una nueva tarea por hacer',{ descripcion })
				.command('actualizar','actualiza las tareas',{ descripcion, completado})
				.command('listar','lista todas las tareas',{
					completado:{
						alias:'c',
						desc:'espesifique si quiere la tarea completada o pendiente con un true para completada y en un false para pendiente'
					},
					descripcion:{
						alias:'d',
						desc:'descripcion de la tarea a buscar'
					}
				})
				.command('eliminar','elimina una tarea',{ descripcion })
				.help()
				.argv

module.exports ={
	argv
}
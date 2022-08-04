const chalk = require('chalk')
const yargs = require('yargs')
const FuncNotes = require('./notes.js')
//Personalización versión de Yargs
yargs.version('1.1.0')

//Crear comando para agregar una nota
yargs.command({
	command: 'add',
	describe: 'Agregar nota',
	builder: {
		titulo: {
			describe: 'Titulo',
			demandOption: true,
			type: 'string'
		},
		contenido: {
			describe: 'Contenido',
			demandOption: true,//Permite ingresar al usuario el argumento y hacerlo requerido
			type: 'string'
		}
	},
	handler(argv)
	{
		FuncNotes.addNote(argv.titulo, argv.contenido)
	}
})
//Crear comando para eliminar una nota
yargs.command({
	command: 'remove',
	describe: 'Eliminar nota',
	builder: {
		titulo: {
			describe: 'Titulo',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv)
	{
		FuncNotes.removeNote(argv.titulo)
	}
})

//Crear comando para listar las notas
yargs.command({
	command: 'list',
	describe: 'Listado de notas',
	handler()
	{
		FuncNotes.listNotes()
	}
})
//Crear comando para ver una nota
yargs.command({
	command: 'read',
	describe: 'Ver nota',
	builder: {
		titulo: {
			describe: 'Titulo',
			demandOption: true,
			type: 'string'
		}
	},
	handler(argv)
	{
		FuncNotes.readNote(argv.titulo)
	}
})
yargs.parse()
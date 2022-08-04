const fs = require('fs')
const chalk = require('chalk')

//Función para agregar notas
const addNote = (title, body) =>
{
	const notes = loadNotes()
	const duplicateNote = notes.find((note) => note.title === title)

	if(!duplicateNote)
	{
		notes.push({
			title: title,
			body: body
		})
		saveNotes(notes)
		console.log(chalk.hex('#CAFFBF').inverse('Se agregó la nota correctamente!'))
	} else
	{
		console.log(chalk.hex('#FFADAD').inverse('El título de la nota que intenta agregar ya existe!'))
	}
}
//Función para eliminar una nota
const removeNote = (title) =>
{
	const notes = loadNotes()
	const notesToKeep = notes.filter((note) => note.title !== title)

	if(notes.length > notesToKeep.length)
	{
		console.log(chalk.hex('#CAFFBF').inverse('Se eliminó la nota correctamente!'))
		saveNotes(notesToKeep)
	} else
	{
		console.log(chalk.hex('#FFADAD').inverse('No se encontró la nota con el título especificado!'))
	}
}
//Función para listar las notas agregadas
const listNotes = () =>
{
	const notes = loadNotes()

	console.log(chalk.bgHex('#BDB2FF').bold('Listado de notas'))

	notes.forEach((note) =>
	{
		console.log(chalk.hex('#A0C4FF').bold(note.title))
	})
}
//Función para ver una nota
const readNote = (title) =>
{
	const notes = loadNotes()
	const note = notes.find((note) => note.title === title)

	if(note)
	{
		console.log(chalk.bgHex('#BDB2FF').bold(note.title))
		console.log(chalk.hex('#FFC6FF').bold(note.body))
	} else
	{
		console.log(chalk.hex('#FFADAD').inverse('No se encontró la nota con el título especificado!'))
	}
}
//Función para convertir el objeto a json y escribirlo en el archivo notes.json
const saveNotes = (notes) =>
{
	const dataJSON = JSON.stringify(notes)
	fs.writeFileSync('notes.json', dataJSON)
}
//Función para recuperar las notas de formato json y enviarlas como salida
const loadNotes = () =>
{
	try
	{
		const dataBuffer = fs.readFileSync('notes.json')
		const dataJSON = dataBuffer.toString()
		return JSON.parse(dataJSON)
	} catch(e)
	{
		return []
	}
}


module.exports = {
	addNote: addNote,
	removeNote: removeNote,
	listNotes: listNotes,
	readNote: readNote
}
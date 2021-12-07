const mongoose = require('mongoose')

if (process.argv.length === 5) {
  const password = process.argv[2]
  const name = process.argv[3]
  const number = process.argv[4]

    const url = `mongodb+srv://FullStack:${password}@cluster0.an8f9.mongodb.net/phonebook?retryWrites=true&w=majority`

    mongoose.connect(url)

    const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    })

    const Person = mongoose.model('Person', personSchema)

    const person = new Person({
    name: name,
    number: number,
    })

    person.save().then(result => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
    })

} else if (process.argv.length === 3) {
  const password = process.argv[2]

  const url = `mongodb+srv://FullStack:${password}@cluster0.an8f9.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
const Person = mongoose.model('Person', personSchema)

Person.find({ important: true }).then(result => {
  result.forEach(person => {
    console.log(person)
  })
    mongoose.connection.close()
  })
} else {
  console.log("Please provide the password as an argument: node mongo.js <password> to get all the phonebook's entries or provide password, name and phone to add a new person: node mongo.js <password> <name> <number> (if the name has an space in between it should be enclosed in quotes)")
  process.exit(1)
}
import mongoose from 'mongoose'
const Chrous = mongoose.model('Chrous')

const saveChrous = data => {
  return new Chrous(data).save()
}

const findOneChrous = filter => {
  return Chrous.findOne(filter)
}

const updateChrous = (filter, data, options = {}) => {
  return Chrous.findOneAndUpdate(filter, data, options)
}

const findChrous = filter => {
	return Chrous.find(filter)
}

export {
	saveChrous,
	findOneChrous,
	updateChrous,
	findChrous
}

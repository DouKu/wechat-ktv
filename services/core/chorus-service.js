import mongoose from 'mongoose'
const Chorus = mongoose.model('Chorus')

const saveChorus = data => {
  return new Chorus(data).save()
}

const findOneChorus = filter => {
	return Chorus.findOne(filter)
		.populate('users.user audio')
}

const updateChorus = (filter, data, options = {}) => {
  return Chorus.findOneAndUpdate(filter, data, options)
}

const findChorus = (filter, sort, limit = 100) => {
	return Chorus.find(filter)
		.populate('users.user audio')
		.sort(sort)
		.limit(limit)
}

export {
	saveChorus,
	findOneChorus,
	updateChorus,
	findChorus
}

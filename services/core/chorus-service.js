import mongoose from 'mongoose'
const Chorus = mongoose.model('Chorus')

const savechorus = data => {
  return new chorus(data).save()
}

const findOnechorus = filter => {
  return chorus.findOne(filter)
}

const updatechorus = (filter, data, options = {}) => {
  return chorus.findOneAndUpdate(filter, data, options)
}

const findchorus = filter => {
	return chorus.find(filter)
}

export {
	savechorus,
	findOnechorus,
	updatechorus,
	findchorus
}

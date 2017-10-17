import mongoose from 'mongoose'
const Audio = mongoose.model('Audios')

const saveAudio = data => {
  return new Audio(data).save()
}

const findOneAudio = filter => {
  return Audio.findOne(filter)
}

const updateAudio = (filter, data, options = {}) => {
  return Audio.findOneAndUpdate(filter, data, options)
}

const findAudio = filter => {
	return Audio.find(filter)
}

export {
  saveAudio,
	findOneAudio,
	updateAudio,
	findAudio
}
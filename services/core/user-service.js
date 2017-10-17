import mongoose from 'mongoose'
const Users = mongoose.model('Users')

const saveUser = data => {
  return new Users(data).save()
}

const findUser = filter => {
  return Users.findOne(filter).select({
    access_token: 0,
    refresh_token: 0
  })
}

const updateUser = (filter, data) => {
  return Users.findOneAndUpdate(filter, data).select({
    access_token: 0,
    refresh_token: 0
  })
}

export {
  saveUser,
	findUser,
	updateUser
}
import mongoose from 'mongoose'
const Users = mongoose.model('Users')

const saveUser = data => {
  return new Users(data).save()
}

const findUsers = (filter, options={}) => {
  return Users.find(filter, null, options).select({
    access_token: 0,
    refresh_token: 0
  })
}

const findOneUser = filter => {
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
  findUsers,
	findOneUser,
	updateUser
}
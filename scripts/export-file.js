import '../mongoose'
import '../nconf'
import mongoose from 'mongoose'
import xlsx from 'node-xlsx'
import { findUsers } from '../services/core/user-service'
import { findChorus } from '../services/core/chorus-service'

const exportUser = async () => {
  let users = await findUsers({})
  console.log(users)
}

exportUser()
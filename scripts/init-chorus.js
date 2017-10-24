import '../nconf'
import '../mongoose'
import mongoose from 'mongoose'

const Chorus = mongoose.model('Chorus')

const resource = [
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 1207 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 3423 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 234 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 552 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 234 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2344 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 3244 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2224 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 5667 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 133 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 23452 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2355 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2355 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 5223 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 5224 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2452 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 244 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 5244 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2524 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2552 },
  { users: [{user: '59ee042ef0635265c4817642'}], totalScore: 2554 }
]

const start = async () => {
  const res = await resource.forEach(async item => {
    try {
      return await new Chorus(item).save()
    } catch (error) {
      console.log(error)
    }
  })
}

start()

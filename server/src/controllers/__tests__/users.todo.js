//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=Testing&e=users%20test$20object%20factories&em=
*/

import {initDb} from 'til-server-test-utils'
import * as usersController from '../users'
import db from '../../utils/db'
import {omit} from 'lodash'

const safeUser = user => omit(user, ['salt', 'hash'])

beforeEach(() => initDb())

test('getUsers should return all the users in the database', async () => {
  const req = {}
  const res = {
    json: jest.fn(),
  }

  await usersController.getUsers(req, res)
  expect(res.json).toHaveBeenCalledTimes(1)

  const actualUsers = await db.getUsers
  expect(actualUsers).toEqual(actualUsers.map(safeUser))
})

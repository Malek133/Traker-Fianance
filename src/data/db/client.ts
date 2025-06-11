import * as dotenv from 'dotenv'
 import * as user from '@/src/data/models/user-model'

import {Pool} from 'pg'
import {drizzle} from 'drizzle-orm/node-postgres'

dotenv.config()

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
})

const db = drizzle(pool, {schema: {...user}})

export default db

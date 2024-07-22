import { Hono } from 'hono'
import { userRouter } from './router/user'
import { blogRouter } from './router/blog'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route('/api/v1/blog',blogRouter);
app.route('/api/v1/user',userRouter)

export default app

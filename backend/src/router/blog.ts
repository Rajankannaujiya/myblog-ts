import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Context, Hono } from "hono";
import { verify } from "hono/jwt";
import { createPostInput, updatePostInput } from "@rajan108/medium-blog-common";

// Define the JWT payload interface
interface JwtUserPayload {
  id: string;
  [key: string]: any;
}

// Extend the Hono context to include custom properties
interface CustomContext extends Context {
  userId?: string;
}

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

blogRouter.use('/*', async (c: CustomContext, next: () => Promise<void>) => {
  try {
    const authHeader = c.req.header("authorization") || "";

    // Verify the token and cast the result to the custom payload type
    const user = await verify(authHeader, c.env.JWT_SECRET) as JwtUserPayload;
	console.log("i am the user",user)

    // If user is verified, set the userId in the context and proceed
    if (user && user.id) {
	console.log("yahoo midleware reached")
      c.set('userId', user.id);
      await next();
    } else {
      c.status(403);
      return c.json({ message: "You are not logged in, invalid token" });
    }
  } catch (error) {
    console.error("Token verification failed", error);
    c.status(403);
    return c.json({ message: "You are not logged in, token verification failed" });
  }
});


blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

try {
		const body = await c.req.json();

		const success = createPostInput.safeParse(body)
		if(!success){
			c.status(411);
			return c.json({message: "input is not correct"})
		}

		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId
			}
		});
		return c.json({
			id: post.id
		});
} catch (error) {
	console.log("an error occured while creating the post", error)
	return c.json({error: "an error has been occurred while creating"})
}
})


  // todo: add pagination
 
blogRouter.get('/bulk', async(c:CustomContext)=>{

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  
try {
const posts = await prisma.post.findMany({
	select:{
		id:true,
		title:true,
		content:true,
		pulishedDate:true,
		author:{
			select:{
				username:true,
			}
		}
	}
})
return c.json({posts: posts})
} catch (error) {
c.status(405)
console.log("content not found", error)
return c.json({error:"posts are not found"})

}

})  


blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

try {
		const body = await c.req.json();

		console.log("this is the body of the put request", body)

		const success = updatePostInput.safeParse(body);
		if(!success){
			c.status(411);
			return c.json({message: "input is not correct"})
		}

		const post = await prisma.post.update({
			where: {
				id: body.id,
				authorId: userId
			},
			data: {
				title: body.title,
				content: body.content
			}
		});
	
		console.log(post)
		return c.json({updatedPost: post});
} catch (error) {
	console.log("an error occured while updating the post", error)
	return c.json({error: "an error has been occurred while updating"})
}
});
  
blogRouter.get('/:id', async (c) => {
	const id =c.req.param('id');
  console.log("this is the id",id)
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	try {
    const post = await prisma.post.findFirst({
    		where: {
          // @ts-ignore
    			id: id
    		}
    	});
    	return c.json(post);
  } catch (error) {
    console.log(error);
    return c.json("error has occured while fetching a post")
  }
})


  
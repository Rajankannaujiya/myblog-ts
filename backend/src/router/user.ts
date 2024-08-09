import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign } from "hono/jwt";
import { signInInput, signUpInput } from "@rajan108/medium-blog-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  variables: {
    userId: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());
  console.log("I reach here");

  try {
    const body = await c.req.json();
    console.log(body);
    const success = signUpInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({ message: "input is not correct" });
    }
    const user = await prisma.user.create({
      data: {
        username:body.username,
        email:body.email,
        password: body.password,
      },
    });
    console.log(user);

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
    return c.json({ id: user.id ,jwt: jwt });
  } catch (error) {
    c.status(411)
    console.log("this is the error", error);
    return c.json({ msg: "an error has been occured while signing up" });
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const success = signInInput.safeParse(body);

    if (!success) {
      c.status(411);
      return c.json({ message: "input is not correct" });
    }
    console.log(body)

    const user =await prisma.user.findUnique({
      where: {
        email: body.email,
        password:body.password
      },
    });
    

    if (!user) {
      c.status(403);
      return c.json({ msg: "no user have been found with the given emaild" });
    }
// @ts-ignore
    const jwt = await sign({ id: user.id}, c.env.JWT_SECRET);
    // @ts-ignore
    return c.json({ jwt: jwt });
  } catch (error) {
    console.log(error);
    return c.json({ msg: "an error has been occured while loging" });
  }
});

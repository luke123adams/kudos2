import { json, createCookieSessionStorage, redirect } from "@remix-run/node";
import { prisma } from "./prisma.server";
import type { RegisterForm, LoginForm } from "./types.server";
import { createUser } from "./users.server";
import bcrypt from 'bcryptjs'

const secret = process.env.SESSION_SECRET;
if (!secret) {
    throw new Error("SESSION_SECRET is not set")
}

const storage = createCookieSessionStorage({
    cookie: {
        name: 'kudos-session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [secret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true,

    },
});

export const register = async (user: RegisterForm) => {
const exists = await prisma.user.count({ where: { email: user.email}})

if ( exists ) {
    return json(
        { error: 'User already exists with that email'},
        { status: 400 }
    );
}

const newUser = await createUser(user)
if ( !newUser ) {
    return json({
        error: 'Something went wrong trying to create a new user',
        fields: { email: user.email, password: user.password },
    },
    {
        status: 400,
    }
    )
}
return createUserSession(newUser.id, '/');
};

export const login = async ({ email, password }: LoginForm) => {


    const user = await prisma.user.findUnique({
        where: { email }
    });

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return json({ error: 'Incorrect login'}, { status: 400 });
    }
    return createUserSession(user.id, '/');

};

export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
      headers: {
        'Set-Cookie': await storage.commitSession(session),
      },
    })
  }
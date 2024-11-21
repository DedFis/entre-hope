import { NextResponse } from 'next/server'
import { currentUser, auth } from '@clerk/nextjs/server'

export async function GET() {
  // Get the userId from auth() -- if null, the user is not signed in
  const { userId } = await auth()

  console.log(userId);

  if (!userId) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 401 })
  }

  // Get the Backend API User object when you need access to the user's information
  // const user = await currentUser()

  // console.log(user);

  // Perform your Route Handler's logic with the returned user object

  return NextResponse.json({ userId: userId }, { status: 200 })
}
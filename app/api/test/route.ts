import { connectToDatabase } from '@/lib/database';
import { createUser } from '@/lib/actions/user.actions';
import User from '@/lib/database/models/user.model';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  if (req.method !== 'POST') {
    return NextResponse.json({ message: 'Method Not Allowed', status: 405 });
  }

  try {
    const data = await req.json();
    const user = data.user;

    // Create the user
    const newUser = await createUser(user);

    return NextResponse.json({ message: 'OK', user: newUser, status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Internal Server Error', error, status: 500 });
  }
}
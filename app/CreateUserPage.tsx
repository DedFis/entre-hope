"use client"

import React, { useState } from 'react';

type ApiResponse = {
    message?: string;
    error?: string;
    [key: string]: any; // Allows additional fields for flexibility
};

const CreateUserPage = () => {
  const [response, setResponse] = useState<ApiResponse | null>(null);

  const handleCreateUser = async () => {
    const user = {
      clerkId: "1",
      firstName: "Poop",
      lastName: "Poop",
      username: "Poop",
      email: "medy.gunawan@binus.ac.id",
      photo: "Bruh",
    };

    try {
      const res = await fetch('/api/test', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({user}),
      });

      const data = await res.json();
      setResponse(data);
    } catch (error) {
      console.error('Error creating user:', error);
      setResponse({ error: 'Failed to create user' });
    }
  };

  return (
    <div>
      <button onClick={handleCreateUser}>Create User</button>
      {response && <pre>{JSON.stringify(response, null, 2)}</pre>}
    </div>
  );
};

export default CreateUserPage;

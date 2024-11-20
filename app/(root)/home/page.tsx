"use client"

import React, { useState, useEffect } from 'react'

import { DisplayCampaigns } from '../../../components/ui';
import { useStateContext } from '../../../context'
import { SearchParamProps } from '@/types';

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getCampaigns } = useStateContext();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      
      const data = await getCampaigns({
        params: { id: "" },
        searchParams: { query: "", page: String(1) },
      });
      
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return (
    <DisplayCampaigns 
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  )
}

export default Home

// import React from 'react'
// import { connectToDatabase } from '@/lib/database'
// import User from '@/lib/database/models/user.model';
// import CreateUserPage from './CreateUserPage';

// const page = () => {
//   type CreateUserParams = {
//     clerkId: string
//     firstName: string
//     lastName: string
//     username: string
//     email: string
//     photo: string
//   }

//   const user: CreateUserParams = {
//     clerkId: "1",
//     firstName: "Poop",
//     lastName: "Poop",
//     username: "Poop",
//     email: "medy.gunawan@binus.ac.id",
//     photo: "Bruh"
//   }

//   const createTest = async (params:CreateUserParams) => {
//     await connectToDatabase();
//     const newUser = await User.create(params);
//     return newUser;
//   }

//   return (
//     <div>
//       <CreateUserPage>

//       </CreateUserPage>
//     </div>
//     // (createTest(user))
//   )
// }

// export default page
"use client"

import React, { useContext, createContext } from 'react';
import { useAuth } from '@clerk/nextjs'
import { createCampaign, getAllCampaigns } from '@/lib/actions/campaign.actions';
import { getUserByClerkId } from '@/lib/actions/user.actions';
import { SearchParamProps } from '@/types';

interface StateContextType {
    createCampaign: (form: CampaignForm) => Promise<void>;
    getCampaigns: (props: SearchParamProps) => Promise<any>;
}

const StateContext = createContext<StateContextType | null>(null);

interface CampaignForm {
  name: string;
  title: string;
  description: string;
  target: string;
  deadline: string;
  image: string;
}

export const StateContextProvider = ({ children } : { children : React.ReactNode }) => {
    const publishCampaign = async (form: CampaignForm) => {
        try {
            console.log(form);

            const res = await fetch('/api/webhook/clerk/user', {
              method: 'GET',
              headers: { 'content-type': 'application/json' },
            });
      
            const resData = await res.json();

            const userId = resData.user.id;
            
            const campaign = {
                owner : userId,
                title: form.title, // title
                description: form.description, // description
                target: Number.parseInt(form.target),
                deadline: new Date(form.deadline), // deadline,
                image: form.image,
            };
            
            console.log(campaign);

            const data = await createCampaign({
                userId: userId, //Owner
                campaign: campaign,
                path: '/'
            });

            console.log("contract call success", data)
        } catch (error) {
            console.log("contract call failure", error)
        }
  }

  const getCampaigns = async ({ searchParams }: SearchParamProps) => {
    // query: string, page: number, limit: number
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || '';
    
    const campaigns = await getAllCampaigns({query: searchText, limit: 0, page});

    if (campaigns) {
        const parsedCampaings = campaigns?.data

        // const parsedCampaings = campaigns.map((campaign, i) => ({
        //   owner: campaign.owner,
        //   title: campaign.title,
        //   description: campaign.description,
        //   target: campaign.target.toString(),
        //   deadline: campaign.deadline.toNumber(),
        //   amountCollected: campaign.amountCollected.toString(),
        //   image: campaign.image,
        //   pId: i
        // }));
    
        return parsedCampaings;
    }
  }

//   const getUserCampaigns = async () => {
//     const allCampaigns = await getCampaigns();

//     const filteredCampaigns = allCampaigns.filter((campaign) => campaign.owner === address);

//     return filteredCampaigns;
//   }

//   const donate = async (pId, amount) => {
//     const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

//     return data;
//   }

//   const getDonations = async (pId) => {
//     const donations = await contract.call('getDonators', [pId]);
//     const numberOfDonations = donations[0].length;

//     const parsedDonations = [];

//     for(let i = 0; i < numberOfDonations; i++) {
//       parsedDonations.push({
//         donator: donations[0][i],
//         donation: ethers.utils.formatEther(donations[1][i].toString())
//       })
//     }

//     return parsedDonations;
//   }


  return (
    <StateContext.Provider
      value={{ 
        // address,
        // contract,
        // connect,
        createCampaign: publishCampaign,
        getCampaigns,
        // getUserCampaigns,
        // donate,
        // getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error("useStateContext must be used within a StateContextProvider");
  }

  return context;
};
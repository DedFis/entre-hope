"use client";

import React, { useContext, createContext } from "react";
import { useRouter } from "next/navigation";
import {
  createCampaign,
  getAllCampaigns,
  getDonators,
  addDonation,
  getCampaignById,
  getCampaignsByUser,
} from "@/lib/actions/campaign.actions";
import { Donator, SearchParamProps } from "@/types";

interface StateContextType {
  createCampaign: (form: CampaignForm) => Promise<any | null>;
  getCampaigns: (props: SearchParamProps) => Promise<any>;
  donate: (campaignId: string, amount: string) => Promise<any>;
  getDonations: (campaignId: string) => Promise<any>;
  getUserCampaigns: () => Promise<any>;
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

export const StateContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const router = useRouter();

  const publishCampaign = async (form: CampaignForm) => {
    try {
      const res = await fetch("/api/webhook/clerk/user", {
        method: "GET",
        headers: { "content-type": "application/json" },
      });

      const resData = await res.json();

      if (resData.error) {
        alert('Please Sign In before Creating a Campaign.');
        router.push('/');
        return null;
      }

      const userId = resData.user.id;

      const campaign = {
        owner: userId,
        title: form.title, // title
        description: form.description, // description
        target: Number.parseInt(form.target),
        deadline: new Date(form.deadline), // deadline,
        image: form.image,
      };

      const data = await createCampaign({
        userId: userId, //Owner
        campaign: campaign,
        path: "/",
      });

      console.log("contract call success", data);
    } catch (error) {
      console.log("contract call failure", error);
    }
  };

  const getCampaigns = async ({ searchParams }: SearchParamProps) => {
    // query: string, page: number, limit: number
    const page = Number(searchParams?.page) || 1;
    const searchText = (searchParams?.query as string) || "";

    const campaigns = await getAllCampaigns({
      query: searchText,
      limit: 0,
      page,
    });

    if (campaigns) {
      const parsedCampaings = campaigns?.data;

      return parsedCampaings;
    }
  };

  const getUserCampaigns = async () => {
    const page = 1;

    const userResponse = await fetch("/api/webhook/clerk/user", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const userData = await userResponse.json();

    if (userData.error) {
      alert('Please Sign In first.');
      return null;
    } else {
      const userId = userData.user.id;
  
      const campaigns = await getCampaignsByUser({
        userId: userId,
        limit: 0,
        page
      });
  
      if (campaigns) {
        const parsedCampaings = campaigns?.data;
  
        return parsedCampaings;
      }
    }
  };

  const generateDonationID = (userId: string) => {
    const timestamp = Date.now();

    return `${userId}-${timestamp}`;
  };

  const addDonationToDB = async (
    campaignId: string,
    userId: string,
    amount: string
  ) => {
    const data = await addDonation(campaignId, userId, amount);

    return data;
  };

  const donate = async (campaignId: string, amount: string) => {
    // const data = await contract.call('donateToCampaign', [pId], { value: ethers.utils.parseEther(amount)});

    const userResponse = await fetch("/api/webhook/clerk/user", {
      method: "GET",
      headers: { "content-type": "application/json" },
    });

    const userData = await userResponse.json();

    if (userData.error) {
      alert('Please Sign In before Donating.');
      return null;
    }

    const userId = userData.user.id;

    const donationId = generateDonationID(userId);

    const campaign = await getCampaignById(campaignId);

    const paymentParams = {
      id: donationId,
      campaignId: campaignId,
      name: campaign.title,
      amount: amount,
    };

    const paymentResponse = await fetch("/api/midtrans/tokenizer", {
      method: "POST",
      body: JSON.stringify(paymentParams),
    });

    const paymentData = await paymentResponse.json();

    let data;

    // window.snap.pay(paymentData.token);
    (window as any).snap.pay(paymentData.token, {
      onSuccess: () => {
        data = addDonationToDB(campaignId, userId, amount);
      },
      onPending: () => {
        data = addDonationToDB(campaignId, userId, amount);
      },
    });

    return data;
  };

  const getDonations = async (campaignId: string): Promise<Donator[]> => {
    const donations = await getDonators(campaignId);

    const numberOfDonations = donations?.donations.length || 0;

    const parsedDonations: Donator[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations?.donators[i],
        donation: donations?.donations[i].toString(),
      });
    }

    return parsedDonations;
  };

  return (
    <StateContext.Provider
      value={{
        // address,
        // contract,
        // connect,
        createCampaign: publishCampaign,
        getCampaigns,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error(
      "useStateContext must be used within a StateContextProvider"
    );
  }

  return context;
};

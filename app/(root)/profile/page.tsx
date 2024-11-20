"use client"

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { DisplayCampaigns } from "@/components/ui";
import { useStateContext } from "@/context";

const Profile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const { getUserCampaigns } = useStateContext();

  const initialized = useRef(false);
  const router = useRouter();

  const fetchCampaigns = async () => {
    setIsLoading(true);
    try {
      
      const data = await getUserCampaigns();

      if(data === null) {
        router.push('/home');
        return null;
      }
      
      setCampaigns(data);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if(!initialized.current) {
        initialized.current = true;
        fetchCampaigns();
    }
  }, []);

  return (
    <DisplayCampaigns
      title="All Campaigns"
      isLoading={isLoading}
      campaigns={campaigns}
    />
  );
};

export default Profile;

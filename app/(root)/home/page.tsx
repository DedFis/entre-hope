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
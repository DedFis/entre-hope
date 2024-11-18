"use client"

import React from 'react';
import { v4 as uuidv4 } from "uuid";
import FundCard from './FundCard';
import { loader } from '../../public';
import { useRouter } from 'next/navigation';


interface Campaign {
  owner: string;
  title: string;
  description: string;
  target: string | number;
  deadline: string;
  amountCollected: string | number;
  image: string;
}

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: Campaign[];
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ title, isLoading, campaigns }) => {
  const router = useRouter();

  const createQueryString = (name: string, value: Campaign) => {
    const params = new URLSearchParams();
    params.set(name, JSON.stringify(value));

    return params.toString();
  };

  const handleNavigate = (campaign: Campaign) => {
    router.push(`/campaign-details/${campaign.title}` + "?" + createQueryString("campaign", campaign))
  }
  
  return (
    <div>
      <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">{title} ({campaigns.length})</h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        {isLoading && (
          <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
        )}

        {!isLoading && campaigns.length === 0 && (
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            You have not created any campigns yet
          </p>
        )}

        {!isLoading && campaigns.length > 0 && campaigns.map((campaign) => <FundCard 
          key={uuidv4()}
          {...campaign}
          handleClick={() => handleNavigate(campaign)}
        />)}
      </div>
    </div>
  )
}

export default DisplayCampaigns
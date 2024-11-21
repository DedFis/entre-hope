"use client";

import React from "react";
import { CustomButton } from "@/components/ui";
import { useRouter } from "next/navigation";
import { aboutUs } from '../public'
import Image from "next/image";

const DonationPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="bg-dark-bg text-white text-center min-h-screen p-6">
      <h1 className="text-xl text-start font-semibold mb-5">About us</h1>
      <section className="justify-center mb-20">
        <div className="">
          <img src={aboutUs.src} alt="banner" className="w-full h-[355px] object-cantain rounded-xl" />
        </div>
        <div className="w-full flex items-center justify-center mt-20">
          <p className="text-lg w-4/5 font-semibold">
            "A web-based online platform where people can donate funds for development needs, such as poorly Infrastructures, etc. People can provide case reports so that we who maintain the web can provide event donations (after inspecting the repairs needed) to work on the project."
          </p>
        </div>
      </section>
      <div className="border border-[#4E4E5B] rounded-md text-center p-4 mb-10 bg-[#1C1C24]">
        <h2 className="text-3xl font-semibold mb-2">Join Our Campaign</h2>
        <p className="mb-4 font-semibold">Join the campaign and make an impact today.</p>
        <CustomButton
          btnType="submit"
          title="View Campaign"
          styles="bg-[#1dc071]"
          handleClick={() => {
            router.push("/");
          }}
        />
      </div>
      <section>
        <h2 className="text-3xl font-semibold mt-20 mb-20">What Makes Us Different</h2>
        <div className="w-full flex items-center justify-center">
          <p className="text-lg w-4/5 font-semibold">
            "We’re focused on solving infrastructure problems needed by the community, which are often ignored by other charity companies, with real results in the form of physical materials, not just general fundraising, and running projects independently without government involvement to ensure fast execution."
          </p>
        </div>
      </section>
    </div>
  );
};

export default DonationPage;

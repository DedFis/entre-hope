"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

// import { useStateContext } from '../../context';
import CustomButton from './CustomButton';
import { logo, menu, search, thirdweb } from '../../public';
import { navlinks } from '../../constants';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import Link from 'next/link';

const Navbar: React.FC = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState<string>('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-between mb-[35px] gap-6">
      <div className="lg:flex-1 flex flex-row max-w-[458px] py-2 pl-4 pr-2 h-[52px] bg-[#1c1c24] rounded-[100px]">
        <input
          type="text"
          placeholder="Search for campaigns"
          className="flex w-full font-epilogue font-normal text-[14px] placeholder:text-[#4b5264] text-white bg-transparent outline-none"
        />
        <div className="w-[72px] h-full rounded-[20px] bg-[#4acd8d] flex justify-center items-center cursor-pointer">
          <img src={search.src} alt="search" className="w-[15px] h-[15px] object-contain" />
        </div>
      </div>

      <div className="sm:flex hidden flex-row justify-end gap-4">
        <SignedOut>
          <CustomButton
            btnType="button"
            title={'Sign In'}
            styles={'bg-[#8c6dfd]'}
            handleClick={() => {
              // if (address) router.push('/create-campaign');
              router.push('/sign-in');
              // else connect();
            }}
          />
        </SignedOut>

        <SignedIn>
          <CustomButton
            btnType="button"
            // title={address ? 'Create a campaign' : 'Connect'}
            title={'Create a campaign'}
            // styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            styles={'bg-[#1dc071]'}
            handleClick={() => {
              // if (address) router.push('/create-campaign');
              router.push('/create-campaign');
              // else connect();
            }}
          />
        </SignedIn>

        <Link href={'/profile'}>
          <div className="w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer">
            {/* onClick={() => router.push('/profile')} */}
            <img src={thirdweb.src} alt="user" className="w-[60%] h-[60%] object-contain" />
          </div>
        </Link>
      </div>

      {/* Small screen navigation */}
      <div className="sm:hidden flex justify-between items-center relative">
        <div className="w-[40px] h-[40px] rounded-[10px] bg-[#2c2f32] flex justify-center items-center cursor-pointer">
          <img src={logo} alt="user" className="w-[60%] h-[60%] object-contain" />
        </div>

        <img
          src={menu}
          alt="menu"
          className="w-[34px] h-[34px] object-contain cursor-pointer"
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div
          className={`absolute top-[60px] right-0 left-0 bg-[#1c1c24] z-10 shadow-secondary py-4 ${
            !toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'
          } transition-all duration-700`}
        >
          <ul className="mb-4">
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#3a3a43]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  router.push(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${
                    isActive === link.name ? 'grayscale-0' : 'grayscale'
                  }`}
                />
                <p
                  className={`ml-[20px] font-epilogue font-semibold text-[14px] ${
                    isActive === link.name ? 'text-[#1dc071]' : 'text-[#808191]'
                  }`}
                >
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className="flex mx-4">
            <SignedOut>
              <CustomButton
                btnType="button"
                title={'Sign In'}
                styles={'bg-[#8c6dfd]'}
                handleClick={() => {
                  // if (address) router.push('/create-campaign');
                  router.push('/sign-in');
                  // else connect();
                }}
              />
            </SignedOut>

            <SignedIn>
              <CustomButton
                btnType="button"
                // title={address ? 'Create a campaign' : 'Connect'}
                title={'Create a campaign'}
                // styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
                styles={'bg-[#1dc071]'}
                handleClick={() => {
                  // if (address) router.push('/create-campaign');
                  router.push('/create-campaign');
                  // else connect();
                }}
              />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
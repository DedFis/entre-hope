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
          <img src={aboutUs.src} alt="banner" className="w-full h-[290px] object-cantain rounded-xl" />
        </div>
        <div className="w-full flex items-center justify-center mt-20">
          <p className="text-lg w-4/5 font-semibold">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
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
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat."
          </p>
        </div>
      </section>
    </div>

    // <div className="bg-white py-24 sm:py-32">
    //   <div className="mx-auto max-w-7xl px-6 lg:px-8">
    //     <div className="mx-auto max-w-2xl lg:text-center">
    //       <h2 className="text-base/7 font-semibold text-indigo-600">
    //         Deploy faster
    //       </h2>
    //       <p className="mt-2 text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl lg:text-balance">
    //         Everything you need to deploy your app
    //       </p>
    //       <p className="mt-6 text-lg/8 text-gray-600">
    //         Quis tellus eget adipiscing convallis sit sit eget aliquet quis.
    //         Suspendisse eget egestas a elementum pulvinar et feugiat blandit at.
    //         In mi viverra elit nunc.
    //       </p>
    //     </div>
    //     <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl">
    //       <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
    //         <div className="relative pl-16">
    //           <dt className="text-base/7 font-semibold text-gray-900">
    //             <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
    //               <svg
    //                 className="size-6 text-white"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke-width="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //                 data-slot="icon"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
    //                 />
    //               </svg>
    //             </div>
    //             Push to deploy
    //           </dt>
    //           <dd className="mt-2 text-base/7 text-gray-600">
    //             Morbi viverra dui mi arcu sed. Tellus semper adipiscing
    //             suspendisse semper morbi. Odio urna massa nunc massa.
    //           </dd>
    //         </div>
    //         <div className="relative pl-16">
    //           <dt className="text-base/7 font-semibold text-gray-900">
    //             <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
    //               <svg
    //                 className="size-6 text-white"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke-width="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //                 data-slot="icon"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
    //                 />
    //               </svg>
    //             </div>
    //             SSL certificates
    //           </dt>
    //           <dd className="mt-2 text-base/7 text-gray-600">
    //             Sit quis amet rutrum tellus ullamcorper ultricies libero dolor
    //             eget. Sem sodales gravida quam turpis enim lacus amet.
    //           </dd>
    //         </div>
    //         <div className="relative pl-16">
    //           <dt className="text-base/7 font-semibold text-gray-900">
    //             <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
    //               <svg
    //                 className="size-6 text-white"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke-width="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //                 data-slot="icon"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
    //                 />
    //               </svg>
    //             </div>
    //             Simple queues
    //           </dt>
    //           <dd className="mt-2 text-base/7 text-gray-600">
    //             Quisque est vel vulputate cursus. Risus proin diam nunc commodo.
    //             Lobortis auctor congue commodo diam neque.
    //           </dd>
    //         </div>
    //         <div className="relative pl-16">
    //           <dt className="text-base/7 font-semibold text-gray-900">
    //             <div className="absolute left-0 top-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600">
    //               <svg
    //                 className="size-6 text-white"
    //                 fill="none"
    //                 viewBox="0 0 24 24"
    //                 stroke-width="1.5"
    //                 stroke="currentColor"
    //                 aria-hidden="true"
    //                 data-slot="icon"
    //               >
    //                 <path
    //                   stroke-linecap="round"
    //                   stroke-linejoin="round"
    //                   d="M7.864 4.243A7.5 7.5 0 0 1 19.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 0 0 4.5 10.5a7.464 7.464 0 0 1-1.15 3.993m1.989 3.559A11.209 11.209 0 0 0 8.25 10.5a3.75 3.75 0 1 1 7.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 0 1-3.6 9.75m6.633-4.596a18.666 18.666 0 0 1-2.485 5.33"
    //                 />
    //               </svg>
    //             </div>
    //             Advanced security
    //           </dt>
    //           <dd className="mt-2 text-base/7 text-gray-600">
    //             Arcu egestas dolor vel iaculis in ipsum mauris. Tincidunt mattis
    //             aliquet hac quis. Id hac maecenas ac donec pharetra eget.
    //           </dd>
    //         </div>
    //       </dl>
    //     </div>
    //   </div>
    // </div>
  );
};

export default DonationPage;

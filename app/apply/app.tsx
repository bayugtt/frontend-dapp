'use client'

import React from "react";
import { useState, useEffect, FormEvent } from 'react';
// import { useForm, SubmitHandler } from "react-hook-form"
import { ConnectButton } from "@rainbow-me/rainbowkit";
import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultWallets,
    RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { useAccount, configureChains, createConfig, WagmiConfig, useContractRead, } from 'wagmi';
import {
    mainnet,
    baseGoerli,
} from 'wagmi/chains';
import abi from "../src/contract-abi.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import { publicProvider } from 'wagmi/providers/public';
// import { text } from 'stream/consumers';
import JSONbig from "json-bigint";

const { chains, publicClient } = configureChains(
    [baseGoerli, mainnet],
    [
        publicProvider()
    ]
);
const { connectors } = getDefaultWallets({
    appName: 'DIGIBASE',
    projectId: '9dda031428b39a33392dcbf473ca67b8',
    chains
});
const wagmiConfig = createConfig({
    autoConnect: false,
    connectors,
    publicClient
})




export default function Apply() {


    const [mounted, setMounted] = React.useState(false);
    const { address, isConnected } = useAccount();
    React.useEffect(() => setMounted(true), []);

    const wallet1 = address as string;
    interface balanceOf {
        balance: string;
    }

// cek nakamigos balance of connected wallet
    const data = useContractRead({
        address: '0xd774557b647330c91bf44cfeab205095f7e6c367',
        abi,
        chainId: 1,
        functionName: 'balanceOf',
        args: [wallet1],
    })

    //chain id base-goerli = 84531

    // React.useEffect(() => {
    //     if (balanceOf) {
    //       setBalance(balanceOf as string);
    //     }
    //   }, [balanceOf]);

    //       console.log("ini balanceOf: "+balanceOf)
    //       console.log("ini balance saja: "+balance)


    // Assuming you have the JSON string
    const data1 = JSONbig.stringify(data?.data)
    const [ipValue, setIpValue] = useState<string>(''); // Initialize the state with an empty string

    useEffect(() => {
        async function fetchIP() {
            try {
                const response = await fetch('api/api');
                const text1 = await response.text();

                // Update the state with the fetched IP value
                setIpValue(text1);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        fetchIP(); // Call the fetchIP function when the component mounts
    }, []);


    const [twitter, setTwitter] = useState('');
    const [retweet, setRetweet] = useState('');
    const [burn, setBurn] = useState('');
    const [submitting, setSubmitting] = useState(false); // Track the submitting state
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
        // Create the form data object
        const form = {
            wallet1,
            twitter,
            retweet,
            burn,
            ipValue,
            data1,
        };

        try {
            await toast.promise(
                fetch('/api/submit', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(form),
                }).then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to submit form');
                    }
                    return response.json();
                }),
                {
                    pending: 'Confirming...', // Message shown while the promise is pending
                    success: 'Thank you, We gotchu', // Success message shown after promise resolves
                    error: 'We are doing wrong right now', // Error message shown after promise rejects
                }
            );

            // Reset the form fields after successful API call
            setTwitter('');
            setRetweet('');
            setBurn('');

            setSuccess(true); // Set the success state to true on successful form submission
            setSubmitting(false); // Set the submitting state back to false
        } catch (error) {

        }
    };



    //   // Call the fetchData function to initiate the data fetching process
    //   fetchIP();


    // The empty dependency array ensures the effect runs only once on mount
    //    const datas = data.data
    // // const punya = balanceOf.JSON.parse()
    // console.log("ini set data?.data : " + data?.data)
    // console.log("ini datas : " + datas)
    // const token:number = balanceOf



    // const formString = JSON.stringify({
    //     ...form,
    //     balanceOf: form.balanceOf.toString(),
    //   });



    // const {
    //     register,
    //     handleSubmit,
    //     reset,
    //     formState: { errors }, // catch error messages
    // } = useForm();



    // const [data, setData] = useState<Data | null>(null);

    // useEffect(() => {
    //   fetch('/api/api')
    //     .then((response) => response.json())
    //     .then((responseData) => setData(responseData))
    //     .catch((error) => console.error('Error fetching data:', error));
    // }, []);



    return (


        <div id="wrapper">
            <main id="main">
                <div className="inner">
                    {/* container full page */}
                    <div id="container" className="style5 container default">
                        <div className="wrapper">
                            <div className="inner">
                                <h1 id="text01" className="style3">
                                    DIGIBASE </h1>
                                <h2
                                    id="text03"
                                    className="style3 leading-relaxed"
                                    style={{ opacity: 1, transform: "none" }}
                                >
                                    Apply for Early Access
                                </h2>


                            </div>



                            <ul id="buttons02" className="style1 buttons">
                                <li style={{ opacity: 1, transform: "none" }}>
                                    <a id="text03" className="style1">
                                        <span className="label style7">
                                            <WagmiConfig config={wagmiConfig}>
                                                <RainbowKitProvider modalSize="compact" chains={chains} initialChain={baseGoerli}>
                                                    <ConnectButton
                                                        accountStatus={{
                                                            smallScreen: "address",
                                                            largeScreen: "full",
                                                        }}
                                                        chainStatus="none"
                                                        showBalance={false}
                                                    />
                                                </RainbowKitProvider>
                                            </WagmiConfig>


                                        </span>
                                    </a>
                                </li>
                            </ul>


                            {mounted && isConnected ? (
                                <div className="inner m-12px">
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div className="border-b border-gray-900/10 pb-12">
                                                <h3 className="style2 text02 font-semibold leading-7">You own {data1} Nakamigos</h3>
                                                <p id="text02" className="style2 pb-5">Don't be Fret if your are not holding Nakamigos, we still have allocation raffle for you</p>
                                                






                                                <div className="sm:col-span-4">
                                                    <label htmlFor="twitter" className="block text-sm font-medium leading-6 text03"><p id="text02" className="style2">Twitter username</p></label>
                                                    <div className="mt-2">
                                                        <div className="flex min-w-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
                                                            <span className="flex select-none items-center pl-3 text-white sm:text-sm">twitter.com/&nbsp;</span>
                                                            <input required type="text" value={twitter} onChange={e => setTwitter(e.target.value)} name="username" id="username" autoComplete="username" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="digibase" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label htmlFor="retweet" className="block text-sm font-medium leading-6 "><p id="text02" className="style2">Retweet our pinned tweet</p></label>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
                                                            <input required type="text" value={retweet} onChange={e => setRetweet(e.target.value)} name="retweet" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="twitter.com/digibase/status/abc" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="sm:col-span-4">
                                                    <label htmlFor="burn" className="block text-sm font-medium leading-6 "><p id="text02" className="style2">Use burner wallet?</p></label>
                                                    <div className="mt-2">
                                                        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
                                                            <input type="text" value={burn} onChange={e => setBurn(e.target.value)} name="wallet" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="(optional)" />
                                                        </div>
                                                    </div>
                                                </div>





                                                <div className="sm:col-span-4">
                                                    <div className="mt-2">
                                                        <div className="inner" data-position="center">
                                                            <ul id="buttons02" className="style1 buttons">
                                                                <li style={{ opacity: 1, transform: "none" }}>
                                                                    <a className="button n01">
                                                                        {success ? (
                                                                            <span>Confirmed!</span> // Show success message after successful form submission
                                                                        ) : (
                                                                            <button type="submit" disabled={submitting}>
                                                                                {submitting ? 'Submitting...' : 'Submit'}
                                                                            </button> // Show the "Submit" button while not submitting or showing success message
                                                                        )}
                                                                    </a>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <ToastContainer role="alert" position="bottom-right" limit={1} toastClassName={"bg-blue-400/20 text-white text-strong hover:blue-900"} />
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                    </form>



                                    <div className="wrapper">
                                        <ul id="buttons02" className="style1 buttons">
                                            <li style={{ opacity: 1, transform: "none" }}>

                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            ) : <div><h3 id="text02" className="style2 font-semibold">You need to connect your wallet first!</h3></div>}


                        </div>


                    </div>


                </div>
            </main >
        </div >
    );
}
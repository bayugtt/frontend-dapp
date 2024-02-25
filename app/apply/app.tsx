'use client'
import React from "react";
import { useState, useEffect, FormEvent } from 'react';
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
    base,
    bsc,
    polygon,
} from 'wagmi/chains';
import abi from "../src/abi-base.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { publicProvider } from 'wagmi/providers/public';
import JSONbig from "json-bigint";
import Accordion from "../components/faq1";

const { chains, publicClient } = configureChains(
    [baseGoerli, mainnet, base, bsc, polygon],
    [
        publicProvider()
    ]
);
const { connectors } = getDefaultWallets({
    appName: 'digibase',
    projectId: '96ab49311472829887a0342f28a33171',
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
        address: '0xD4307E0acD12CF46fD6cf93BC264f5D5D1598792',
        abi,
        chainId: 1,
        functionName: 'balanceOf',
        args: [wallet1],
    })

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
    const [referralLink, setReferralLink] = useState('');
    const [submitting, setSubmitting] = useState(false); // Track the submitting state
    const [success, setSuccess] = useState(false);
    const [referralValue, setReferralValue] = useState('');

    useEffect(() => {
        // Parse the current URL to get the query parameters
        const urlParams = new URLSearchParams(window.location.search);
        // Get the value of the "ref" parameter
        const refParam = urlParams.get('ref');

        if (refParam) {
            // Update the state with the extracted referral value
            setReferralValue(refParam);
        }
    }, []);


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);
      
        // Create the referral link using the extracted username
        const generatedReferralLink = `https://digibaseart.xyz/apply?ref=${twitter}`;
        // Set the referral link in the state
        setReferralLink(generatedReferralLink);
        // Create the form data object
        const form = {
          wallet1,
          twitter,
          retweet,
          burn,
          ipValue,
          data1,
          referralValue,
        }
        
        try {
          await toast.promise(
            fetch('/api/submit', {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer hsdjbeliwu&$sfknfsa2rp29734ry2`, // Include the API key in the Authorization header
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
          // Handle error
        }
      };


    // share button on Twitter
    const handleTwitterClick = () => {
        // Construct the Twitter share URL with the referral link
        const twitterShareURL = `https://twitter.com/intent/tweet?text=🔥 Get Ahead of the Crowd! 🔑 Secure your spot for early access of @Digibaseart upcoming free mint 🚀 %23BASE %23DIGIBASE ${referralLink}`;
        // Open a new window to share on Twitter
        window.open(twitterShareURL, '_blank');
    };

    const handleCopyClick = () => {
        navigator.clipboard.writeText(referralLink)
            .then(() => {
                toast.success('Referral link copied');
            })
            .catch(() => {
                toast.error('An error occurred while copying to clipboard.');
            });
    };

    // FAQ ON BELOW APPLY
    return (
        <div id="wrapper">
            <main id="main">
                <div className="inner">
                    {/* container full page */}
                    <div id="container" className="style5 container default">
                        <div className="wrapper">
                            <div className="inner">
                                <h1 id="text01" className="style3">
                                    <a href="/">DIGIBASE</a></h1>
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
                                                <RainbowKitProvider modalSize="compact" chains={chains} initialChain={mainnet || base}>
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
                                <div className="inner">
                                    <form onSubmit={handleSubmit}>
                                        <div className="space-y-4">
                                            <div className="border-b border-blue-900/10">
                                                <p className="style2 text02 font-semibold leading-7">You own {data1} <a href="https://etherscan.io/address/0xd4307e0acd12cf46fd6cf93bc264f5d5d1598792" target="_blank" title="Contract Address: 0xD4307E0acD12CF46fD6cf93BC264f5D5D1598792">Base, Introduced</a>
                                                    <br />Be among the first 500 to secure your guaranteed Early Access.
                                                </p>


                                                <div className="sm:col-span-4">
    <label htmlFor="username" className="block text-sm font-medium leading-6 text03">
        <p id="text02" className="style2">
            Follow us <a className="inline" href="https://twitter.com/Digibaseart" target="_blank">@Digibaseart</a>
        </p>
    </label>
    <div className="mt-2">
        <div className="flex min-w-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
            <span className="flex select-none items-center pl-3 text-white sm:text-sm">twitter.com/&nbsp;</span>
            <input
                required
                type="text"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                name="username"
                id="username"
                autoComplete="username"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Your Twitter username"
            />
        </div>
    </div>
</div>

<div className="sm:col-span-4">
    <label htmlFor="retweet" className="block text-sm font-medium leading-6 ">
        <p id="text02" className="style2">
            Like & Retweet our tweet<a className="inline" href="https://twitter.com/Digibaseart/status/1693259118470111429" target="_blank"> here</a>
        </p>
    </label>
    <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
            <input
                required
                type="text"
                value={retweet}
                onChange={(e) => setRetweet(e.target.value)}
                name="retweet"
                id="retweet"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Paste your retweet link here"
            />
        </div>
    </div>
</div>

<div className="sm:col-span-4">
    <label htmlFor="burn" className="block text-sm font-medium leading-6 ">
        <p id="text02" className="style2">Use burner wallet?</p>
    </label>
    <div className="mt-2">
        <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
            <input
                type="text"
                value={burn}
                onChange={(e) => setBurn(e.target.value)}
                name="wallet"
                id="burn"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="(optional)"
            />
        </div>
    </div>
</div>

<div className="sm:col-span-4">
    <label htmlFor="referralValue" className="block text-sm font-medium leading-6 ">
        <p id="text02" className="style2">Referral code?</p>
    </label>
    <div className="mt-2">
        <div className="flex min-w-500 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w">
            <input
                type="text"
                value={referralValue}
                onChange={(e) => setReferralValue(e.target.value)}
                name="red"
                id="referralValue"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="(optional)"
            />
        </div>
    </div>
</div>


                                                <div className="mt-4 text-white font-bold py-1 px-3 rounded">

                                                    {success ? (
                                                        <ul id="buttons02" className="style1 buttons">
                                                            <li style={{ opacity: 1, transform: "none" }}>
                                                                <a title="Share on Twitter!" onClick={handleTwitterClick} className="button n01 cursor-pointer ">

                                                                    <svg
                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                        className="h-5 w-5"
                                                                        fill="currentColor"
                                                                        viewBox="0 0 24 24"
                                                                    >
                                                                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                                                    </svg>
                                                                    <span > Share on Twitter!</span>
                                                                </a>
                                                                <a> {referralLink}
                                                                    <span className="p-2">
                                                                        <svg xlinkTitle="Copy referral link" className="cursor-pointer" onClick={handleCopyClick} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0,0,256,256"> <title>Copy to Clipboard</title><defs><clipPath id="clip-1"><path d="M0,256v-256h256v256zM185.10629,102.80229c-4.992,-4.992 -12.05943,-7.85829 -19.392,-7.85829c-7.33257,0 -14.4,2.86629 -19.392,7.85829l-6.14857,6.15314c-1.664,1.664 -2.58743,3.86286 -2.67429,6.11657c-3.50629,1.36229 -6.72457,3.45143 -9.46286,6.19429l-9.14286,9.14286c-5.184,5.17486 -8.03657,12.064 -8.03657,19.392c0,7.328 2.85257,14.21714 8.03657,19.39657c4.992,4.992 12.05943,7.85829 19.392,7.85829c7.33257,0 14.4,-2.86629 19.392,-7.85829l6.14857,-6.14857c1.664,-1.664 2.58743,-3.86286 2.66971,-6.12114c3.51086,-1.36229 6.72457,-3.45143 9.46743,-6.18971l9.14286,-9.14286c5.184,-5.17943 8.03657,-12.06857 8.03657,-19.39657c0,-7.328 -2.85257,-14.21714 -8.03657,-19.39657z" id="overlayBgMask" fill="none"></path></clipPath></defs><g fill-opacity="0" fill="#dddddd" fillRule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" className="mix-blend-mode: normal"><path d="M0,256v-256h256v256z" id="bgRectangle"></path></g><g clip-path="url(#clip-1)" fill="none" fillRule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" className="mix-blend-mode: normal"><g transform="translate(40.8,-8) scale(8,8)" fill="#000000"><path d="M10,1c-0.55228,0 -1,0.44772 -1,1c0,0.55228 0.44772,1 1,1h14c0.55208,0.0005 0.9995,0.44792 1,1v22c0,0.55228 0.44772,1 1,1c0.55228,0 1,-0.44772 1,-1v-22c-0.00182,-1.6561 -1.3439,-2.99818 -3,-3zM8,5c-1.6561,0.00182 -2.99818,1.3439 -3,3v20c0.00182,1.6561 1.3439,2.99818 3,3h12c1.6561,-0.00182 2.99818,-1.3439 3,-3v-20c-0.00182,-1.6561 -1.3439,-2.99818 -3,-3zM8,7h12c0.55208,0.0005 0.9995,0.44792 1,1v20c-0.00033,0.55215 -0.44785,0.99967 -1,1h-12c-0.55215,-0.00033 -0.99967,-0.44785 -1,-1v-20c0.0005,-0.55208 0.44792,-0.9995 1,-1z"></path></g></g><g fill="#000000" fillRule="nonzero" stroke="none" stroke-width="1" stroke-linecap="butt" stroke-linejoin="miter" stroke-miterlimit="10" stroke-dasharray="" stroke-dashoffset="0" font-family="none" font-weight="none" font-size="none" text-anchor="none" className="mix-blend-mode: normal"><g transform="translate(120,103.91229) scale(4.57143,4.57143)" id="overlay"><path d="M14,4c0,1.068 -0.416,2.073 -1.172,2.828l-2,2c-0.755,0.756 -1.76,1.172 -2.828,1.172c-0.598,0 -1.176,-0.13 -1.702,-0.378c-0.635,-0.299 -0.791,-1.13 -0.295,-1.626l0.001,-0.001c0.305,-0.305 0.762,-0.364 1.156,-0.189c0.739,0.327 1.666,0.196 2.253,-0.392l1.951,-1.951c0.359,-0.359 0.6,-0.83 0.631,-1.336c0.036,-0.581 -0.174,-1.134 -0.582,-1.542c-0.408,-0.408 -0.96,-0.618 -1.542,-0.582c-0.505,0.032 -0.976,0.274 -1.334,0.632l-0.343,0.343c-0.756,-0.33 -1.562,-0.487 -2.367,-0.461l1.345,-1.345c1.51,-1.511 4.145,-1.511 5.656,0c0.756,0.755 1.172,1.76 1.172,2.828zM5.463,11.403c-0.359,0.359 -0.83,0.6 -1.336,0.631c-0.581,0.036 -1.134,-0.174 -1.542,-0.582c-0.408,-0.408 -0.618,-0.96 -0.582,-1.542c0.031,-0.506 0.273,-0.977 0.631,-1.336l1.951,-1.951c0.588,-0.588 1.515,-0.719 2.253,-0.392c0.394,0.174 0.851,0.115 1.156,-0.19l0.001,-0.001c0.496,-0.496 0.34,-1.327 -0.295,-1.626c-0.524,-0.245 -1.102,-0.376 -1.7,-0.376c-1.068,0 -2.073,0.416 -2.828,1.171l-2,2c-0.756,0.756 -1.172,1.761 -1.172,2.829c0,1.068 0.416,2.073 1.172,2.828c1.511,1.512 4.146,1.511 5.656,0l1.345,-1.345c-0.805,0.026 -1.611,-0.131 -2.367,-0.461z"></path></g></g></svg>
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        </ul>

                                                    ) : (
                                                        <button className="buttonku text-white h-full p-5 text-strong rounded" type="submit" disabled={submitting}>
                                                            {submitting ? 'Submitting...' : 'Submit'}
                                                        </button>
                                                    )}

                                                </div>
                                                <ToastContainer role="alert" position="bottom-right" toastClassName={"bg-blue-400/20 text-white text-strong hover:blue-900"} />



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
                            ) :
                                <p id="text02" className="style2 font-semibold">You need to connect your wallet first!</p>
                            }
                            <Accordion />
                        </div>

                        {/* // FAQ ON APPLY */}


                        <div data-position="center">
                            <ul id="icon02" className="style1 icons">
                                <li>
                                    <a className="n01" target="_blank" href="https://twitter.com/Digibaseart/">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            fill="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                        </svg>
                                        <span className="label">Twitter</span>
                                    </a>
                                </li>
                            </ul>
                        </div>

                    </div>
                </div>
            </main >
        </div >
    );
}
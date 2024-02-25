'use client'
import React from "react";
import {
  useAccount,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../src/contract-abi.json";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { StandardMerkleTree } from "@openzeppelin/merkle-tree";
import { useState, useEffect } from 'react';
import { parseEther } from "viem";
import { Tab } from '@headlessui/react'
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

const contractConfig = {
  address: "0x65883d1669bf2c8cfa5ef31b8b7650087b14237b",
  abi,
} as const;


interface StandardMerkleTreeData {
  format: any;
  tree: string[];
  leafEncoding: string[];
  values: any[];
}
interface TotalSupplyData {
  totalSupply: number;
}

export default function Mint() {

  // ini buat bitton increment
  const [values, setValue] = useState<number>(1);

  const handleIncrement = () => {
    setValue((prevValue) => Math.min(prevValue + 1, 10));
  };

  const handleDecrement = () => {
    if (values > 1) {
      setValue((prevValue) => Math.max(prevValue - 1, 1));
    }
  };
  const price: number = 0.001;
  // let amount = values.toString();
  let publicPrice = (values * price).toString();


  React.useEffect(() => setMounted(true), []);
  const [mounted, setMounted] = React.useState(false);
  const [proofValue, setProofValue] = useState<any | null>(null);
  const [data, setData] = useState<StandardMerkleTreeData | null>(null); // Use null as the initial state
  const { address, isConnected } = useAccount(); // Assuming this custom hook provides the 'address'
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchData(); // Fetch data when the component mounts
  }, [address]);

  const fetchData = async () => {
    const apiToken = process.env.API_TOKEN; // Get the API token from the environment variable
    try {
      const response = await fetch('./api/myapi', {
        headers: {
          Authorization: `Bearer ${apiToken}`,
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const fetchedData = await response.json();
      setData(fetchedData);
      setIsLoading(false); 
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const findProofForValue = (tree: any, address: string) => {
      let proofValue; // Initialize 'proofValue' to null initially
      for (const [i, v] of tree.entries()) {
        if (v[0] === address) {
          const proof = tree.getProof(i);
          proofValue = proof; // Store the proof value in the variable 'proofValue'
          setProofValue(proof);
        }
      }
    };

    if (data && address && isConnected) {
      const tree = StandardMerkleTree.load(data);
      findProofForValue(tree, address.toLowerCase())
    }
  }, [data, address, isConnected]);


  const [totalMinted, setTotalMinted] = React.useState<number>(0);

  const { config: contractWriteConfig, isError } = usePrepareContractWrite({
    ...contractConfig,
    functionName: "whitelistMint",
    args: [proofValue, "1"],
    cacheTime: 2_000,
    onError(error) {

    },
  });

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractWriteConfig);


  const { data: totalSupplyData } = useContractRead({
    ...contractConfig,
    functionName: "totalSupply",
    watch: true,
  });

  const {
    data: txData,
    isSuccess: txSuccess,
    error: txError,
  } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  //public mint

  const { config: publicConfig, isSuccess, error } = usePrepareContractWrite({
    address: "0x65883d1669bf2c8cfa5ef31b8b7650087b14237b",
    abi,
    functionName: 'publicMint',
    args: [`${values}`],
    value: parseEther(publicPrice),
  })

  const {
    data: mintDataPub,
    write: write,
    isLoading: isMintLoadingPub,
    isSuccess: isMintStartedPub,
    error: mintErrorPub,
  } = useContractWrite(publicConfig)
  const {
    data: txDataPub,
    isSuccess: txSuccessPub,
    error: txErrorPub,
  } = useWaitForTransaction({
    hash: mintDataPub?.hash,
  });



  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData as number);
    }
  }, [totalSupplyData]);

  let numMint = Number(totalMinted)
  const num1 = numMint;
  const num2: number = 3250;
  const isMinted = txSuccess;
  const percent: number = Math.floor((num1 / num2) * 100);
  const available = num2 - num1;
  const isMintedPub = txSuccessPub;

  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }

  return (
    <div id="wrapper">
      <main id="main">
        <div className="inner">
          {/* container H1 */}
          <div id="container full" className="style5 container default">
            <div className="wrapper ">
              <div className="inner ">
                <h1 id="text01" className="style3">
                  DIGIBASE
                </h1>
                <div>
                  <ul id="buttons02" className="style1 buttons">
                    <li style={{ opacity: 1, transform: "none" }}>
                      <a id="text03" className="style1">
                        <span className="label style7">
                          <ConnectButton
                            accountStatus={{
                              smallScreen: "address",
                              largeScreen: "full",
                            }}
                            chainStatus="none"
                            showBalance={false}
                          />
                        </span>
                      </a>
                    </li>
                  </ul>
                  <div className="inner rounded-full">
                    <p
                      id="text02"
                      className="style2"
                      style={{ opacity: 1, transform: "none" }}
                    >
                      {Number(available)} available!
                    </p>

                    <div className=" justify-center w-full bg-blue-400/40 rounded-full">

                      <div className="flex pl-2 justify-center bg-blue-800/80 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{ width: `${percent}%` }} >
                        <span className="justify-center text-center">{`${percent}%`}</span>

                      </div>
                    </div>

                  </div>
                  <div className="wrapper">
                    <div className="inner">
                      <div className="w-full p-2 sm:px-0 rounded-lg  bg-blue-400/10">
                        <Tab.Group vertical>
                          <Tab.List className="flex justify-center space-x-15 rounded-xl  p-2">
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-900',
                                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none ',
                                  selected
                                    ? 'bg-white text-[#0b78de] shadow'
                                    : 'bg-blue-400/20 text-white text-strong  hover:bg-white/[0.35] hover:text-[#becde6]'
                                )
                              }
                            >Early Access Mint </Tab>
                            <Tab
                              className={({ selected }) =>
                                classNames(
                                  'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-white-900',
                                  'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                                  selected
                                    ? 'bg-white shadow text-[#0b78de]'
                                    : 'bg-blue-400/20 text-white text-strong hover:bg-white/[0.35] hover:text-[#becde6]'
                                )
                              }

                            >Public Mint</Tab>

                          </Tab.List>
                          <Tab.Panels className="justify-center items-center  rounded-xl bg-blue-900/10 p-1">
                            <Tab.Panel>
                              {/* Whitelist Mint */}
                              <div className="wrapper">
                                {/* {error && (
                                <p>Not Whitelisted or already claimed</p>
                                    )} */}         <div className="text-center">
                                  <p id="text02"
                                    className="style2 font-semibold"
                                    style={{ opacity: 1, transform: "none" }}>0.000Ξ</p>
                                </div>
                                <ul id="buttons02" className="style1 buttons">
                                  {mounted && isConnected && !isMinted && (
                                    <li style={{ opacity: 1, transform: "none" }}>

                                      <a onClick={() => mint?.()} className="button n01 cursor-pointer">

                                        <button
                                          disabled={!mint || isMintLoading || isMintStarted}
                                          data-mint-loading={isMintLoading}
                                          data-mint-started={isMintStarted}

                                        >
                                          {isMintLoading && "Waiting for approval"}
                                          {isMintStarted && "Minting..."}
                                          {!isMintLoading && !isMintStarted && !isError && !mintError && "Mint"}
                                          {!isError && mintError && "Sign error, Try again!"}
                                          {txError && "Mint Error"}
                                          {isError && !mintError && "No Quota"}
                                          {txSuccess && "Mint Success"}
                                        </button>
                                      </a>


                                    </li>
                                  )}


                                  {txSuccess && (
                                    <ul id="buttons02" className="style1 buttons">
                                      <li style={{ opacity: 1, transform: "none" }}>
                                        <a
                                          href="https://testnets.opensea.io/collection/digibase"
                                          target="_blank"
                                          className="button n01"
                                        >
                                          <button>View on Opensea</button>
                                        </a>
                                      </li>
                                    </ul>

                                  )}
                                </ul>
                                {isConnected && mintError && txError && (
                                  <p id="text02" className="style2">An error occurred: {mintError?.name}</p>
                                )}
                                {isConnected && txData && (
                                  <p id="text02" className="style2">view on
                                    <a href={`https://goerli.basescan.org/tx/${mintData?.hash}`} target="_blank" > BaseScan</a>
                                  </p>

                                )}
                              </div>
                            </Tab.Panel>

                            <Tab.Panel>
                              {/* Mint Button for Public */}

                              {/* {error && (
                <p>Not Whitelisted or already claimed</p>
              )} */}

                              <div className="wrapper">
                                <div className="flex py-1 flex-col items-center justify-center">
                                  <div className="text-center">
                                    <p id="text02"
                                      className="style2 font-semibold"
                                      style={{ opacity: 1, transform: "none" }}>0.003Ξ</p>
                                  </div>
                                  <div className="box rounded-lg bg-blue-400/20 text-blue text-strong hover:bg-white/[0.35]">
                                    <div className="border rounded-lg overflow-hidden flex">
                                      <button onClick={handleIncrement} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                                        +
                                      </button>
                                      <input
                                        readOnly
                                        className="w-16 h-6 text-center bg-white border-l border-r border-gray-300 flex-grow"
                                        type="number"
                                        step="1"
                                        min="1"
                                        value={values}
                                        disabled


                                      />
                                      <button onClick={handleDecrement} className="px-2 py-1 bg-gray-100 hover:bg-gray-200 focus:outline-none">
                                        -
                                      </button>
                                    </div>
                                  </div>
                                </div>

                                {mounted && isConnected && !isMintedPub && (
                                  <ul id="buttons02" className="style1 buttons">
                                    <li style={{ opacity: 1, transform: "none" }}>

                                      <a onClick={() => write?.()} className="button n01 cursor-pointer">

                                        <button
                                          disabled={!write || isMintLoadingPub || isMintStartedPub}
                                          data-mint-loading={isMintLoadingPub}
                                          data-mint-started={isMintStartedPub}

                                        >
                                          {isMintLoadingPub && "Waiting for approval"}
                                          {isMintStartedPub && "Minting..."}
                                          {!isMintLoadingPub && !isMintStartedPub && "Mint"}
                                          {/* {!isError && mintError && "Sign error, Try again!"} */}
                                          {txErrorPub && "Mint Error"}
                                          {/* {isError && !mintErrorPub && "No Quota"} */}
                                          {txSuccessPub && "Mint Success"}
                                        </button>
                                      </a>


                                    </li>
                                  </ul>
                                )}


                                {txSuccessPub && (
                                  <ul id="buttons02" className="style1 buttons">
                                    <li style={{ opacity: 1, transform: "none" }}>
                                      <a
                                        href="https://testnets.opensea.io/digibase"
                                        target="_blank"
                                        className="button n01"
                                      >
                                        <button>View on Opensea</button>
                                      </a>
                                    </li>
                                  </ul>
                                )}

                              </div>
                              {isConnected && !isSuccess && (
                                <div className="text-white">Error occured: {error?.name}</div>
                              )}
                              {isConnected && txDataPub && (
                                <p id="text02" className="style2">view on
                                  <a href={`https://goerli.basescan.org/tx/${mintDataPub?.hash}`} target="_blank"> BaseScan</a>
                                </p>

                              )}
                            </Tab.Panel>

                          </Tab.Panels>
                        </Tab.Group>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div
            id="image01"
            data-position="center"
            className="style1 image full screen"
          >
            <span className="frame">
              <img src="../image02.png" alt="DIGIBASE"></img>
            </span>
          </div>
          {/* Footer */}
          <div className="wrapper">
            <div className="inner" data-position="center">
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
            {/* Foot Tag */}

            <p id="text13" className="style9 py-7">
              Powered by
              <a href="https://base.org"> Base</a>.
            </p>
          </div>
        </div>
      </main >
    </div >
  );
}
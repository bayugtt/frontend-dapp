import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'

export default function Accordion() {
  return (
    <div className="w-full px-2 pt-4">
       <p id="text03"
        className="style3"
        style={{ opacity: 1, transform: "none" }}>FAQ</p>
      <div className="mx-auto w-full max-w-md rounded-2xl bg-blue-400/10 p-2">
        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>Is it safe to connect my wallet?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                Absolutely, connecting your wallet is secure! Rest assured, no sensitive information will be exposed.
                <br />
                You also have the option to use a burner wallet to mint Digibase. This enables you to engage in the process with a temporary wallet,
                <br />free from any security worries.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>What are the advantages of early access?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                Through the early access privilege, participants can mint Digibase NFTs for free. <br />
                Furthermore, all holders of Digibase NFTs stand the opportunity for a potential airdrop in the near future.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>How can i secure early access?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                Link your wallet and complete the provided form above.<br />
                We're excited to offer exclusive early access through special giveaways on our Twitter account.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>How can i confirm if I'm on the early access list?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
              We will announce it prior to the mint date.
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>When is the minting taking place?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                Stay tune on our <a  target="_blank" href="https://twitter.com/Digibaseart">Twitter</a>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

        <Disclosure as="div" className="mt-2">
          {({ open }) => (
            <>
              <Disclosure.Button id='text02' className="flex w-full justify-between text-blue-900 rounded-lg bg-blue-100 px-4 py-2 text-left text-sm font-medium  hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75">
                <span>What comes next?</span>
                <ChevronUpIcon
                  className={`${open ? 'rotate-180 transform' : ''
                    } h-5 w-5 text-white-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-white">
                Stay tuned for the official announcement on our Twitter,<br />
                Join us in shaping the future of this incredible journey together.<br />
                We may have special drop for you!
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>

      </div>
    </div>
  )
}
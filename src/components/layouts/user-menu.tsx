import React, {Fragment} from 'react';
import {Menu, Transition} from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import {signOut} from 'next-auth/react';
import {useUserContractStore, useUserStore} from '@zustand/user.store';

export const UserMenu = () => {
  const {user} = useUserStore();
  const {activeContract, setContract} = useUserContractStore();

  const handleSwitch = (
    contract: Exclude<typeof activeContract, undefined>,
  ) => {
    if (contract.id === activeContract?.id) {
      return;
    }
    if (confirm('Are you sure want to switch?')) {
      setContract(contract);
      window.location.replace('/app');
    }
  };
  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2">
          <span className="sr-only">Open user menu</span>
          <Image
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt=""
            width={32}
            height={32}
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item key={'profile'}>
            <Link href={'/user'}>
              <a className={'block px-4 py-2 text-sm text-gray-700'}>
                Your Profile
              </a>
            </Link>
          </Menu.Item>
          <Menu.Item key={'signOut'}>
            <div
              className="cursor-pointer w-full block px-4 py-2 text-sm text-gray-700"
              onClick={async () => await signOut()}>
              Sign Out
            </div>
          </Menu.Item>
          <hr />
          <div className="text-sm px-4 py-2 text-gray-700">Other Profiles</div>
          {user?.user_contracts?.map(x => (
            <div
              key={x.id}
              onClick={() => handleSwitch(x)}
              className={`text-xs cursor-pointer flex items-center px-4 py-2 ${
                activeContract?.id === x.id ? 'bg-amber-500 text-white' : ''
              }`}>
              <div>{`${x.company_profile?.data?.attributes?.title}`}</div>
            </div>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

import {ProfileResponseType} from '@queries/use-user';
import create from 'zustand';
import {persist} from 'zustand/middleware';

interface UserState {
  user: ProfileResponseType;
  setUser: (user: ProfileResponseType) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    set => ({
      user: undefined,
      setUser: user => set(() => ({user})),
    }),
    {
      name: 'user-storage',
    },
  ),
);

type UserContractType = Exclude<
  Exclude<ProfileResponseType, undefined>['user_contracts'],
  undefined
>[number];

interface UserContractState {
  activeContract: UserContractType | undefined;
  setContract: (contract: UserContractType) => void;
}

export const useUserContractStore = create<UserContractState>()(
  persist(
    set => ({
      activeContract: undefined,
      setContract: contract => set(() => ({activeContract: contract})),
    }),
    {
      name: 'user-contract-storage',
    },
  ),
);

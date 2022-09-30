import {
  BuildingOffice2Icon,
  CalendarIcon,
  CheckBadgeIcon,
  CheckIcon,
  HomeIcon,
  MegaphoneIcon,
  UserGroupIcon,
  UsersIcon,
  WalletIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon, current: false },
  { name: 'Directory', href: '/app/directory', icon: UsersIcon, current: false },
  { name: 'Onboarding', href: '/app/onboarding', icon: CheckIcon, current: false },
  { name: 'Offboarding', href: '/app/offboarding', icon: CheckBadgeIcon, current: false },
  { name: 'Leave', href: '/app/leave', icon: CalendarIcon, current: false },
  { name: 'Announcements', href: '/app/announcement', icon: MegaphoneIcon, current: false },
  // { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

export const secondaryNavigation = [
  { name: 'Users', href: '/admin/users', icon: UserGroupIcon, current: false },
  { name: 'Company', href: '/admin/company', icon: BuildingOffice2Icon, current: false },
  { name: 'Billings', href: '/admin/billing', icon: WalletIcon, current: false },
  // { name: 'Settings', href: '#', icon: CogIcon },
];

export const adminNavigation = [
  { name: 'Onboarding', href: '/manage/onboarding', current: false },
  { name: 'Offboarding', href: '/manage/offboarding', current: false },
  { name: 'Leave', href: '/manage/leave', current: false },
];

export const userNavigation = [
  { name: 'Your Profile', href: '/user' },
  // { name: 'Settings', href: '/user/settings' },
  { name: 'Sign out', href: '/auth/login' },
];
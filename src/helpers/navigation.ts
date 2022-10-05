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

export const APP_NAVIGATION_MAIN = [
  { name: 'Dashboard', href: '/app', icon: HomeIcon, current: false },
  { name: 'Directory', href: '/app/directory', icon: UsersIcon, current: false },
  { name: 'Onboarding', href: '/app/onboarding', icon: CheckIcon, current: false },
  { name: 'Offboarding', href: '/app/offboarding', icon: CheckBadgeIcon, current: false },
  { name: 'Leave', href: '/app/leave', icon: CalendarIcon, current: false },
  { name: 'Announcements', href: '/app/announcement', icon: MegaphoneIcon, current: false },
  // { name: 'Office Map', href: '#', icon: MapIcon, current: false },
];

export const APP_NAVIGATION_MANAGE = [
  { name: 'Users', href: '/manage/users', icon: UserGroupIcon, current: false },
  { name: 'Company', href: '/manage/company', icon: BuildingOffice2Icon, current: false },
  { name: 'Billings', href: '/manage/billing', icon: WalletIcon, current: false },
  // { name: 'Settings', href: '#', icon: CogIcon },
];

export const APP_NAVIGATION_CONFIGURE = [
  { name: 'Onboarding', href: '/configure/onboarding', current: false },
  { name: 'Offboarding', href: '/configure/offboarding', current: false },
  { name: 'Leave', href: '/configure/leave', current: false },
];

export const APP_NAVIGATION_USER = [
  { name: 'Your Profile', href: '/user' },
  // { name: 'Settings', href: '/user/settings' },
  { name: 'Sign out', href: '/auth/login' },
];

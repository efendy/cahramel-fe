import { UserCookieType } from '@interfaces/user-profile';
import nookies from 'nookies';

export const getCookieUsers = (): UserCookieType[] => {
    const cookies = nookies.get()['loggedUsers'];
    return cookies ? JSON.parse(cookies) : []
}

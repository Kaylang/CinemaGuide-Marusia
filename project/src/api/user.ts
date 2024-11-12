import type { TUser } from "@/types/user";
import { SERVER_API } from "./constants";

const REGISTER_API = SERVER_API + '/user';
const LOGIN_API = SERVER_API + '/user/login';
const LOGOUT_API = SERVER_API + '/user/logout';
const PROFILE_API = SERVER_API + '/profile';

export const userLogin = async (name: string, password: string) => {
  try {
    const responce = await fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        name, password
      })
    })
    if (responce.status === 200) {
      return await responce.json();
    }
  } catch (error) {
    console.error(error);
    // return null;
  }
}

export const userLogout = async () => {
  try {
    const responce = await fetch(LOGOUT_API, {
      method: 'GET',
    })
    if (responce.status === 200) return

  } catch (error) {
    console.error(error);
  }
}

export const getUserProfile = async () => {
  try {
    const responce = await fetch(PROFILE_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({})
    })
    if (responce.status === 200) {
      return await responce.json();
    }

  } catch (error) {
    console.error(error);
  }
}

export const userRegister = async (user: TUser) => {
  try {
    const responce = await fetch(REGISTER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify(user)
    })
    if (responce.status === 200) return await responce.json();
  } catch (error) {
    console.error(error);
  }
}

import type { TUser } from "@/types/user";
import { SERVER_API } from "./constants";
import type { TResponse } from "@/types/response";

const REGISTER_API = SERVER_API + '/user';
const LOGIN_API = SERVER_API + '/auth/login';
const LOGOUT_API = SERVER_API + '/auth/logout';
const PROFILE_API = SERVER_API + '/profile';

export const loginUser = async (user: TUser): Promise<TResponse> => {
  try {
    const response = await fetch(LOGIN_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
    if (response.status === 200)
      return {
        status: true,
      };
    if (response.status === 400)
      return {
        status: false,
        error: 'Ошибка авторизации!\nПроверьте корректность данных!',
      };
    return {
      status: false,
    };
  } catch (error) {
    const err = error as string
    return {
      status: false,
      error: err,
    };
  }
}

export const logoutUser = async (): Promise<TResponse> => {
  try {
    const response = await fetch(LOGOUT_API, {
      method: 'GET',
      credentials: 'include',
    })
    if (response.status === 200) return { status: true };
    return { status: false };
  } catch (error) {
    const err = error as string
    return {
      status: false,
      error: err,
    };
  }
}

export const getUserProfile = async (): Promise<TResponse> => {
  try {
    const response = await fetch(PROFILE_API, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
    })
    const data = await response.json();
    if (response.status === 200)
      return {
        status: true,
        data,
      };

    if (response.status === 401)
      return {
        status: false,
        error: 'Пользователь не авторизован!',
      };

    return {
      status: false,
      error: 'Ошибка при получении данных пользователя с сервера!'
    };
  } catch (error) {
    const err = error as string
    return {
      status: false,
      error: err,
    };
  }
}

export const registerUser = async (user: TUser): Promise<TResponse> => {
  try {
    const response = await fetch(REGISTER_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(user),
    })
    const data = await response.json()
    if (response.status === 200)
      return { status: true, data };
    if (response.status === 400)
      return {
        status: false,
        error: 'Некорректные данные пользователя!',
      };
    if (response.status === 409)
      return {
        status: false,
        error: 'Пользователь с таким адресом электронной почты уже существует!',
      }
    return { status: false };
  } catch (error) {
    const err = error as string
    return {
      status: false,
      error: err,
    };
  }
}

import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref<boolean>(false);
  const name = ref<string>();
  const surname = ref<string>();
  const email = ref<string>();
  const favorites = ref<string[]>([]);

  const setName = (value: string) => {
    name.value = value;
  }

  const getName = () => {
    return name.value;
  }

  const setSurname = (value: string) => {
    surname.value = value;
  }

  const getSurname = () => {
    return surname.value;
  }

  const setEmail = (value: string) => {
    email.value = value;
  }

  const getEmail = () => {
    return email.value;
  }

  const addFavorite = (value: string | number) => {

    favorites.value.push(typeof value === 'string' ? value : value.toString());
  }

  const setFavorites = (value: string[]) => {
    favorites.value.length = 0;
    favorites.value = [...value];
  }

  const getFavorites = () => {
    return favorites.value;
  }

  const deleteFavorite = (value: string | number) => {
    const index = favorites.value.indexOf(typeof value === 'string' ? value : value.toString());
    if (index !== -1) favorites.value.splice(index, 1);
  }

  const setIsAuthorized = (value: boolean) => {
    isAuthorized.value = value;
  }

  const clearUserData = () => {
    setIsAuthorized(false);
    setName('');
    setSurname('');
    setEmail('');
  }

  return {
    isAuthorized,
    name,
    surname,
    email,
    favorites,
    setName,
    getName,
    setSurname,
    getSurname,
    setEmail,
    getEmail,
    setFavorites,
    getFavorites,
    addFavorite,
    deleteFavorite,
    setIsAuthorized,
    clearUserData,
  }
})

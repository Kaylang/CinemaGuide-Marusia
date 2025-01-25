export const isUserLogged = () => {
  return localStorage.getItem('marusya_user');
}

export const setUserLogged = () => {
  localStorage.setItem('marusya_user', 'true');
}

export const unsetUserLogged = () => {
  localStorage.removeItem('marusya_user');
}

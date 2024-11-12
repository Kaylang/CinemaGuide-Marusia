import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserStore = defineStore('user', () => {
  const isAuthorized = ref<boolean>(false);
  const userName = ref<string>('');
  const surName = ref<string>('');
  const email = ref<string>('');
  const tocken = ref<string>('');



  return {
    isAuthorized, userName, surName, email, tocken
  }
})

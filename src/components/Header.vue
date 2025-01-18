<template>
  <div class="bg-black">
    <header class="bg-black grid grid-cols-2 items-center px-6 py-4">
      <!-- Logo Section -->
      <div class="text-3xl text-white font-bold justify-start flex">
        <router-link to="/">
          SW
        </router-link>
      </div>

      <!-- User Section -->
      <div v-if="authStore.isUserLoggedIn" class="text-white font-bold flex justify-end  px-6 ">
        <router-link to="/encomendas" class="hover:text-gray-200 mx-6">Encomendas</router-link>
        <router-link to="/login" class="hover:text-gray-200">Logout</router-link>
      </div>
      <div v-else class="text-white font-bold flex justify-end  px-6 ">
        <router-link to="/login" class="text-white justify-end hover:text-gray-200">Login</router-link>
      </div>
    </header>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth";
export default {
  name: "Header",
  setup() {
    const authStore = useAuthStore(); // Access the auth store

    return {
      authStore,
    };
  },
};
</script>
  
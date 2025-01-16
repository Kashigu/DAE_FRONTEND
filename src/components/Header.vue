<template>
    <div class="bg-black">
      <header class="bg-black grid grid-cols-3 items-center px-6 py-4">
        <!-- Logo Section -->
        <div class="text-3xl text-white font-bold justify-start flex">
          <router-link to="/">
            SW
          </router-link>
        </div>
        <!-- Navigation Section -->
        <nav class="text-white font-bold space-x-12 justify-center flex">
          <router-link to="/" class="hover:text-red-500">Homepage</router-link>
        </nav>
        <!-- User Section -->
        <div class="text-white font-bold justify-end flex">
          <router-link to="/login" class="hover:text-red-500">Login</router-link>
        </div>
      </header>
    </div>
  </template>
  
  <script>
  export default {
    name: "Header",
  };
  </script>
  
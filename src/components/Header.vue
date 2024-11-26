
<template>
    <div class="bg-black">
        <header class="bg-black grid grid-cols-3 items-center px-6 py-4">
        <!-- Logo Section -->
        <div class="text-3xl text-white font-bold justify-start flex">
            <router-link to="/">
            Ani<span class="text-red-500">ma</span>
            </router-link>
        </div>
    
        <!-- Navigation Section -->
        <nav class="text-white font-bold space-x-12 justify-center flex">
            <router-link to="/" class="hover:text-red-500">Homepage</router-link>
            <router-link to="/Animes" class="hover:text-red-500">Animes</router-link>
            <router-link to="/Episodes" class="hover:text-red-500">Episodes</router-link>
        </nav>
        </header>
    </div>
  </template>
  
  <script>
   import '../assets/main.css';

  export default {
    name: "Header",
  };
  </script>
  

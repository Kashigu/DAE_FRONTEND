<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="flex items-center mb-8">
        <!-- Back button aligned to the left -->
        <button
          @click="$router.back()"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Voltar
        </button>
      <h1 class="text-4xl font-bold text-center flex-grow">
        Lista de Encomendas
      </h1>
    </div>
  
      <!-- Lista de Encomendas -->
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="(encomenda, index) in encomendas"
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <!-- Encomenda Information -->
           <a :href="'/volumesEncomendas/' + encomenda.codigo">
          <h2 class="text-2xl font-bold text-black mb-4">Código: {{ encomenda.codigo }}</h2>
          <p class="text-lg font-medium">Estado: {{ encomenda.estado }}</p>
          <p class="text-lg font-medium">Morada: {{ encomenda.morada }}</p>
          <p class="text-lg font-medium">Cliente: {{ encomenda.clienteUsername }}</p>
           </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/api/api.js";
  import {useAuthStore} from "@/stores/auth.js";
  export default {
    data() {
      return {
        encomendas: [],
      };
    },
    async created() {
      try {
        const authStore = useAuthStore();
        // Corrigir a chamada de getToken para ser assíncrona
        await authStore.getToken();

        // Verificar se está logado
        if (!authStore.isLoggedIn) {
          throw new Error("Usuário não autenticado.");
        }


        let endPoint;
        if(authStore.user.role === 'Cliente'){
          endPoint = "/encomenda/cliente/"+authStore.user.username;
        }else{
          endPoint = "/encomenda/all";
        }
        const response = await api.get(endPoint);
        this.encomendas = response.data;
      } catch (error) {
        console.error("Error fetching encomendas:", error);
      }
    },
  };
  </script>
  
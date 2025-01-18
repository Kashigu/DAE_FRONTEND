<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="flex items-center mb-8">
        <!-- Back button aligned to the left -->
        
      <h1 class="text-4xl font-bold text-center flex-grow">
        Sensores
      </h1>
    </div>
  
      <!-- Lista de Encomendas -->
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="(sensor, index) in sensores"
          :key="sensor.id" 
          class="bg-white rounded-lg shadow-md p-6"
        >
          <!-- Encomenda Information Clicas no sensor e vês o historico--> 

          <router-link
            v-if="authStore.isUserLoggedIn && authStore.user?.role === 'SensorAuth'"
            :to="'/AddMedicoes/' + sensor.id"
            class="block" 
          >
            <h2 class="text-2xl font-bold text-black mb-4">Código: {{ sensor.id }}</h2>
            <p class="text-lg font-medium">Estado: {{ sensor.ativo ? 'Ativo' : 'Inativo' }}</p>
            <p class="text-lg font-medium">Sensor: {{ sensor.tipo }}</p>
            <p class="text-lg font-medium">VolumeId: {{ sensor.volumeId }}</p>
          </router-link>

          <div v-else>
            <h2 class="text-2xl font-bold text-black mb-4">Código: {{ sensor.id }}</h2>
            <p class="text-lg font-medium">Estado: {{ sensor.ativo ? 'Ativo' : 'Inativo' }}</p>
            <p class="text-lg font-medium">Sensor: {{ sensor.tipo }}</p>
            <p class="text-lg font-medium">VolumeId: {{ sensor.volumeId }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/api/api.js";
  import {useAuthStore} from "@/stores/auth.js";
  export default {
    setup() {
      const authStore = useAuthStore();
      

      return {
        authStore,
      };
    },
    data() {
      return {
        sensores: [],
      };
    },
    async created() {
      try {
        const authStore = useAuthStore();
        // Corrigir a chamada de getToken para ser assíncrona
        await authStore.getToken();

        // Verificar se está logado
        if (!authStore.isLoggedIn) {
          throw new Error("Utilizador não autenticado.");
        }
        
        console.log(authStore.user.role);
        let endPoint;
        if(authStore.user.role !== 'Client'){
          endPoint = "/sensor/all";
        }else{
          this.$router.push("/login");
        }
        const response = await api.get(endPoint);
        this.sensores = response.data;
        console.log(this.sensores);
      } catch (error) {
        console.error("Error fetching sensor:", error);
      }
    },
  };
  </script>
  
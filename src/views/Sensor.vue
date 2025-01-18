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
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <!-- Encomenda Information Clicas no sensor e vês o historico--> 
          <a :href="'/AddMedicoes/' + sensor.codigo">
          <h2 class="text-2xl font-bold text-black mb-4">Código: {{ sensor.codigo }}</h2>
          <p class="text-lg font-medium">Estado: {{ sensor.ativo }}</p>
          <p class="text-lg font-medium">Morada: {{ sensor.tipo }}</p>
          <p class="text-lg font-medium">Cliente: {{ sensor.volume }}</p>
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
        sensores: [],
      };
    },
    async created() {
      try {
        const authStore = useAuthStore();
        /*if(!authStore.isLoggedIn){
          this.$router.push("/login");
          return;
        }*/
       
        console.log(authStore.user.role);
        let endPoint;
        if(authStore.user.role === 'SensorAuth'){
          endPoint = "/sensor/all";
        }else{
          this.$router.push("/login");
        }
        const response = await api.get(endPoint);
        this.sensores = response.data;
      } catch (error) {
        console.error("Error fetching sensores:", error);
      }
    },
  };
  </script>
  
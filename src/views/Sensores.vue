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
  
        <!-- Title centered -->
        <h1 class="text-4xl font-bold text-center flex-grow">
          Lista de Sensores do Volume {{ volumeId }}
        </h1>
      </div>
  
      <!-- Lista de Sensores -->
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="(sensor, index) in sensors"
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <h2 class="text-2xl font-bold text-black mb-4">
            ID do Sensor: {{ sensor.id }}
          </h2>
          <p class="text-lg font-medium">
            Atividade: {{ sensor.ativo ? 'Ativo' : 'Inativo' }}
          </p>
          <p class="text-lg font-medium">
          <a
            :href="'/medicao/' + sensor.id"
            class="text-blue-500 underline hover:text-blue-700"
          >
            Ver Medições:
          </a>
          </p>
          <p class="text-lg font-medium">Tipo: {{ sensor.tipo }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/api/api.js";
  
  export default {
    data() {
      return {
        sensors: [], // List of sensors filtered by volumeId
        volumeId: null, // ID of the volume from the URL
      };
    },
    async created() {
      try {
        // Get the 'volumeId' from the route params
        this.volumeId = this.$route.params.id;
  
        // Fetch all sensors from the API
        const response = await api.get(`/sensor/all`); // Assuming this endpoint returns all sensors
  
        // Filter sensors for the specific volumeId
        this.sensors = response.data.filter(sensor => sensor.volumeId === parseInt(this.volumeId));
      } catch (error) {
        console.error("Error fetching sensors:", error);
      }
    },
  };
  </script>
  
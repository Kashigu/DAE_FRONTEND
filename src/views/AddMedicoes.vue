<template>
    <div class="min-h-screen bg-gray-100 p-8">
      <div class="flex items-center mb-8">
        <button
          @click="$router.back()"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
        >
          Voltar
        </button>
        <!-- Back button aligned to the left -->
        <h1 class="text-4xl font-bold text-center flex-grow">
          Adicionar Medição ao Sensor {{ sensorId }}
        </h1>
      </div>
  
      <!-- Input for sending text -->
      <div class="mb-8">
        <label for="userInput" class="block text-lg font-medium mb-2">Medição:</label>
        <div class="flex">
          <input
            id="userInput"
            type="text"
            v-model="userInput"
            class="flex-grow p-2 border border-gray-300 rounded-l-lg"
            placeholder="Medicoes"
          />
          <button
            @click="sendInput"
            class="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600"
          >
            Enviar
          </button>
        </div>
      </div>
  
      <!-- Lista de Sensores -->
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="(sensor, index) in sensores"
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <!-- Sensor Information -->
          <h2
            @click="viewSensorCode(sensor.codigo)"
            class="text-2xl font-bold text-black mb-4 cursor-pointer hover:underline"
          >
            Código: {{ sensor.codigo }}
          </h2>
          <p class="text-lg font-medium">Estado: {{ sensor.ativo }}</p>
          <p class="text-lg font-medium">Morada: {{ sensor.tipo }}</p>
          <p class="text-lg font-medium">Cliente: {{ sensor.volume }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import api from "@/api/api.js";
  import { useAuthStore } from "@/stores/auth.js";
  
  export default {
    data() {
      return {
        sensores: [],
        userInput: "", // For storing user input
        sensorId: this.$route.params.id,    
      };
    },
    methods: {
      async viewSensorCode(codigo) {
        try {
          // Fetch and display sensor code logic (replace with actual API endpoint)
          const response = await api.get(`/sensor/code/${codigo}`);
          alert(`Código do Sensor: ${response.data.code}`);
        } catch (error) {
          console.error("Error fetching sensor code:", error);
        }
      },
      sendInput() {
        if (this.userInput.trim() === "") {
          alert("Por favor, escreva algo antes de enviar.");
          return;
        }
        console.log("Input enviado:", this.userInput);
        // Handle input (e.g., send to API or other logic)
        this.userInput = ""; // Clear the input field
      },
    },
    async created() {
      try {
        const authStore = useAuthStore();
        if (authStore.user.role !== "SensorAuth") {
          this.$router.push("/login");
          return;
        }
        const response = await api.get("/sensor/all");
        this.sensores = response.data;
      } catch (error) {
        console.error("Error fetching sensores:", error);
      }
    },
  };
  </script>
  
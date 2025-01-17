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
        Lista de Volumes da Encomenda {{ encomendaCodigo }}
      </h1>
    </div>

    <!-- Lista de Volumes -->
    <div class="grid grid-cols-1 gap-8">
      <div
        v-for="(volume, index) in volumes"
        :key="index"
        class="bg-white rounded-lg shadow-md p-6"
      >
        <h2 class="text-2xl font-bold text-black mb-4">
          ID do Volume: {{ volume.id }}
        </h2>
        <p class="text-lg font-medium">Estado: {{ volume.estado }}</p>

        <!-- Produtos Link -->
        <p class="text-lg font-medium">
          <a
            :href="'/produtos/' + volume.id"
            class="text-blue-500 underline hover:text-blue-700"
          >
            Produtos:
          </a>
          {{ volume.produtosNomes.join(', ') }}
        </p>

        <!-- Sensores Link -->
        <p class="text-lg font-medium">
          <a
            :href="'/sensores/' + volume.id"
            class="text-blue-500 underline hover:text-blue-700"
          >
            Sensores:
          </a>
          {{ volume.sensoresIds.join(', ') }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js";

export default {
  data() {
    return {
      volumes: [], // List of volumes
      encomendaCodigo: null, // Code of the order
    };
  },
  async created() {
    try {
      // Get the 'codigo' from the route params
      this.encomendaCodigo = this.$route.params.id;
      
      const response = await api.get(`/encomenda/${this.encomendaCodigo}`);
      console.log("API Response:", response.data);

      // Ensure the data is an array
      this.volumes = Array.isArray(response.data) ? response.data : [response.data];
    } catch (error) {
      console.error("Error fetching volumes:", error.message);
      console.error("Full error details:", error.toJSON ? error.toJSON() : error);
    }
  },
};
</script>

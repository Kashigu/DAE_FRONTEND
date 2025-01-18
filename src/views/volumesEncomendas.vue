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
        Lista de Volumes da Encomenda #{{ encomendaCodigo }}
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

        <!-- Produtos -->
        <span class="text-lg font-medium">
          <span>Produtos:</span>
          <ul>
            <li v-for="(produtoId, idx) in volume.produtosIds" :key="idx">
              <button
                  @click="goToProdutoPage(produtoId, volume.id)"
                  class="text-blue-500 hover:underline"
              >
                Produto ID: {{ produtoId }} (Quantidade: {{ volume.produtosQuants[idx] }})
              </button>
            </li>
          </ul>
        </span>

        <!-- Sensores -->
        <span class="text-lg font-medium">
          <span>Sensores:</span>
          <ul>
            <li v-for="(sensorId, idx) in volume.sensoresIds" :key="idx">
              <button
                  @click="goToSensorPage(sensorId)"
                  class="text-blue-500 hover:underline"
              >
                Sensor ID: {{ sensorId }}
              </button>
            </li>
          </ul>
        </span>
      </div>

      <!-- Caso não haja volumes -->
      <div v-if="volumes.length === 0" class="bg-white rounded-lg shadow-md p-6 text-center">
        <p class="text-lg font-medium text-gray-500">Nenhum volume encontrado para esta encomenda.</p>
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
      volumes: [], // List of volumes
      encomendaCodigo: null, // Code of the order
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

      // Get the 'codigo' from the route params
      this.encomendaCodigo = this.$route.params.id;
      const response = await api.get(`/encomenda/${this.encomendaCodigo}/volumes`);
      console.log("API Response:", response.data);

      // Verificar se existem volumes
      if (response.data && Array.isArray(response.data)) {
        this.volumes = response.data;
      } else {
        this.volumes = [];
      }
    } catch (error) {
      console.error("Error fetching volumes:", error.message);
      console.error("Full error details:", error.toJSON ? error.toJSON() : error);
    }
  },
  methods: {
    goToProdutoPage(produtoId, volumeId) {
      // Redireciona para a página de produto com o ID
      this.$router.push(`/produtos/${produtoId}/volume/${volumeId}`);
    },
    goToSensorPage(sensorId) {
      // Redireciona para a página de sensor com o ID
      this.$router.push(`/sensores/${sensorId}`);
    }
  }
};
</script>

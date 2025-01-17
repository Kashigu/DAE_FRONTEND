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
          Lista de Produtos do Volume {{ encomendaCodigo }}
        </h1>
      </div>
  
      <!-- Lista de Produtos -->
      <div class="grid grid-cols-1 gap-8">
        <div
          v-for="(product, index) in products"
          :key="index"
          class="bg-white rounded-lg shadow-md p-6"
        >
          <h2 class="text-2xl font-bold text-black mb-4">
            Nome: {{ product.nome }}
          </h2>
          <p class="text-lg font-medium">Descrição: {{ product.categoria }}</p>
          <p class="text-lg font-medium">Categoria: {{ product.descricao }}</p>
          <p class="text-lg font-medium">Quantidade: {{ product.quantidade }}</p>
          <p class="text-lg font-medium">Estado: {{ product.estado }}</p>
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
        products: [], // List of products
        encomendaCodigo: null, // Code of the order
      };
    },
    async created() {
      try {
        const authStore = useAuthStore();
        console.log(authStore.user);
        authStore.getToken.then((token) => {
          if (!token) {
            this.$router.push("/login");
            return;
          }
        });

        // Get the 'codigo' from the route params
        this.encomendaCodigo = this.$route.params.id;
  
        // Fetch the volume data to get the product identifiers
        const volumeResponse = await api.get(`/volume/${this.encomendaCodigo}`);
        const volumes = Array.isArray(volumeResponse.data)
          ? volumeResponse.data
          : [volumeResponse.data];
  
        // Extract all product identifiers from the volumes
        const productIdentifiers = volumes.flatMap((volume) =>
          volume.produtosNomes
        );
  
        // Fetch product details for each identifier
        const productPromises = productIdentifiers.map((identifier) =>
          api.get(`/produto/${identifier}`)
        );
  
        // Wait for all product details to resolve
        const productResponses = await Promise.all(productPromises);
  
        // Extract and store product data
        this.products = productResponses.map((response) => response.data);
      } catch (error) {
        console.error("Error fetching products:", error.message);
        console.error("Full error details:", error.toJSON ? error.toJSON() : error);
      }
    },
  };
  </script>
  
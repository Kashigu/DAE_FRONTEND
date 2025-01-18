<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <!-- Cabeçalho -->
    <div class="flex items-center mb-8">
      <button
          @click="$router.back()"
          class="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        Voltar
      </button>
      <h1 class="text-4xl font-bold text-center flex-grow">Registrar Nova Conta Sensor</h1>
    </div>

    <!-- Formulário de Registro -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-black mb-4">Crie uma nova conta sensor</h2>

      <form @submit.prevent="registerSensor">
        <div class="mb-4">
          <label class="text-lg font-medium">ID (Nome de Utilizador):</label>
          <input
              v-model="sensor.username"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Nome:</label>
          <input
              v-model="sensor.nome"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Email:</label>
          <input
              v-model="sensor.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <!-- Adicionando o campo de senha -->
        <div class="mb-4">
          <label class="text-lg font-medium">Senha:</label>
          <input
              v-model="sensor.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mt-6 flex justify-end">
          <button
              type="submit"
              class="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
          >
            Registrar
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import api from "@/api/api.js"; // Importando a API para enviar os dados

export default {
  data() {
    return {
      sensor: {
        username: "",  // ID (Nome de utilizador do sensor)
        nome: "",      // Nome do sensor
        email: "",     // Email do sensor
        password: "",  // Senha do sensor
      },
    };
  },
  methods: {
    // Método para registrar o sensor
    async registerSensor() {
      try {
        const response = await api.post("/sensorAuth", this.sensor); // Envia os dados para o servidor

        if (response.status === 200) {
          alert("Sensor registrado com sucesso!");
          this.$router.push("/sensores");  // Redireciona para a lista de sensores
        } else {
          alert("Erro ao registrar o sensor.");
        }
      } catch (error) {
        console.error("Erro ao registrar o sensor:", error);
        alert("Erro ao tentar registrar o sensor.");
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>

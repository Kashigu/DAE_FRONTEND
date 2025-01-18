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
      <h1 class="text-4xl font-bold text-center flex-grow">Criar Novo Funcionário</h1>
    </div>

    <!-- Formulário de Criação -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-black mb-4">Cadastrar Novo Funcionário</h2>

      <form @submit.prevent="createFuncionario">
        <div class="mb-4">
          <label class="text-lg font-medium">Nome de Utilizador:</label>
          <input
              v-model="funcionario.username"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Nome Completo:</label>
          <input
              v-model="funcionario.nome"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Email:</label>
          <input
              v-model="funcionario.email"
              type="email"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Senha:</label>
          <input
              v-model="funcionario.password"
              type="password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div class="mb-4">
          <label class="text-lg font-medium">Confirmar Senha:</label>
          <input
              v-model="funcionario.confirmPassword"
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
            Criar Funcionário
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js";
import api from "@/api/api.js";
import { useRouter } from "vue-router";

export default {
  data() {
    return {
      funcionario: {
        username: "",
        nome: "",
        email: "",
        password: "",
        confirmPassword: "",
      }, // Dados do funcionário
    };
  },
  computed: {
    isGestor() {
      return this.$store.state.auth.user?.role === "Gestor"; // Verifica se o Utilizador logado é um gestor
    },
  },
  methods: {
    // Método para criar o funcionário
    async createFuncionario() {
      if (this.funcionario.password !== this.funcionario.confirmPassword) {
        alert("As senhas não coincidem.");
        return;
      }

      if (!this.isGestor) {
        alert("Você precisa ser um gestor para criar funcionários.");
        return;
      }

      try {
        // O ID do funcionário será o username
        const funcionarioData = { ...this.funcionario, id: this.funcionario.username };

        // Remove o campo de confirmação de senha antes de enviar
        delete funcionarioData.confirmPassword;

        // Envia a requisição para criar o funcionário
        const response = await api.post("/funcionario", funcionarioData);

        if (response.status === 201) {
          alert("Funcionário criado com sucesso!");
          this.$router.push("/funcionarios"); // Redireciona para a lista de funcionários
        } else {
          alert("Erro ao criar funcionário.");
        }
      } catch (error) {
        console.error("Erro ao criar funcionário:", error);
        alert("Erro ao tentar criar o funcionário.");
      }
    },
  },
  created() {
    if (!this.isGestor) {
      this.$router.push("/login"); // Redireciona para login se o Utilizador não for gestor
    }
  },
};
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>

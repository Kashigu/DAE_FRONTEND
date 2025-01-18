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
      <h1 class="text-4xl font-bold text-center flex-grow">Perfil de Utilizador</h1>
    </div>

    <!-- Dados do Perfil -->
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-bold text-black mb-4">Informações do Perfil</h2>

      <div class="mb-4">
        <label class="text-lg font-medium">Nome de Usuário:</label>
        <p class="text-lg">{{ user.username }}</p>
      </div>

      <div class="mb-4">
        <label class="text-lg font-medium">Nome Completo:</label>
        <p class="text-lg">{{ user.nome }}</p>
      </div>

      <div class="mb-4">
        <label class="text-lg font-medium">Email:</label>
        <p class="text-lg">{{ user.email }}</p>
      </div>

      <div class="mb-4">
        <label class="text-lg font-medium">Função:</label>
        <p class="text-lg">{{ user.role }}</p>
      </div>

      <!-- Botões de ação -->
      <div class="mt-6 flex space-x-4">
        <button
            @click="editProfile"
            class="px-6 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
        >
          Editar
        </button>
        <button
            @click="deleteProfile"
            class="px-6 py-2 bg-red-500 text-white font-semibold rounded hover:bg-red-600"
        >
          Apagar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js";
import { useRouter } from "vue-router";
import api from "@/api/api.js";

export default {
  data() {
    return {
      user: {}, // Dados do usuário
    };
  },
  created() {
    const authStore = useAuthStore();
    authStore.getToken();
    if (authStore.user) {
      this.user = authStore.user;
    } else {
      console.error("Usuário não encontrado!");
    }
  },
  methods: {
    // Método para editar perfil
    editProfile() {
      // Redirecionar para a página de edição (ajuste conforme a sua rota)
      this.$router.push("/editar-perfil");
    },
    // Método para apagar o perfil
    async deleteProfile() {
      const confirmation = confirm("Tem certeza que deseja apagar o seu perfil?");
      if (confirmation) {
        try {
          // Lógica para apagar o perfil
          // Pode ser uma chamada para uma API para excluir o usuário ou deslogá-lo
          const authStore = useAuthStore();
          await authStore.logout();  // Exemplo de logout após a exclusão
          this.$router.push("/login");  // Redireciona para a tela de login após a exclusão
          const response = await api.delete('cliente/'+this.user.username); // Exemplo de chamada para deletar o usuário
          if(response.status === 200){
            alert("Perfil apagado com sucesso!");
          } else {
            alert("Erro ao apagar o perfil.");
          }
        } catch (error) {
          console.error("Erro ao apagar o perfil:", error);
          alert("Erro ao tentar apagar o perfil.");
        }
      }
    },
  },
};
</script>

<style scoped>
/* Estilos adicionais podem ser adicionados aqui, se necessário */
</style>

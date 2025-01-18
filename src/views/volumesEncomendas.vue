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
            <li v-for="(sensor, idx) in volume.sensores" :key="idx">
              <button
                  @click="goToSensorPage(sensor.id)"
                  class="text-blue-500 hover:underline"
              >
                Sensor ID: {{ sensor.id }} - Tipo: {{ sensor.tipo }}
              </button>
            </li>
          </ul>
        </span>

        <!-- Adicionar Sensor (visível apenas para Gestores) -->
        <div v-if="authStore.user.role === 'Gestor'" class="mt-4">
          <!-- Dropdown para selecionar o Sensor -->
          <select v-model="volume.selectedSensorId" class="p-2 border rounded">
            <option value="" disabled selected>Selecione um Sensor</option>
            <option
                v-for="sensor in availableSensors"
                :key="sensor.id"
                :value="sensor.id"
            >
              ID: {{ sensor.id }} - Tipo: {{ sensor.tipo }}
            </option>
          </select>

          <!-- Mensagem de erro quando nenhum sensor for selecionado -->
          <div v-if="volume.selectedSensorId === ''" class="text-red-500 text-sm mt-2">
            Por favor, selecione um sensor.
          </div>

          <button
              @click="addSensorToVolume(volume.id)"
              class="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 mt-2"
              :disabled="loading || volume.selectedSensorId === ''"
          >
            {{ loading ? 'Adicionando...' : 'Adicionar Sensor' }}
          </button>
        </div>

        <!-- Editar botão (visível apenas para Gestores) -->
        <div v-if="authStore.user.role === 'Gestor'" class="mt-4">
          <button
              @click="editVolume(volume.id)"
              class="px-4 py-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
          >
            Editar Volume
          </button>
        </div>
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
      volumes: [], // Lista de volumes
      encomendaCodigo: null, // Código da encomenda
      availableSensors: [], // Lista de sensores disponíveis
      loading: false, // Variável de carregamento
    };
  },
  setup() {
    const authStore = useAuthStore(); // Usar o authStore aqui

    return {
      authStore, // Retornar o authStore para usá-lo no template
    };
  },
  async created() {
    try {
      const authStore = useAuthStore(); // Garantir que o authStore seja acessado aqui também
      await authStore.getToken();

      // Verificar se está logado
      if (!authStore.isLoggedIn) {
        throw new Error("Usuário não autenticado.");
      }

      // Obter o 'codigo' dos parâmetros da rota
      this.encomendaCodigo = this.$route.params.id;
      const responseVolumes = await api.get(`/encomenda/${this.encomendaCodigo}/volumes`);
      console.log("Volumes:", responseVolumes.data);

      // Verificar se existem volumes
      if (responseVolumes.data && Array.isArray(responseVolumes.data)) {
        this.volumes = responseVolumes.data.map(volume => ({
          ...volume,
          selectedSensorId: "", // Inicializa o selectedSensorId para cada volume
          sensores: volume.sensores || [], // Garante que 'sensores' seja um array
        }));
      } else {
        this.volumes = [];
      }

      // Obter a lista de sensores disponíveis de /sensor/all
      const responseSensors = await api.get('/sensor/all');
      console.log("Sensores Disponíveis:", responseSensors.data);
      this.availableSensors = responseSensors.data;

    } catch (error) {
      console.error("Error fetching volumes or sensors:", error.message);
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
    },
    editVolume(volumeId) {
      // Redireciona para a página de edição do volume
      this.$router.push(`/editarVolume/${volumeId}`);
    },
    async addSensorToVolume(volumeId) {
      const volume = this.volumes.find(v => v.id === volumeId);
      const selectedSensorId = volume.selectedSensorId; // Acessar diretamente do volume

      // Verifica se um sensor foi selecionado
      if (!selectedSensorId) {
        alert("Por favor, selecione um sensor.");
        return;
      }

      // Verifica se o sensor já foi adicionado
      if (volume.sensores.some(sensor => sensor.id === selectedSensorId)) {
        alert("Este sensor já foi adicionado a este volume.");
        return;
      }

      try {
        this.loading = true;

        const selectedSensor = this.availableSensors.find(sensor => sensor.id === selectedSensorId);
        if (!selectedSensor) {
          alert("Sensor não encontrado.");
          this.loading = false;
          return;
        }

        const sensorData = {
          tipo: selectedSensor.tipo,
          ativo: true, // Ajuste conforme necessário
          volumeId: volumeId,
        };

        const response = await api.patch(`/sensor/${selectedSensorId}`, sensorData);

        if (response.data) {
          alert("Sensor adicionado com sucesso!");
          // Atualiza a lista de sensores do volume após adicionar
          volume.sensores.push(response.data); // Adiciona o sensor ao volume
        }

        volume.selectedSensorId = ""; // Limpa o campo de seleção após adicionar

      } catch (error) {
        console.error("Erro ao adicionar o sensor:", error.message);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

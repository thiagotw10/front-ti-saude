<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-input v-model="nome" filled type="text" hint="Nome" />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <div style="display: flex; justify-content:flex-end;" class="q-pa-md">
        <q-btn style="margin: 0 5px;" label="Voltar" color="primary" @click="voltar" :disabled="isLoadingEnviar"/>
        <q-btn :label="botaoLabel"  color="primary" @click="criarMedico" :disabled="isLoadingEnviar"/>
      </div>
    </div>
  </div>
  <q-dialog v-model="icon">
      <q-card>
        <q-card-section class="row items-center q-pb-none">
          <div class="text-h6">Dados faltando.</div>
          <q-space />
          <q-btn  icon="close" flat round dense v-close-popup />
        </q-card-section>

        <q-card-section>
          Todo os campos precisam ser preenchidos.
        </q-card-section>
      </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from 'vue'
import axios from "axios";

export default defineComponent({
  name: 'createEspecialidade',
  data(){
    return {
      data: null,
      isLoading: false,
      isLoadingEnviar: false,
      botaoLabel: 'Criar'
    }
  },
  mounted(){
  },
  methods: {
    voltar(){
      this.$router.push("/especialidades");
    },
    criarMedico(){
      this.isLoadingEnviar = true
      this.botaoLabel = 'Carregando ...'
      if(this.nome != ''){
        let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/especialidades",
          {
            espec_nome: this.nome,
          },
          token
        )
        .then((response) => {
          this.isLoadingEnviar = false
          this.$router.push("/especialidades");
        })
        .catch((error) => {
          this.isLoadingEnviar = false
          this.botaoLabel = 'Criar'
          console.error(error);
        });
      }else{
        this.botaoLabel = 'Criar'
        this.isLoadingEnviar = false
        this.icon = true
      }
    }
  },
  setup () {
    return {
      nome: ref(''),
      icon: ref(false),
    }
  }
})
</script>

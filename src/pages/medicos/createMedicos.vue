<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-input v-model="nome" filled type="text" hint="Nome" />
      <q-input v-model="crm" filled type="text" hint="CRM" />
      <q-select
        filled
        v-model="especialidade"
        :options="data"
        option-value="id"
        option-label="desc"
        option-disable="inactive"
        emit-value
        map-options
        hint="Especialidades"
        style="min-width: 250px; max-width: 300px"
        :loading="isLoading"
      />
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
  name: 'createMedicos',
  data(){
    return {
      data: null,
      isLoading: false,
      isLoadingEnviar: false,
      botaoLabel: 'Criar'
    }
  },
  mounted(){
    this.carregarEspecialidades()
  },
  methods: {
    voltar(){
      this.$router.push("/medicos");
    },
    carregarEspecialidades(){
      this.isLoading = true
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/especialidades/listar",
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          // Atualize o estado de `data` com os dados da resposta

          const newData = response.data.data.map((value) => {
            return {
              id: value.espec_codigo,
              desc: value.espec_nome,
            };
          });

          this.data = newData
          this.isLoading = false
        })
        .catch((error) => {
          console.error(error);
        });
    },
    criarMedico(){
      this.isLoadingEnviar = true
      this.botaoLabel = 'Carregando ...'
      if(this.especialidade != '' && this.nome != '' && this.crm != ''){
        let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem('token_ti')}`,
        },
      };
      axios
        .post(
          "http://192.168.0.104:8080/api/medicos",
          {
            med_nome: this.nome,
            med_CRM: this.crm,
            med_espec: this.especialidade
          },
          token
        )
        .then((response) => {
          this.isLoadingEnviar = false
          this.$router.push("/medicos");
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
      crm: ref(''),
      icon: ref(false),
      especialidade: ref(null),
    }
  }
})
</script>

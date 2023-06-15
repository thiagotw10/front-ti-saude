<template>
  <div class="q-pa-md">
    <div class="q-gutter-md row items-start">
      <q-input v-model="nome" filled type="text" hint="Nome" />
      <q-input v-model="telefone" filled mask="(##)####-####" hint="Telefone" />
      <q-input
        v-model="dataNascimento"
        filled
        mask="##/##/####"
        hint="Data de nascimento"
      />
      <q-select
        filled
        v-model="plano"
        :options="data"
        option-value="id"
        option-label="desc"
        option-disable="inactive"
        emit-value
        map-options
        hint="Planos de saúde"
        style="min-width: 250px; max-width: 300px"
        :loading="isLoading"
      />
    </div>
    <div class="q-pa-md q-gutter-sm">
      <div style="display: flex; justify-content: flex-end" class="q-pa-md">
        <q-btn
          style="margin: 0 5px"
          label="Voltar"
          color="primary"
          @click="voltar"
          :disabled="isLoadingEnviar"
        />
        <q-btn
          :label="botaoLabel"
          color="primary"
          @click="criarMedico"
          :disabled="isLoadingEnviar"
        />
      </div>
    </div>
  </div>
  <q-dialog v-model="icon">
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">Dados faltando.</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section>
        Todo os campos precisam ser preenchidos.
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
import { defineComponent } from "vue";
import { ref } from "vue";
import axios from "axios";
import { url } from "src/urlApi";

export default defineComponent({
  name: "editarPaciente",
  props: {
    id: {
      type: String,
      default: null,
    },
  },
  data() {
    return {
      data: null,
      isLoading: false,
      isLoadingEnviar: false,
      botaoLabel: "Editar",
    };
  },
  mounted() {
    this.carregarPaciente();
  },
  methods: {
    voltar() {
      this.$router.push("/pacientes");
    },
    async carregarPaciente() {
      this.isLoading = true;
      let token = {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token_ti")}`,
        },
      };
      await axios
        .post(
          `${url}api/planosaude/listar`,
          {
            registro_por_pagina: 10,
          },
          token
        )
        .then((response) => {
          // Atualize o estado de `data` com os dados da resposta

          const newData = response.data.data.map((value) => {
            return {
              id: value.plano_codigo,
              desc: value.plano_descricao,
            };
          });

          this.data = newData;
        })
        .catch((error) => {
          console.error(error);
        });

      await axios
        .get(`${url}api/pacientes/${this.id}`, token)
        .then((response) => {
          this.nome = response.data.pac_nome;
          this.telefone = response.data.pac_telefone;
          this.dataNascimento = response.data.pac_dataNascimento;
          this.plano = response.data.plano_codigo;
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    criarMedico() {
      this.isLoadingEnviar = true;
      this.botaoLabel = "Carregando ...";
      if (this.telefone != "" && this.nome != "" && this.dataNascimento != "") {
        let token = {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token_ti")}`,
          },
        };
        axios
          .put(
            `${url}api/pacientes/${this.id}`,
            {
              pac_nome: this.nome,
              pac_telefone: this.telefone,
              pac_dataNascimento: this.dataNascimento,
              ...(this.plano ? { plano_saude: this.plano } : null),
            },
            token
          )
          .then((response) => {
            this.isLoadingEnviar = false;
            this.$router.push("/pacientes");
          })
          .catch((error) => {
            this.isLoadingEnviar = false;
            this.botaoLabel = "Criar";
            console.error(error);
          });
      } else {
        this.isLoadingEnviar = false;
        this.botaoLabel = "Criar";
        this.icon = true;
      }
    },
  },
  setup() {
    return {
      nome: ref(""),
      telefone: ref(""),
      dataNascimento: ref(""),
      icon: ref(false),
      plano: ref(null),
    };
  },
});
</script>

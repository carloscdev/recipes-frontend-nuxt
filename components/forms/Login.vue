<template>
  <v-card>
    <v-card-title>
      <v-icon class="mr-3">mdi-account-key</v-icon>
      Iniciar Sesión
    </v-card-title>
    <v-card-text>
      <v-form @submit.prevent="onSubmit">
        <v-text-field
          dense
          outlined
          label="Usuario"
          v-model="userInfo.identifier"
        ></v-text-field>
        <v-text-field
          dense
          outlined
          label="Contraseña"
          :type="show ? 'text' : 'password'"
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="show = !show"
          v-model="userInfo.password"
        ></v-text-field>
        <div class="d-flex justify-space-between">
          <v-btn color="primary" small type="submit">Entrar</v-btn>
          <v-btn color="primary" small outlined @click="close()">Cerrar</v-btn>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      userInfo: {
        identifier: "",
        password: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    async onSubmit() {
      try {
        await this.$auth.loginWith("local", { data: this.userInfo });
        this.close();
        this.userInfo.identifier = "";
        this.userInfo.password = "";
        const msg = "Bienvenido" + " " + this.$auth.user.username;
        this.$store.dispatch("snackbars/setSnack", {
          text: msg,
          color: "success",
        });
      } catch (error) {
        this.$store.dispatch("snackbars/setSnack", {
          text: "Verificar usuario o contraseña",
          color: "error",
        });
      }
    },
  },
};
</script>

<style></style>

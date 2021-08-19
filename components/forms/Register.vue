<template>
  <v-card>
    <v-card-title class="title secondary white--text">
      <v-icon class="mr-3" dark>mdi-account-plus</v-icon>
      Registrarse
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-form @submit.prevent="onSubmit()" ref="form">
          <v-text-field
            dense
            outlined
            label="Usuario"
            v-model="userInfo.username"
            :rules="[rules.required]"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            label="Email"
            v-model="userInfo.email"
            :rules="[rules.required, rules.email]"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            label="Contraseña"
            v-model="userInfo.password"
            :rules="[rules.required, rules.min, rules.match]"
            counter
            :type="show ? 'text' : 'password'"
            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show = !show"
          ></v-text-field>
          <v-text-field
            dense
            outlined
            label="Confirmar contraseña"
            v-model="userInfo.repassword"
            :rules="[rules.required, rules.min, rules.match]"
            counter
            :type="show2 ? 'text' : 'password'"
            :append-icon="show2 ? 'mdi-eye' : 'mdi-eye-off'"
            @click:append="show2 = !show2"
          ></v-text-field>
          <div class="d-flex justify-space-between">
            <v-btn color="secondary" type="submit" small>Entrar</v-btn>
            <v-btn color="secondary" small outlined @click="close()">Cerrar</v-btn>
          </div>
        </v-form>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      show2: false,
      rules: {
        required: (value) => !!value || "Este campo es obligatorio",
        min: (value) => (value || "").length >= 8 || "Mínimo 8 caracteres",
        email: (value) => /.+@/.test(value) || "Debe ser un email",
        match: () =>
          this.userInfo.password === this.userInfo.repassword ||
          "Las contraseñas no coinciden",
      },
      userInfo: {
        username: "",
        email: "",
        password: "",
        repassword: "",
      },
    };
  },
  methods: {
    close() {
      this.$emit("close", false);
    },
    async onSubmit() {
      try {
        if (!this.$refs.form.validate()) {
          return;
        }
        this.userInfo.identifier = this.userInfo.username;
        await this.$apollo.mutate({
          mutation: require("~/graphql/register.gql"),
          variables: this.userInfo,
        });
        await this.$auth.loginWith("local", { data: this.userInfo });
        this.close();
        const msg = "Bienvenido" + " " + this.$auth.user.username;
        this.$refs.form.reset();
        this.$store.dispatch("snackbars/setSnack", {
          text: msg,
          color: "success",
        });
      } catch (error) {
        console.log(error);
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

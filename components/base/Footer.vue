<template>
  <v-footer padless>
    <v-row justify="center" no-gutters>
      <v-btn color="primary" small icon>
        <v-icon>mdi-facebook</v-icon>
      </v-btn>
      <v-btn color="primary" small icon>
        <v-icon>mdi-twitter</v-icon>
      </v-btn>
      <v-btn color="primary" small icon>
        <v-icon>mdi-instagram</v-icon>
      </v-btn>
      <v-btn color="primary" small icon>
        <v-icon>mdi-youtube</v-icon>
      </v-btn>
      <v-col class="text-center primary--text" cols="12">
        &copy; {{ new Date().getFullYear() }} - LEC COQ
      </v-col>
    </v-row>
  </v-footer>
</template>

<script>
export default {};
</script>

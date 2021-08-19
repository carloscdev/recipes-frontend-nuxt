<template>
  <v-container>
    <h1 class="secondary--text">
      {{ recipe.name }}
    </h1>
    <h5 class="secondary--text">
      {{ recipe.category.name }}
    </h5>

    <v-card class="mt-3">
      <v-card-title>
        <v-icon class="mr-3">mdi-information</v-icon>
        Información
      </v-card-title>
      <v-card-text class="black--text">
        <v-row>
          <v-col cols="6">
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-group</v-icon>
              Servicios: {{ recipe.servings }}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-clock</v-icon>
              Duración: {{ formatedTime }}
            </v-chip>
            <v-chip color="primary" outlined>
              <v-icon left>mdi-account-edit</v-icon>
              Autor: Carlos
            </v-chip>
            <v-divider class="my-3"></v-divider>
            <h4 class="body-1">Descripcióin</h4>
            <div v-html="recipe.description"></div>
          </v-col>
          <v-col cols="6">
            <v-img :src="recipe.img" max-height="500"></v-img>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
    <div class="mt-3">
      <v-row>
        <v-col cols="5">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-fridge</v-icon>
              Ingredientes
            </v-card-title>
            <v-list>
              <v-list-item v-for="(ingredient, index) in recipe.ingredients" :key="index">
                {{ ingredient }}
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        <v-col cols="7">
          <v-card>
            <v-card-title>
              <v-icon class="mr-3">mdi-stove</v-icon>
              Pasos
            </v-card-title>
            <v-timeline dense>
              <v-timeline-item
                v-for="(step, index) in recipe.steps"
                :key="index + Math.random()"
                color="secondary"
                small
              >
                {{ step }}
              </v-timeline-item>
            </v-timeline>
          </v-card>
        </v-col>
      </v-row>
    </div>
    <div class="mt-3">
      <app-ui-back-btn label="Volver a recetas"></app-ui-back-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  computed: {
    formatedTime() {
      let hours = Math.floor(this.recipe.duration / 60);
      let minutes = this.recipe.duration % 60;
      let total = ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
      return total;
    },
  },
  async asyncData({ app, route }) {
    try {
      const client = app.apolloProvider.defaultClient;
      const id = route.params.recipe;
      const query = {
        query: require("~/graphql/recipe.gql"),
        variables: { id },
      };
      const response = await client.query(query);
      const recipe = response.data.recipe;
      return { recipe };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>

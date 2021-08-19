<template>
  <v-container>
    <h1 class="secondary--text">
      {{ category.name }}
      <v-icon large class="secondary--text">
        {{ category.icon }}
      </v-icon>
    </h1>
    <p class="secondary--text">
      {{ category.description }}
    </p>
    <v-row>
      <v-col cols="4" v-for="recipe in recipes" :key="recipe.id">
        <app-ui-nav-card-recipe :recipe="recipe"></app-ui-nav-card-recipe>
      </v-col>
    </v-row>
    <div class="mt-3">
      <v-alert type="info" v-if="recipes.length == 0">
        No hay recetas, vuelve más tarde
      </v-alert>
    </div>
    <div class="mt-3">
      <app-ui-back-btn></app-ui-back-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    category() {
      const slug = this.$route.params.category;
      return this.$store.getters.readCategories.find((category) => category.slug == slug);
    },
  },
  async asyncData({ app, route }) {
    const slug = route.params.category;
    const client = app.apolloProvider.defaultClient;
    const query = {
      query: require("~/graphql/recipes.gql"),
      variables: { slug },
    };
    try {
      const response = await client.query(query);
      const recipes = await response.data.recipes;
      return { recipes };
    } catch (error) {
      console.log(error);
    }
  },
};
</script>

<style></style>

<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
    >
      <v-list color="primary--text">
        <v-list-item to="/">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title> Inicio </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          v-for="link in links"
          :key="link.id"
          :to="{ name: 'category', params: { category: link.slug } }"
        >
          <v-list-item-icon>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>
              {{ link.name }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="grey lighten-4"
      flat
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu v-model="search" :close-on-content-click="false" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" color="primary" icon>
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title>Buscar receta</v-card-title>
          <v-card-text>
            <v-text-field
              outlined
              label="Nombre receta"
              dense
              v-model="findRecipe"
              @input="searchRecipe()"
            ></v-text-field>
            <v-list v-if="findRecipe.length > 0">
              <v-list-item
                v-for="recipe in recipes"
                :key="recipe.id"
                @click="seeRecipe(recipe.category.slug, recipe.id)"
              >
                {{ recipe.name }}
              </v-list-item>
            </v-list>
          </v-card-text>
        </v-card>
      </v-menu>
      <div v-if="$auth.loggedIn">
        <v-menu v-model="loginmenu" :close-on-content-click="false" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" icon>
              <v-avatar class="secondary">
                <span class="white--text headline">
                  {{ $auth.user.username[0] }}
                </span>
              </v-avatar>
            </v-btn>
          </template>
          <v-card>
            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title>
                    {{ $auth.user.username }}
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    {{ $auth.user.email }}
                  </v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-action>
                  <v-btn to="/user" small>Admin</v-btn>
                </v-list-item-action>
              </v-list-item>
            </v-list>
            <v-card-actions>
              <v-btn text color="primary" @click="loginmenu = false" small>Cerrar</v-btn>
              <v-btn color="primary" @click="logout()" small>Cerrar Sesión</v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </div>
      <div v-else>
        <v-btn
          text
          color="primary"
          @click="
            dialog = true;
            type = 'app-forms-login';
          "
          >Iniciar Sesión</v-btn
        >
        <v-btn
          text
          color="primary"
          @click="
            dialog = true;
            type = 'app-forms-register';
          "
          >Registro</v-btn
        >
      </div>
    </v-app-bar>
    <v-main class="grey lighten-4">
      <Nuxt />
      <v-snackbar
        v-for="(snack, index) in snacks.filter((s) => s.showing)"
        :key="index + Math.random()"
        v-model="snack.showing"
        :color="snack.color"
        :timeout="snack.timeout"
        :style="`bottom: ${index * 60 + 8}px`"
        right
      >
        {{ snack.text }}
        <v-btn slot="action" small icon @click="snack.showing = false">
          <v-icon small>mdi-close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-main>
    <v-dialog v-model="dialog" max-width="600">
      <component :is="type" @close="dialog = $event" />
    </v-dialog>
    <app-base-footer></app-base-footer>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      drawer: false,
      title: "LEC COQ",
      search: false,
      findRecipe: "",
      dialog: false,
      type: "app-forms-login",
      snack: false,
      loginmenu: false,
    };
  },
  computed: {
    ...mapGetters({
      links: "readCategories",
      recipes: "readLoadedRecipes",
      snacks: "snackbars/readSnackbars",
    }),
  },
  methods: {
    seeRecipe(category, recipe) {
      this.$router.push({
        name: "category-recipe",
        params: { category, recipe },
      });
      this.findRecipe = "";
      this.search = false;
    },
    searchRecipe() {
      this.$store.dispatch("searchRecipe", this.findRecipe);
    },
    logout() {
      this.$auth.logout();
      this.loginmenu = false;
    },
    // test() {
    //   this.$store.dispatch("snackbars/setSnack", {
    //     text: "Hola action",
    //     color: "error",
    //   });
    // },
  },
};
</script>

export const strict = false
export const state = () => ({
  counter: 0,
  categories: [],
  loadedRecipes: []
});

export const getters = {
  readCounter(state) {
    return state.counter;
  },
  readCategories(state) {
    return state.categories;
  },
  readLoadedRecipes(state) {
    return state.loadedRecipes;
  }
};

export const mutations = {
  increment(state) {
    state.counter++;
  },
  addCategories(state, payload) {
    state.categories = payload;
  },
  addLoadedRecipe(state, payload) {
    state.loadedRecipes = payload;
  }
};

export const actions = {
  async nuxtServerInit({ commit }) {
    try {
      const client = this.app.apolloProvider.defaultClient;
      const query = {
        query: require("~/graphql/categories.gql")
      };
      const data = await client.query(query);
      commit("addCategories", data.data.categories);
      // commit("addLoadedRecipe", data.data.recipes);
    } catch (error) {
      console.log(error);
    }
  },
  increment(context) {
    setTimeout(() => {
      context.commit("increment");
    }, 1000);
  },
  async searchRecipe({ commit }, payload) {
    try {
      const client = this.app.apolloProvider.defaultClient;
      const query = {
        query: require("~/graphql/searchRecipe.gql"),
        variables: {term: payload}
      };
      const response = await client.query(query)
      console.log(response.data.recipes)
      commit("addLoadedRecipe", response.data.recipes);
    } catch (error) {
      console.log(error);
    }
  }
};

export const state = () => ({
  collects: [],
  carts: [],
  userInfo: {},
  isMobile: false,
  toast: {
    show: false,
    message: ``,
    status: ``
  }
});

export const mutations = {
  [`set-mobile`](state, payload) {
    state.isMobile = payload;
  },
  [`set-toast`](state, payload) {
    state.toast = {
      ...state.toast,
      ...payload
    };
  },
  [`clear-cart`](state) {
    state.carts = [];
  },
  [`set-user-info`](state, payload) {
    state.userInfo = payload;
  },
  [`handle-add-to-cart`](state) {
    var { collects, carts } = state;

    collects.forEach((collect) => {
      var cart = carts.find((item) => item.id === collect.id);

      if (cart) {
        cart.count++;
      } else {
        carts.push({
          ...collect,
          count: 1
        });
      }
    });

    state.collects = [];
  },
  [`set-specials`](state, payload) {
    state.specials = payload;
  },
  [`set-cart-info`](state, payload) {
    state.carts = payload;
  },
  ['set-commodities'](state, payload) {
    state.commodities = payload;
  },
  ['add-to-collect'](state, payload) {
    for (var i = 0; i < state.collects.length; i++) {
      if (state.collects[i].id === payload.id) {
        state.collects.splice(i, 1);
        return;
      }
    }

    state.collects.push({
      ...payload
    });
  },
  ['delete-form-collect'](state, data) {
    state.collects = state.collects.filter((item) => {
      return item.id !== data.id;
    });
  },
  ['delete-from-cart'](state, data) {
    state.carts = state.carts.filter((item) => {
      return item.id !== data.id;
    });
  },
  ['add-to-cart'](state, payload) {
    var cart = state.carts.find((item) => item.id === payload.id);
    if (cart) {
      cart.count++;
    } else {
      state.carts.push({
        ...payload,
        count: 1
      });
    }
  }
};
export const actions = {
  async nuxtServerInit({ commit }, { app, req }) {
    var userAgent = req.headers[`user-agent`] || ``;
    var isMobile = userAgent.indexOf(`Mobile`) > -1;

    commit(`set-mobile`, isMobile);

    try {
      var { data } = await app.$ajax.get(`/user/info`, null, true);

      commit(`set-user-info`, data);
    } catch (_) {}
  },
  [`clear-cart`](context) {
    return apis.clearCart().then((resp) => {
      context.commit('clear-cart');
    });
  },
  async QUERY_USER_INFO({ commit }) {
    var { data } = await this.$ajax.get(`/user/info`, null, true);

    commit(`set-user-info`, data);
  },
  [`add-to-cart-database`](context, payload) {
    var data = {
      id: payload.id,
      count: payload.count
    };

    return apis.addToCart(data);
  },
  ['add-to-cart-store'](context, data) {
    var carts = context.state.carts;
    var find = carts.find((item) => {
      return item.id === data.id;
    });
    if (find) {
      return Promise.reject();
    } else {
      return context
        .dispatch(`add-to-cart-database`, {
          id: data.id,
          count: 1
        })
        .then(() => {
          context.commit(`add-to-cart`, data);
        });
    }
  },
  [`delete-cart`](context, payload) {
    var data = { id: payload.id };
    apis.deleteCart(data).then((resp) => {
      context.commit(`delete-from-cart`, data);
    });
  },
  [`get-cart-info`](context) {
    if (window.localStorage.getItem(`token`)) {
      apis.getCartInfo().then((resp) => {
        context.commit(`set-cart-info`, resp.data || []);
      });
    }
  },
  [`logout`](context) {
    user.logout().then((resp) => {
      window.localStorage.removeItem('token');
      context.commit(`set-user-info`, {});
    });
  }
};

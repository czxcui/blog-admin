import { defineStore } from "pinia";

import { nextTick } from "vue";

const SettingsStore = defineStore({
  id: "settingsStore",
  state: () => ({
    isReload: true,
  }),
  getters: {},
  actions: {
    reload() {
      this.isReload = false;
      nextTick(() => {
        this.isReload = true;
      });
    },
  },
});

export default SettingsStore;

import type { App } from 'vue'
import { createPinia } from 'pinia'
import { createUnistorage } from 'pinia-plugin-unistorage'

const store = createPinia()

store.use(createUnistorage())

export const setupStore = (app: App<Element>) => {
  app.use(store)
}

export { store }
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/router'
import { apolloProvider } from "@/apollo-config";
import { createPinia } from "pinia";
import 'tailwindcss/tailwind.css'


createApp(App).use(createPinia()).use(router).use(apolloProvider).mount("#app");

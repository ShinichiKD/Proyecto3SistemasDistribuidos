import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
});

// Crear la aplicación
const app = createApp(App);

// Usar plugins
app.use(router);
app.use(vuetify);

// Montar la aplicación
app.mount('#app');

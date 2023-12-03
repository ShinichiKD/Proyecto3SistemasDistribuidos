import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router';

import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css' 
const vuetify = createVuetify({
  components,
  directives,
});

// Crear la aplicación
const app = createApp(App);

// Usar plugins
app.use(router);
app.use(vuetify);
export default createVuetify({
  icons: {
    defaultSet: 'mdi', // This is already the default value - only for display purposes
  },
})
// Montar la aplicación
app.mount('#app');

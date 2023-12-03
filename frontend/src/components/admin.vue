

<template>
    <div class=" h-full w-full flex ">
        
        <div class="w-1/6 h-full bg-slate-200">
            <SidebarAdmin @seleccionarMenu="seleccionarMenu"></SidebarAdmin>
        </div>
        <div class="w-full h-ful">
            <div v-if="menuSeleccionado==='crearUsuario'">
                
                <crearUsuario/>
            </div>
            <div v-if="menuSeleccionado==='infoUsuarios'">
                <InfoUsuarios/>
            </div>
            <div v-if="menuSeleccionado==='mensajeDeEmergencia'">
                mensajeDeEmergencia
            </div>
            <div v-if="menuSeleccionado==='estadisticas'">
                estadisticas
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from './sidebarAdmin.vue';
import crearUsuario from './crearUsuario.vue';
import API from '../api.js';
import Swal from 'sweetalert2'
import InfoUsuarios from './infoUsuarios.vue';
export default {

    data() {
        return {
            menuSeleccionado: 'crearUsuario',
        };
    },
    mounted() {

    },
    methods: {
        seleccionarMenu(menu){
            this.menuSeleccionado = menu;
        }
    },components:{
    SidebarAdmin,
    crearUsuario,
    InfoUsuarios
}


};
</script>
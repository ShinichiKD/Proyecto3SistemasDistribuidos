

<template>
    <div class=" h-full w-full flex ">

        <div class="w-1/6 h-full bg-slate-200">
            <SidebarAdmin @seleccionarMenu="seleccionarMenu"></SidebarAdmin>
        </div>
        <div class="w-full h-ful">
            <div v-if="menuSeleccionado === 'crearUsuario'">

                <crearUsuario />
            </div>
            <div v-if="menuSeleccionado === 'infoUsuarios'">
                <InfoUsuarios />
            </div>
            <div v-if="menuSeleccionado === 'mensajeDeEmergencia'">
                <div>
                    <h1 class="flex justify-center mx-auto text-2xl font-bold mt-2"> Mensaje de emergencia</h1>
                    <div class="flex justify-center mx-auto w-2/3 mt-5">
                        <v-text-field v-model="mensajeEmer" label="Ingresa el mensaje de emergencia"></v-text-field>
                        <v-btn rounded @click="mensajeEmergencia">
                            <span class="material-symbols-outlined">
                                emergency_home
                            </span>
                        </v-btn>
                    </div>

                </div>
            </div>
            <div v-if="menuSeleccionado === 'estadisticas'">
                estadisticas
            </div>
        </div>
    </div>
</template>

<script>
import SidebarAdmin from './sidebarAdmin.vue';
import { io } from "socket.io-client";
import crearUsuario from './crearUsuario.vue';
import API from '../api.js';
import Swal from 'sweetalert2'
import InfoUsuarios from './infoUsuarios.vue';
export default {

    data() {
        return {
            menuSeleccionado: 'crearUsuario',
            mensajeEmer: ""
        };
    },
    mounted() {
        // Obtener el token
        let token = localStorage.getItem("usuario")
        console.log(token);
        if (token) {
            token = JSON.parse(token);
            this.yo = token
            this.socket = io("http://34.176.49.167:3000", {
                query: {
                    userID: token._id,
                    username: token.nombre
                }
            });
        } else {
            console.error('No token found! Redirecting to login...');
        }
    },
    methods: {
        seleccionarMenu(menu) {
            this.menuSeleccionado = menu;
        },
        mensajeEmergencia() {
            this.socket.emit('emergencia', this.mensajeEmer);
            this.mensajeEmer = '';
        },
    }, components: {
        SidebarAdmin,
        crearUsuario,
        InfoUsuarios
    }


};
</script>
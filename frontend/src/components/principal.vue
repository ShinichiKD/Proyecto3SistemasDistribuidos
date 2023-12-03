<template>
    <div class="flex flex-col h-screen w-screen">
        <header class="w-full bg-gray-200 flex justify-between items-center">
            <h1 class="text-xl font-bold my-3">Mi Aplicación</h1>
            <v-btn class="mr-4">Notificación</v-btn>
        </header>

        <div class="flex flex-grow overflow-hidden">
            <div class="w-1/5 border overflow-y-auto"> <!-- Zona Izquierda -->
                <h1 class="text-2xl font-black flex justify-center mb-5 mt-5">Canales</h1>
                <!-- Canales -->
                <div class="flex-col" v-for="canal in canales" :key="canal.id">
                    <!-- Canal General -->
                    <div class="mx-auto border-sm rounded-lg p-5 mt-2 w-1/2 hover:bg-gray-200 hover:text-black relative transition duration-300 ease-in-out"
                        @click="seleccionarCanal(canal)">
                        <div class="flex">
                            <span class="material-symbols-outlined">
                                group
                            </span>
                            <h1 class="mx-auto">{{ canal.nombre }}</h1>
                        </div>
                    </div>
                </div>
            </div>
            <div class="w-3/5 border"> <!-- Zona Centro -->
                <div class="flex mt-2">
                    <h1 class="text-2xl font-black w-4/5 mx-auto mb-5 mt-5" v-if="!modoprivado">Canal de {{ canalSeleccionado.nombre }}</h1>
                    <h1 class="text-2xl font-black w-4/5 mx-auto mb-5 mt-5" v-else>Canal de {{ canalSeleccionado.nombre }}</h1>
                    <v-btn class="mr-4 relative" @click="limpiarChat">Limpiar</v-btn>
                </div>
                <!-- Titulo -->
                <div class="border w-4/5 h-4/5 mx-auto rounded-xl overflow-y-auto"> <!-- Chat de la wea -->
                    <!-- Ejemplo de chat de un usuario -->
                    <div class="ml-5" v-for="(mensaje, index) in mensajes" :key="index">
                        <h1 class="flex mt-1">
                            <p class="font-black">{{ mensaje.usuario }}:</p>{{ mensaje.texto }}
                        </h1>
                    </div>

                </div>
                <!-- Input para enviar mensaje y el boton para enviar -->
                <div class="flex w-4/5 mx-auto mt-2">
                    <v-text-field v-model="mensajeActual" class="flex-grow" label="Escribe pajaron klo"
                        hide-details="auto"></v-text-field>
                    <v-btn @click="enviarMensaje" icon>
                        <span class="material-symbols-outlined">
                            send
                        </span>
                    </v-btn>
                </div>

            </div>
            <div class="w-1/5 border h-full overflow-y-auto"> <!-- Zona Derecha -->
                <h1 class="text-2xl font-black flex justify-center mb-5 mt-5">Usuarios</h1>
                <div class="flex-col ">
                    <!-- Usuarios -->
                    <div class="mx-auto border-sm rounded-lg p-5 mt-2 w-1/2 hover:bg-gray-200 hover:text-black relative transition duration-300 ease-in-out"
                        v-for="(usuario, index) in usuariosConectados" :key="index">
                        <div class="flex" @click="iniciarChatPrivado(usuario)">
                            <span class="material-symbols-outlined">
                                face
                            </span>
                            <p class="mx-auto">{{ usuario.idx }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { io } from "socket.io-client";

export default {
    data() {
        return {
            modoprivado:false,
            socket: null,
            mensajes: [],
            usuariosConectados: [],
            canalSeleccionado: "No Seleccionado",
            mensajeActual: "",
            canales: [
                {
                    id: 1,
                    nombre: "General"
                },
                {
                    id: 2,
                    nombre: "Auxiliar"
                },
                {
                    id: 3,
                    nombre: "Pabellon"
                }
            ]
        };
    },
    mounted() {
        this.socket = io("http://localhost:3000"); // Asegúrate de que la URL sea correcta

        this.socket.on("chat message", (msg) => {
            this.mensajes.push(msg);
        });

        this.socket.on("update user list", (users) => {
            this.usuariosConectados = users;
        });

    },
    methods: {
        seleccionarCanal(canal) {
            this.modoprivado=false;
            this.canalSeleccionado = canal;
            this.socket.emit('join channel', canal.id); // Unirse a la sala del canal
        },
        enviarMensaje() {
            // Asegúrate de incluir el canal actual en el mensaje enviado
            this.socket.emit("chat message", {
                usuario: "NombreUsuario", // Cambia esto por el nombre de usuario real
                texto: this.mensajeActual,
                canal: this.canalSeleccionado.id // Incluye el canal actual
            });
            this.mensajeActual = "";
        },
        iniciarChatPrivado(usuario) {
            this.modoprivado=true;
            // Crear un identificador único para la sala privada
            let roomID = usuario.id < this.socket.id ? `${usuario.id}_${this.socket.id}` : `${this.socket.id}_${usuario.id}`;
            this.socket.emit('join private room', roomID);
            this.canalSeleccionado = { id: roomID, nombre: `Privado con ${usuario.username}` };
            this.mensajes = []; // Limpiar mensajes antiguos
        },
        limpiarChat() {
            this.mensajes = [];
        }

    }
};

</script>
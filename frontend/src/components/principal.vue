<template>
    <div class="flex flex-col h-screen w-screen">
        <header class="w-full bg-gray-200 flex justify-between">
            <h1 class="text-xl font-bold my-3" v-if="token">Este soy yo: {{ token.nombre }}</h1>
            <div class="my-3">
                <v-btn class="mr-4" @click="correo = true">Correo
                    <v-menu activator="parent">
                        <div class="bg-white rounded border mt-1 w-[250px]">
                            <h1 class="flex justify-center mt-5 text-2xl"> Notificaciones </h1>
                            <div class="ml-5" v-for="(element, index) in notificacion" :key="index">
                                <div class="p-5 border mx-5 my-5 rounded-xl"
                                    v-if="element.escorreo == true && token.nombre == element.nombreemisor && element.aceptado == null">
                                    <h1>Has enviado una peticion: {{ element.mensaje }}</h1>
                                </div>
                                <div class="p-5 border mx-5 my-5 rounded-xl"
                                    v-if="element.escorreo == true && token.nombre == element.nombreemisor && element.aceptado != null">
                                    <h1 v-if="element.aceptado">Tu peticion: {{ element.mensaje }}, ha sido aceptada</h1>
                                    <h1 v-else>Tu peticion: {{ element.mensaje }}, ha sido rechazada</h1>
                                </div>
                                <div class="p-5 border mx-5 my-5 rounded-xl"
                                    v-if="element.escorreo == true && token.nombre != element.nombreemisor && token.rol == element.rol && element.aceptado == null">
                                    <h1>Mensaje de {{ element.nombreemisor }}: {{ element.mensaje }}</h1>
                                    <div>
                                        <v-btn size="sm" @click="realizarPeticion(element, true)">
                                            <span class="material-symbols-outlined">
                                                done
                                            </span>
                                        </v-btn>
                                        <v-btn size="sm" @click="realizarPeticion(element, false)">
                                            <span class="material-symbols-outlined">
                                                close
                                            </span>
                                        </v-btn>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </v-menu>
                </v-btn>
                <v-btn class="mr-4" @click="mensajeria = true" v-if="!esAuxiliar">Mensajeria
                    <span class="material-symbols-outlined">
                        message
                    </span>
                </v-btn>
            </div>

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
            <div class="w-3/5 h-full border"> <!-- Zona Centro -->
                <div class="flex mt-2 h-[5vh] ">
                    <h1 class="text-2xl font-black w-4/5 mx-auto mb-5 mt-5" v-if="!modoprivado">Canal de {{
                        canalSeleccionado.nombre }}</h1>
                    <h1 class="text-2xl font-black w-4/5 mx-auto mb-5 mt-5" v-else>Canal de {{ canalSeleccionado.nombre }}
                    </h1>
                    <v-btn class="mr-4 relative" @click="limpiarChat">Limpiar</v-btn>
                </div>
                <!-- Titulo -->
                <div class="border w-4/5 h-[70vh] mx-auto rounded-xl overflow-y-auto"> <!-- Chat de la wea -->
                    <!-- Ejemplo de chat de un usuario `text-${element.esEmergencia ? 'colortexto' : 'black'}` -->
                    <div class="ml-5" v-for="(element, index) in mensajes" :key="index">
                        <div class="flex" v-if="element.escorreo != true">
                            <p class="font-black" v-if="element.nombreemisor == token.nombre">yo:</p>
                            <p class="font-black" v-else>{{ element.nombreemisor }}:</p>
                            <span :style="{ color: element.color }" :class="['flex', 'mt', `font-${element.negrita ? 'bold' : ''}`,
                                `${element.italica ? 'italic' : ''}`,
                                `${element.subrayado ? 'underline' : ''}`,

                            ]">{{ element.mensaje }}
                            </span>
                        </div>
                    </div>

                </div>
                <div class=" h-[5vh]  w-4/5 mx-auto flex gap-4">
                    <v-btn class="h-full" @click="dialog = true">
                        Menu color
                        <div :style="{ background: colortexto }" class="h-[20px] w-[20px]">

                        </div>
                    </v-btn>
                    <v-checkbox v-model="italica" label="Italica"></v-checkbox>
                    <v-checkbox v-model="negrita" label="Negrita"></v-checkbox>
                    <v-checkbox v-model="subrayado" label="Subrayado"></v-checkbox>
                </div>

                <!-- Input para enviar mensaje y el boton para enviar -->
                <div class="flex w-4/5 h-[5vh] mx-auto mt-2">
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
                    <div @click="iniciarChatPrivado(usuario)"
                        class="mx-auto border-sm rounded-lg p-5 mt-2 w-1/2 hover:bg-gray-200 hover:text-black relative transition duration-300 ease-in-out"
                        v-for="(usuario, index) in usuariosConectados" :key="index">
                        <div class="flex">
                            <span class="material-symbols-outlined">
                                face
                            </span>
                            <p class="mx-auto">{{ usuario.username }}</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <v-dialog v-model="dialog" width="auto">
            <v-card>
                <v-card-text>
                    <v-color-picker hide-sliders v-model="colortexto" :modes="['hexa']"></v-color-picker>

                </v-card-text>
                <v-card-actions>
                    <v-btn color="primary" block @click="dialog = false">volver</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-dialog v-model="mensajeria">
            <v-card class="w-1/2 h-[500px] mx-auto overflow-y-auto">
                <div class="flex flex-col">
                    <h1 class="mx-auto mt-5 text-2xl font-bold">Mensajeria</h1>
                    <v-select v-model="mensajeria_seleccionada" class="mt-2 mx-5" :items="items"
                        label="Selecciona el canal"></v-select>
                    <v-textarea v-model="mensajeria_texto" class="mt-2 mx-5" label="Escribe tu mensaje aqui"
                        hide-details="auto"></v-textarea>
                    <div class="flex justify-between">
                        <v-btn class="mt-5 ml-5 mb-5" @click="mensajeria = false">
                            <span class="material-symbols-outlined">
                                arrow_back
                            </span>
                            Volver
                        </v-btn>
                        <v-btn class="mt-5 mr-5 mb-5" @click="enviarMensajeriaCanal">
                            Enviar mensaje
                            <span class="material-symbols-outlined">
                                send
                            </span>
                        </v-btn>
                    </div>
                    <div class="mx-5 flex">
                        <span class="material-symbols-outlined mr-5">
                            info
                        </span>
                        <p>Recuerda: Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda veritatis culpa
                            architecto
                            autem facere deleniti eveniet reiciendis enim delectus deserunt amet, fuga cupiditate labore
                            exercitationem sunt impedit. Quasi, excepturi cupiditate!</p>
                    </div>
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import { io } from "socket.io-client";
import API from "../api";

export default {
    data() {
        return {
            yo: null,
            correo: false,
            token: null,
            esAuxiliar: false,
            modoprivado: false,
            socket: null,
            color: "red",
            colortexto: "#000000",
            negrita: false,
            subrayado: false,
            mensajes: [],
            dialog: false,
            usuariosConectados: [],
            italica: false,
            usuarioSeleccionado: null,
            canalSeleccionado: {
                id: 1,
                nombre: "General"
            },
            mensajeria: false,
            mensajeActual: "",
            items: ["Pabellon", "Admision", "Auxiliar", "Examen", "Medico"],
            mensajeria_seleccionada: null,
            mensajeria_texto: null,
            notificacion: [],
            canales: [
                {
                    id: 1,
                    nombre: "General"
                },
                {
                    id: 2,
                    nombre: "Medico"
                },
                {
                    id: 3,
                    nombre: "Pabellon"
                },
                {
                    id: 4,
                    nombre: "Admision"
                },
                {
                    id: 5,
                    nombre: "Auxiliar"
                },
                {
                    id: 6,
                    nombre: "Examen"
                }
            ],
            tipocorreo: false,
            isAceptado: null,
        };

    },
    mounted() {
        // Obtener el token
        this.seleccionarCanal(this.canales[0])
        this.token = localStorage.getItem("usuario")

        if (this.token) {
            this.token = JSON.parse(this.token);
            if (this.token.rol == "Auxiliar") {
                this.esAuxiliar = true
            } else {
                this.esAuxiliar = false
            }

            this.socket = io("http://localhost:3000", {
                query: {
                    userID: this.token._id,
                    username: this.token.nombre
                }
            });
        } else {
            // Manejar la falta del token o redirigir al usuario a la página de inicio de sesión
            console.error('No token found! Redirecting to login...');
            // Redirige al usuario o muestra un mensaje de error
        }

        this.socket.on("chat message", (msg) => {

            this.mensajes.push(msg.mensaje);

            console.log(msg)
        });

        this.socket.on('emergencia', (msg) => {
            this.mensajes.push({
                usuario: { nombre: '¡EMERGENCIA!' },
                texto: msg,
                esEmergencia: true
            });
        });

        this.socket.on('notificacion', (msg) => {
            this.notificacion.push(msg)
        });

        this.socket.on('notificacion eliminada', (msg) => {
            console.log("recibido notificcaciona  aeliniads", msg) 
            console.log("todas notificaciones", this.notificacion)
            const indice = this.notificacion.findIndex(item => item.nombreemisor === msg.nombreemisor && item.mensaje === msg.mensaje && item.aceptado === msg.aceptado && item.rol === msg.rol && item.escorreo === msg.escorreo);
            console.log("indice", indice)
            if (indice !== -1) {
                console.log("eliminado")
                this.notificacion.splice(indice, 1);
            }
        });


        this.socket.on("update user list", (users) => {
            console.log("hola", users);
            this.usuariosConectados = users;
            // Recorro los usuarios y elimino de la lista de los usuarios el mismo id de mi token
            this.usuariosConectados.forEach((usuario, index) => {
                console.log("a-", index)
                if (usuario.id == this.token._id) {
                    console.log("hola 2", usuario);
                    this.usuariosConectados.splice(index, 1);
                }
            });
        });
    },
    methods: {
        realizarPeticion(notificacion, accion) {
            this.socket.emit('notificacion eliminada', notificacion);
            if (accion) {
                this.isAceptado = true
            } else {
                this.isAceptado = false
            }
            notificacion.aceptado = this.isAceptado
            this.socket.emit("notificacion", notificacion);
        },
        async seleccionarCanal(canal) {
            console.log(canal)
            this.mensajes = []
            await API.getChat(canal.nombre)
                .then((res) => {
                    console.log(res)
                    if (res != null) {
                        this.mensajes = res.mensaje
                    }


                })
                .catch((err) => {
                    console.log(err)
                })
            this.modoprivado = false;
            this.canalSeleccionado = canal;
            this.socket.emit('join channel', canal.id); // Unirse a la sala del canal
        },
        enviarNotificacion() {
            let notificacion = {
                mensaje: this.mensajeria_texto,
                nombreemisor: this.token.nombre,
                escorreo: this.tipocorreo,
                aceptado: this.isAceptado,
                rol: this.mensajeria_seleccionada,
            }
            this.socket.emit("notificacion", notificacion);
        },
        async enviarMensaje() {
            // Asegúrate de incluir el canal actual en el mensaje enviado
            const mensaje = {
                participantes: [],
                mensaje: this.mensajeActual,
                nombreemisor: this.token.nombre,
                color: this.colortexto,
                italica: this.italica,
                negrita: this.negrita,
                subrayado: this.subrayado,
            }

            if (this.modoprivado) {
                mensaje.participantes.push(this.token._id)
                mensaje.participantes.push(this.usuarioSeleccionado)
                await API.addMensaje(mensaje)
                    .then((res) => {
                        console.log(res)

                    })
                    .catch((err) => {
                        console.log(err)
                    })

            } else {

                await API.addmensajetochat({
                    mensaje: mensaje,
                    tipo: this.canalSeleccionado.nombre
                })
                    .then((res) => {
                        console.log(res)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }



            this.socket.emit("chat message", {
                mensaje: mensaje,
                canal: this.canalSeleccionado.id // Incluye el canal actual
            });
            this.mensajeActual = "";
        },
        async iniciarChatPrivado(usuario) {
            console.log(usuario)
            console.log(this.socket.id)
            this.modoprivado = true;
            this.usuarioSeleccionado = usuario.id;
            // Crear un identificador único para la sala privada
            let roomID = usuario.id < this.token._id ? `${usuario.id}_${this.token._id}` : `${this.token._id}_${usuario.id}`;
            this.socket.emit('join private room', roomID);
            this.canalSeleccionado = { id: roomID, nombre: `Privado con ${usuario.username}` };
            await API.getChatPrivados(usuario.id, this.token._id)
                .then((res) => {
                    console.log(res)
                    if (res != null) {
                        this.mensajes = res
                    }
                })
                .catch((err) => {
                    console.log(err)
                })

        },
        async enviarMensajeriaCanal() {
            if (this.mensajeria_seleccionada != null && this.mensajeria_texto != null) {
                var posicion = this.obtenerPosicionEnCanales(this.mensajeria_seleccionada, this.canales)
                console.log("Posicion", posicion)
                var canalMensajeria = {
                    id: posicion,
                    nombre: this.mensajeria_seleccionada
                }
                await this.seleccionarCanal(canalMensajeria)
                this.mensajeActual = this.mensajeria_texto
                this.isAceptado = null
                this.tipocorreo = true
                await this.enviarMensaje()
                this.enviarNotificacion()
                this.mensajeria = false
                this.isAceptado = null
                this.tipocorreo = false
                this.mensajeria_texto = null
                this.seleccionarCanal(this.canales[0])
            }
        },
        obtenerPosicionEnCanales(nombre, listaCanales) {
            var posicion = -1;
            for (var i = 0; i < listaCanales.length; i++) {
                if (listaCanales[i].nombre === nombre) {
                    posicion = i;
                    break;
                }
            }
            return posicion;
        },
        limpiarChat() {
            this.mensajes = [];
        }

    }
};

</script>
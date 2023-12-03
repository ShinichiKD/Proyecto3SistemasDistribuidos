<template>
    <div class="h-[88vh] ">
        <v-data-table :headers="encabezado" editable :items="mostrados" :items-per-page="15"
            :items-per-page-options="paginas" class="h-full w-full ">
            <template v-slot:item.contra="{ item }">
                {{ item.contra  }}
                <v-icon small @click="editItem(item)">mdi-pencil</v-icon>
            </template>

        </v-data-table>
        <v-dialog v-model="dialog" persistent width="auto" >
            <v-card>
                <v-card-text class="w-[500px]">
                    <v-text-field v-model="contra" label="contraseña nueva" ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="green-darken-1" variant="text" @click="cambioContra">
                        Guardar
                    </v-btn>
                    <v-btn color="green-darken-1" variant="text" @click="dialog = false">
                        Cancelar
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<script>
import API from '../api';
import Swal from 'sweetalert2'

export default {

    data() {
        return {
            dialog: false,
            encabezado: [
                { title: "Nombre", key: "nombre" },
                { title: "Correo", key: "correo" },
                { title: "Rol", key: "rol" },
                { title: "Contraseña", key: "contra" },
                { title: "Tiempo de uso (Minutos)", key: "tiempodeuso" },
                
            ],
            paginas: [
                { value: 10, title: '10' },
                { value: 15, title: '15' },
                { value: 20, title: '20' },
                { value: 25, title: '25' }
            ],
            mostrados: [],
            correo: "",
            itemEnEdicion: {},
            estadoBoton: false,
        };
    },
    mounted() {
        this.getUsuarios();

    },
    watch: {

    },
    methods: {
        async getUsuarios() {
            await API.getUsuarios().then((resp) => {
                
                this.mostrados = resp;
            });
        }, editItem(item) {
            this.dialog = true;
            this.itemEnEdicion = item;
            console.log(item)
        }, async cambioContra() {
            
            if(this.contra!="" && this.contra!=this.itemEnEdicion.contra){
                this.itemEnEdicion.contra = this.contra;
                await API.updateUsuario(this.itemEnEdicion)
                .then((resp) => {
                    console.log(resp)
                    Swal.fire({
                        icon: "success",
                        
                        text: "Contraseña cambiada con exito"
                    });
                    this.dialog = false;
                });
            }
            else{
                this.dialog = false;
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ingrese una contraseña valida"
                });
            }
        }

    }


};
</script>
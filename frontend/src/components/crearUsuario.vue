<template >
    <div class=" w-full h-full flex flex-col items-center">

        <div class=" h-[250px] w-[400px] my-auto  ">
            <h1 class="pl-8 text-4xl ">Crear usuario</h1>
            <div class="p-8 border-black border-2 rounded-xl">

                <v-form ref="form">
                    <v-text-field v-model="correo" label="correo" required :rules=correoRules></v-text-field>
                    <v-text-field v-model="usuario" label="nombre de usuario" required :rules=usuarioRules></v-text-field>
                    <v-select v-model="rol" :items="roles" label="rol" required></v-select>

                    <v-btn :disabled="estadobtn" @click="login" block class="mt-2">Crear</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>
<script>
import API from '../api.js';
import Swal from 'sweetalert2'
export default {

    data() {
        return {
            usuario: "",
            correo: "",
            rol: "Medico",
            estadobtn: false,
            roles: ["Medico", "Admision", "Pabellon", "Auxiliar", "Examenes"],
            usuarioRules: [
                v => !!v || 'Es necesario ingresar un usuario',

            ],
            correoRules: [
                v => !!v || 'Es necesario ingresar un usuario', v => /@.+\..+/.test(v) || 'Ingrese un correo electrónico válido'

            ],
            contraRules: [
                v => !!v || 'Es necesario ingresar una contraseña',

            ]
        };
    },
    mounted() {

    },
    methods: {
        async login() {
            await this.$refs.form.validate().then(async (resp) => {

                if (resp.valid) {
                    this.estadobtn = true;
                    await API.addUsuario(
                        {
                            correo: this.correo,
                            nombre: this.usuario,
                            rol: this.rol,
                            contra: this.usuario,
                            tiempodeuso: 0
                        }
                    )
                        .then((resp) => {
                            console.log(resp)
                            Swal.fire({
                                icon: "success",

                                text: "Usuario creado con exito"
                            });
                            this.estadobtn = false;


                        }).catch((err) => {
                            console.log(err);
                        });


                    console.log("valido");
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",


                    });
                }
            }).catch((err) => {
                console.log(err);
            });


        }
    }


};
</script>
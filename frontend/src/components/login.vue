<template >
    <div class=" w-full h-full flex flex-col items-center">

        <div class=" h-[250px] w-[400px] my-auto  ">
            <h1 class="pl-8 text-4xl ">SISTEMA DE CHAT</h1>
            <div class="p-8 border-black border-2 rounded-xl">

                <v-form ref="form">
                    <v-text-field v-model="usuario" label="nombre de usuario" required :rules=usuarioRules></v-text-field>

                    <v-text-field v-model="contra" label="contraseña" required :rules=contraRules></v-text-field>

                    <v-btn @click="login" block class="mt-2">Ingresar</v-btn>
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
            usuario: '',
            contra: '',
            usuarioRules: [
                v => !!v || 'Es necesario ingresar un usuario',

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
                    await API.login({ correo: this.usuario, contra: this.contra })
                        .then((resp) => {
                            console.log(resp)
                            if (resp.respuesta) {
                                localStorage.setItem("usuario", JSON.stringify(resp.usuario));
                                Swal.fire({
                                    icon: "success",
                                    title: "Oops...",


                                });
                                this.$router.push({ name: "principal" });
                            } else {
                                Swal.fire({
                                    icon: "error",
                                    title: "Oops...",


                                });
                            }

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
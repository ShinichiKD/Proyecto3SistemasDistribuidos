<template >
    <div class=" w-full h-full flex flex-col items-center">

        <div class=" h-[250px] w-[400px] my-auto  ">
            <h1 class="pl-8 text-4xl ">SISTEMA DE CHAT</h1>
            <div class="p-8 border-black border-2 rounded-xl">

                <v-form ref="form">
                    <v-text-field v-model="usuario" label="nombre de usuario" required :rules=usuarioRules></v-text-field>

                    <v-text-field v-model="contra" label="contraseña" required :rules=contraRules></v-text-field>

                    <v-btn type="submit" @click="login" block class="mt-2">Ingresar</v-btn>
                </v-form>
            </div>
        </div>
    </div>
</template>
<script>
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
    mounted(){
        
    },
    methods: {
        async login() {
            await this.$refs.form.validate().then( (valid) => {
                if (valid) {
                    
                }else{
                    
                }
            }).catch((err) => {
                console.log(err);
            });

           
        }
    }


};
</script>
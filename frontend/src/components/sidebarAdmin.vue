<template>
    <div class="  flex flex-col h-screen gap-2">

        <div class="bg-green-400 h-[40px] rounded-xl gap-2 text-white flex justify-center p-2 m-4
         hover:bg-green-500 hover:transition-colors" @click="seleccionarMenu('crearUsuario')">
            <span>Crear usuario</span>
            <v-icon end icon="mdi-account-plus mdi-36px"></v-icon>
        </div>

        <div class="bg-green-400 h-[40px] rounded-xl gap-2 text-white flex justify-center p-2 m-4
        hover:bg-green-500 hover:transition-colors" @click="seleccionarMenu('infoUsuarios')">
            <span>Información usuarios</span>
            <v-icon end icon="mdi-table-account mdi-36px"></v-icon>
        </div>

        <div class="bg-green-400 h-[40px] rounded-xl gap-2 text-white flex justify-center p-2 m-4
        hover:bg-green-500 hover:transition-colors" @click="seleccionarMenu('mensajeDeEmergencia')">
            <span>Mensaje de emergencia</span>
            <v-icon end icon="mdi-car-brake-alert mdi-36px"></v-icon>
        </div>
        <div class="bg-green-400 h-[40px] rounded-xl gap-2 text-white flex justify-center p-2 m-4
        hover:bg-green-500 hover:transition-colors" @click="seleccionarMenu('estadisticas')">
            <span>Estadisticas</span>
            <v-icon end icon="mdi-calendar-blank-multiple mdi-36px"></v-icon>
        </div>

    </div>
</template>
<script>

export default {

    data() {
        return {

        };
    },
    mounted() {

    },
    methods: {
        seleccionarMenu(menu) {
            this.$emit('seleccionarMenu', menu);
        }
    }


};
</script>
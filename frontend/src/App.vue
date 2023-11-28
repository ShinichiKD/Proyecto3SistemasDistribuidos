<script >
import login from './components/login.vue'
export default {
    name: "MapboxMap",
    data() {
        return {
            
        };
    },
    mounted() {

    },
    methods:{
        
    },

    components: { login }
};
</script>

<template> 
  <div id="app" class=" h-screen w-screen ">
    <router-view></router-view>
    <login />
  </div>
 
</template>
<style >

</style>

<template>
  <q-page class="q-py-sm">
    <Dashboard/>
  </q-page>
</template>

<script>
import Dashboard from '../components/Dashboard.vue'
import { mapState } from 'vuex'
export default {
  name: 'PageIndex',
  components:{
    Dashboard,
  },
  computed:{
    ...mapState('user', ['user','webAppUrl']),
  },
  created(){
    if(!this.webAppUrl){
      this.$router.push('/')
    }
  },
  mounted(){

  }
}
</script>
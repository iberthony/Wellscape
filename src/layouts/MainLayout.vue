<template>
  <q-layout view="lHh Lpr lFf" container class="main-container">
    <q-header class="header" bordered v-if="$route.meta.auth" style="border-color:#efefef">
      <q-toolbar class="bg-white">
        <q-toolbar-title>
          <img
            alt="Quasar logo"
            src="~assets/logo.png"
            style="height: 25px"
          >
        </q-toolbar-title>
        <q-badge
          :key="is_online ? '1' : '0'"
          rounded
          :color="is_online ? 'green' : 'red'"
          class="q-mr-md" />
        <q-btn
          size="md"
          flat
          round
          dense
          color="grey"
          icon="notifications_none" />
        <q-btn
          size="md"
          flat
          round
          dense
          color="grey"
          icon="o_account_circle" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Essential Links
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink.vue'
import { LocalStorage } from 'quasar'
import { mapState } from 'vuex'
const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',
  components: { EssentialLink },
  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      userOnline:true
    }
  },
  computed:{
    ...mapState('user', ['is_online']),
  },
  created(){
    /*
  const getTime = () =>  Date.now()
  setInterval(() => {
  
       try {
      this.$axios.get('https://random-data-api.com/api/cannabis/random_cannabis?size=1&time='+getTime()).then((res) => {
         console.log(res, 'test 0')
        this.userOnline = true
         this.$store.commit('user/setOnline',true)
      }).catch((error) => {
            console.log(error, 'test 1')
        this.userOnline = false
            this.$store.commit('user/setOnline',false)
      }) 
       } catch (error){
              console.log(error, 'test 2')
          this.userOnline = false
            this.$store.commit('user/setOnline',false)
       }
    }, 3000)
    */
    const webAppUrl = LocalStorage.getItem('webAppUrl')
    const user = LocalStorage.getItem('user')
    if(webAppUrl){
      this.$store.commit('user/setWebUrl',webAppUrl)
    }
    if(user && webAppUrl){
      this.$store.commit('user/setUser',user)
      this.$router.push('/dashboard')
    }
  }
}
</script>

<style scoped>
.main-container{
  height: 100vh;
  max-width: 400px;
  margin: 0 auto;
}
.header {
padding-top: env(safe-area-inset-top);
}
</style>

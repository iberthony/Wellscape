<template>
  <q-page class="flex flex-center login-page">
    <q-card flat class="full-width">
      <q-card-section class="q-py-none row justify-center">
        <img
          alt="Quasar logo"
          src="~assets/logo.png"
          style="width: 200px; height: 35px"
        >
      </q-card-section>
      <q-card-section class="q-py-none">
        <p class="full-width" :style="{textAlign:'center', color:'#333', margin:20, fontFamily:'Montserrat-Bold'}">Application Set-Up</p>
        <p class="text-center" v-show="is_loading || is_loading2">
          <q-spinner-ios
            color="black"
            size="2.5em"
            :thickness="2"
          />
        </p>
      </q-card-section>
      <q-card-section v-show="!is_loading && !is_loading2">
        <div class="row q-mb-xl">
          <q-btn
            color="black"
            round
            size="md"
            :outline="step == 1"
            icon="fas fa-building"
          />
          <div class="col-grow row items-center justify-center q-px-sm">
            <q-space style="border:grey 0.1px solid;height:0"/>
          </div>
          <q-btn
            round
            size="md"
            outline
            :color="step == 1 ? 'grey' : 'black'"
            icon="person_outline"
          />
        </div>
        <q-form
          v-show="step == 2"
          ref="login_form"
          class="q-gutter-y-sm"
          @submit="login(form)"
          greedy>
          <q-input
            ref="username"
            outlined
            v-model="form.username"
            label="Username"
            :rules="[val => !!val || 'Username is required']"
            lazy-rules
            hide-bottom-space
          />
          <q-input
            ref="password"
            type="password"
            outlined
            v-model="form.password"
            label="Password"
            :rules="[val => !!val || 'Password is required']"
            lazy-rules
          />
          <p class="q-mt-none" :style="$style.errorMessage" v-if="error1">{{error1}}</p>
          <div class="row justify-around q-gutter-x-sm">
            <div class="col">
              <q-btn 
                :disable="is_loading2"
                size="md"
                padding="md"
                style="border-radius:10px"
                class="full-width"
                color="dark"
                @click="step = 1"
                label="Back"
              />
            </div>
            <div class="col">
              <q-btn 
                :disable="form.username.length == 0 || form.password.length == 0"
                :loading="is_loading"
                size="md"
                padding="md"
                style="border-radius:10px"
                class="full-width"
                color="dark"
                type="submit"
                label="Next"
              />
            </div>
          </div>
          
        </q-form>
        <q-form
          v-show="step == 1"
          ref="login_form"
          class="q-gutter-y-sm"
          @submit="verifyCompany(form2)"
          greedy>
          <q-input
            ref="company"
            outlined
            v-model="form2.company"
            label="Company"
            :rules="[val => !!val || 'Company is required']"
            lazy-rules
            hide-bottom-space
          />
          <q-input
            ref="companyCode"
            type="password"
            outlined
            v-model="form2.companyCode"
            label="Company Code"
            :rules="[val => !!val || 'Company Code is required']"
            lazy-rules
          />
          <p class="q-mt-none text-red text-capitalize" v-if="error2">{{error2}}</p>
          <q-btn 
            :disable="form2.company.length == 0 || form2.companyCode.length == 0"
            :loading="is_loading2"
            size="md"
            padding="md"
            style="border-radius:10px"
            class="full-width"
            color="dark"
            type="submit"
            label="Next"
          />
        </q-form>
      </q-card-section>
    </q-card>
    
    
  </q-page>
</template>

<script>
import { LocalStorage } from 'quasar'
export default {
  name: 'LoginPage',
  data (){
    return {
      form: {
        username: '',
        password: '',
      },
      form2: {
        company: '',
        companyCode: '',
      },
      step: 1,
      is_loading: false,
      is_loading2: false,
      error1: null,
      error2: null,
    }
  },
  created(){
    const webAppUrl = LocalStorage.getItem('webAppUrl')
    if(webAppUrl){
      this.$store.commit('user/setWebUrl',webAppUrl)
      this.step = 2
    }
    const user = LocalStorage.getItem('user')
    console.log(user)
    if(user && this.step == 2){
      this.$store.commit('user/setUser',user)
      this.$router.push('/dashboard')
    }
  },
  mounted(){
    
  },
  methods:{
    login(form){
      if(this.is_loading) return
      this.is_loading = true
      this.error1 = null
      this.$store.dispatch('user/loginUser',form)
      .then((response) => {
        if(response.data.error){
          this.error1 = response.data.error
        }else{
          this.$router.push('/dashboard')
        }
        this.is_loading = false
        console.log(response.data)
      })
      .catch((error) => {
        this.is_loading = false
        console.log(error)
      })
    },
    verifyCompany(form){
      if(this.is_loading2) return
      this.is_loading2 = true
      this.error2 = null
      this.$store.dispatch('user/verifyCompany',form)
      .then((response) => {
        this.is_loading2 = false
        if(response.data.error){
          this.error2 = response.data.error
        }else{
          this.step = 2
        }
      })
      .catch((error) => {
        this.is_loading2 = false
        console.log(error)
      })
    }
  }
}
</script>

<style lang="scss">
.login-page{
  .q-field__control {
    border-radius: 15px !important;
  }
  
  .q-stepper__tab{
    padding: 0;
  }
  .q-stepper__step-content{
    .q-stepper__step-inner{
      padding: 0;
    }
  }
}

</style>
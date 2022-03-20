<template>
  <div class="row q-gutter-y-md dashboard">
    <div class="col-12 row">
      <div class="col-6 q-px-xs">
        <q-btn
          padding="15px 0"
          flat
          class="full-width"
          label="Well Activity"
          icon="add"
          text-color="white"
          style="border-radius:10px;background:#7ab929" />
      </div>
      <div class="col-6 q-px-xs">
        <q-btn
          @click="add_psi = true"
          padding="15px 0"
          flat
          class="full-width"
          label="PSI Reading"
          icon="add"
          text-color="white"
          style="border-radius:10px;background:#7ab929" />
      </div>
    </div>
    <div class="col-12 q-px-xs">
      <q-list bordered separator class="rounded-borders">
        <q-expansion-item
          switch-toggle-side
          expand-separator
          label="Pressure Readings"
          header-class="text-uppercase text-bold expansion-header q-px-sm"
        >
          <q-separator />
          <q-card v-if="pressure_readings.length">
            <q-card-section>
              <q-list class="q-px-none">
                <q-item
                  class="q-px-none expansion-header"
                  :key="'reading-'+index"
                  v-for="(item,index) of pressure_readings">
                  <q-item-section side top>
                    <q-badge
                      class="q-mt-sm"
                      rounded
                      color="black" />
                  </q-item-section>
                  <q-item-section top class="q-px-none">
                    <q-item-label>
                      <span class="text-subtitle1" :style="$style.title">
                        {{item.well_title}} - {{item.dated}}
                      </span>
                    </q-item-label>
                    <q-item-label class="q-gutter-x-sm">
                      <span :style="$style.titleSmall">
                        Reading A(PSI):{{item.reading_a}}
                      </span>
                      <span :style="$style.titleSmall">
                        B(PSI):{{item.reading_b}}
                      </span>
                      <span :style="$style.titleSmall">
                        C(PSI):{{item.reading_c}}
                      </span>
                    </q-item-label>
                    <q-item-label class="q-gutter-x-sm">
                      <span :style="$style.titleSmall">
                        <q-icon name="comment" style="color:#ccc"/>
                        {{item.comment}}
                      </span>
                    </q-item-label>
                    <q-item-label class="q-gutter-x-sm">
                      <span :style="$style.titleSmall">
                        <q-icon name="perm_identity" style="color:#ccc"/>
                        {{item.author_name}}
                      </span>
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          expand-separator
          label="Upcoming Activity"
          header-class="text-uppercase text-bold expansion-header q-px-sm"
        >
          <q-separator />
          <q-card v-if="activities.upcoming">
            <q-card-section>
              <q-list>
                <q-item-label class="q-mb-sm text-body1">
                  INSPECTION
                </q-item-label>
                <q-item-label class="q-mb-sm" v-if="activities.upcoming.inspection.length == 0">
                  <span class="text-subtitle1">
                    No data to load.
                  </span>
                </q-item-label>
                <template v-else>
                  <q-item
                    class="q-px-none expansion-header"
                    dense
                    v-for="(item,index) of activities.upcoming.inspection"
                    :key="'upcoming-inspection-'+index">
                    <q-item-section side top>
                      <q-badge
                        class="q-mt-sm"
                        rounded
                        color="black" />
                    </q-item-section>
                    <q-item-section top class="q-px-none">
                      <q-item-label>
                        <span class="text-subtitle1">
                          {{item.post_title}} - {{item.cm_next_inspection_date}}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <q-item-label class="q-my-sm text-body1">
                  MAINTENANCE
                </q-item-label>
                <q-item-label class="q-mb-sm" v-if="activities.upcoming.maintenance.length == 0">
                  <span class="text-subtitle1">
                    No data to load.
                  </span>
                </q-item-label>
                <template v-else>
                  <q-item
                    class="q-px-none expansion-header"
                    dense
                    v-for="(item,index) of activities.upcoming.inspection"
                    :key="'upcoming-maintenance-'+index">
                    <q-item-section side top>
                      <q-badge
                        class="q-mt-sm"
                        rounded
                        color="black" />
                    </q-item-section>
                    <q-item-section top class="q-px-none">
                      <q-item-label>
                        <span class="text-subtitle1">
                          {{item.post_title}} - {{item.cm_next_maintenance_date}}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-expansion-item
          switch-toggle-side
          expand-separator
          label="Overdue Activity"
          header-class="text-uppercase text-bold expansion-header q-px-sm"
          expand-icon="expand_more"
        >
          <q-separator />
          <q-card v-if="activities.overdue">
            <q-card-section>
              <q-list>
                <q-item-label class="q-mb-sm text-body1">
                  INSPECTION
                </q-item-label>
                <q-item-label class="q-mb-sm" v-if="activities.overdue.inspection.length == 0">
                  <span class="text-subtitle1">
                    No data to load.
                  </span>
                </q-item-label>
                <template v-else>
                  <q-item
                    class="q-px-none expansion-header"
                    dense
                    v-for="(item,index) of activities.overdue.inspection"
                    :key="'overdue-inspection-'+index">
                    <q-item-section side top>
                      <q-badge
                        class="q-mt-sm"
                        rounded
                        color="black" />
                    </q-item-section>
                    <q-item-section top class="q-px-none">
                      <q-item-label>
                        <span class="text-subtitle1">
                          {{item.post_title}} - {{item.cm_next_inspection_date}}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
                <q-item-label class="q-my-sm text-body1">
                  MAINTENANCE
                </q-item-label>
                <q-item-label class="q-mb-sm" v-if="activities.overdue.maintenance.length == 0">
                  <span class="text-subtitle1">
                    No data to load.
                  </span>
                </q-item-label>
                <template v-else>
                  <q-item
                    class="q-px-none expansion-header"
                    dense
                    v-for="(item,index) of activities.overdue.inspection"
                    :key="'overdue-maintenance-'+index">
                    <q-item-section side top>
                      <q-badge
                        class="q-mt-sm"
                        rounded
                        color="black" />
                    </q-item-section>
                    <q-item-section top class="q-px-none">
                      <q-item-label>
                        <span class="text-subtitle1">
                          {{item.post_title}} - {{item.cm_next_maintenance_date}}
                        </span>
                      </q-item-label>
                    </q-item-section>
                  </q-item>
                </template>
              </q-list>
            </q-card-section>
          </q-card>
        </q-expansion-item>
      </q-list>
    </div>

    <q-dialog
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
      v-model="add_psi">
      <q-card class="add_psi">
        <q-card-section class="row items-center q-py-none q-px-xs">
          <div class="text-h6 full-width relative-position">
            <q-btn
              color="blue-6"
              size="sm"
              icon="arrow_back_ios_new"
              flat
              round
              dense
              @click="add_psi=false;resetForm()">
              <span
                class="relative-position text-subtitle1 text-blue-6">
                Back
              </span>
            </q-btn>
            <span
              class="absolute-center text-body1 q-pt-xs text-bold">
              New PSI Reading
            </span>
          </div>
        </q-card-section>

        <q-card-section class="q-px-xs" v-if="!selected_well">
          <q-input
            dense
            borderless
            v-model="search_well"
            placeholder="Search"
            class="shadow-4 q-px-xs rounded-borders">
            <template v-slot:prepend>
              <q-icon name="search" />
            </template>
          </q-input>
          <template v-if="wells.length && search_well.length">
            <q-list>
              <q-item
                clickable
                v-ripple
                v-for="(item,index) in wells.filter(x => x.post_title.includes(search_well))"
                :key="'well-'+index"
                @click="selected_well = item;search_well = ''">
                <q-item-section>
                  {{item.post_title}}
                </q-item-section>
                <q-item-section side>
                  <q-icon name="navigate_next"/>
                </q-item-section>
              </q-item>
            </q-list>
          </template>
        </q-card-section>
        <q-card-section class="q-px-xs" v-else>
          <q-item class="q-px-none">
            <q-item-section class="shadow-4">
              <q-item-label class="text-center">
                <span class="q-gutter-x-xs">
                  <span>
                    Selected Well: {{selected_well.post_title}}
                  </span>
                  <q-icon
                    @click="selected_well = null;resetForm()"
                    size="sm"
                    color="grey-7"
                    name="close" />
                </span>
              </q-item-label>
            </q-item-section>
          </q-item>
          <q-item>
            <q-item-section class="q-px-none">
              <q-form
                ref="add_well"
                class="row q-gutter-y-md"
                
                @submit="submitPSI()">
                <div class="col-12" >
                  <q-input outlined type="date" v-model="form.idate"/>
                </div>
                <div class="col-12 row q-gutter-x-xs">
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="form.reading_a"
                      type="number"
                      step="0.01"
                      placeholder="Reading A"
                      :rules="[val => !!val && val > 0 || 'Invalid reading']"
                      lazy-rules 
                      hide-bottom-space/>
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="form.reading_b"
                      type="number"
                      step="0.01"
                      placeholder="Reading B"
                      :rules="[val => !!val && val > 0 || 'Invalid reading']"
                      lazy-rules 
                      hide-bottom-space/>
                  </div>
                  <div class="col">
                    <q-input
                      dense
                      outlined
                      v-model="form.reading_c"
                      type="number"
                      step="0.01"
                      placeholder="Reading C"
                      :rules="[val => !!val && val > 0 || 'Invalid reading']"
                      lazy-rules 
                      hide-bottom-space/>
                  </div>
                </div>
                <div class="col-12">
                  <q-input
                    v-model="form.comment"
                    placeholder="Comments"
                    outlined
                    autogrow
                    :input-style="{'min-height':'100px'}"/>
                </div>
                <div class="col-12">
                  <q-field
                    outlined
                    placeholder="Outlined"
                    stack-label
                    dense>
                    <template v-slot:control>
                      <div class="self-center full-width no-outline" tabindex="0" @click="openCamera()">
                        {{form.file ? form.file.name : 'Choose file'}}
                      </div>
                    </template>
                    <template v-slot:append>
                      <div class="q-gutter-x-sm">
                        <q-icon
                          name="fa fa-folder-open"
                          @click="openCamera()" />
                        <q-icon
                          v-if="form.file && false"
                          name="cancel"
                          @click="form.file = null" />
                      </div>
                    </template>
                  </q-field>
                  <q-file
                    disable
                    v-if="false"
                    v-model="files"
                    dense
                    ref="psi_file"
                    :multiple="false"
                    rounded
                    outlined
                    bottom-slots
                    accept="image/*"
                    label="Choose file">
                    <template v-slot:append>
                      <q-icon name="fa fa-folder-open"/>
                    </template>
                  </q-file>
                </div>
                <div class="col-12">
                  <q-btn
                    :loading="loading"
                    flat
                    type="submit"
                    padding="5px 0"
                    class="full-width"
                    label="Upload"
                    text-color="white"
                    style="border-radius:10px;background:#7ab929" />
                </div>
              </q-form>
            </q-item-section>
          </q-item>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { LocalStorage } from 'quasar'
export default {
  name: 'Dashboard',
  data(){
    return{
      addedFile:null,
      add_psi: false,
      search_well: '',
      selected_well: null,
      loading: false,
      form: {
        post_id: null,
        user_id: null,
        idate: null,
        reading_a: null,
        reading_b: null,
        reading_c: null,
        comment: null,
        file: null,
      },
      to_add_psi: [],
    }
  },
  computed:{
    ...mapState('user', ['user','webAppUrl','pressure_readings','activities','wells','is_online']),
    ...mapState('settings', ['cameraOptions']),
    files(){
      return this.form.file ? [this.form.file] : []
    },
    months(){
      return ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    },
    current_date(){
      let idate = new Date()
      if(this.form.idate){
        idate = new Date(this.form.idate)
      }
      return idate.getDate()+' '+this.months[idate.getMonth()+1]+' '+idate.getFullYear()
    }
  },
  watch:{
    is_online:{
      immediate: true,
      handler(val){
        if(!val) return
        if(this.to_add_psi.length){
          this.submitToAddPsi(this.to_add_psi[0])
        }
      }
    },
    selected_well:{
      deep: true,
      handler(val){
        if(val) {this.form.post_id = val.ID;this.form.user_id = this.user.user_id}
      }
    }
  },
  created(){
    const pressure_readings = LocalStorage.getItem('pressure_readings')
    const activities = LocalStorage.getItem('activities')
    const wells = LocalStorage.getItem('wells')
    if(pressure_readings) this.$store.commit('user/setPressureReadings',pressure_readings)
    if(activities) this.$store.commit('user/setActivities',activities)
    if(wells) this.$store.commit('user/setWells',wells)
    this.resetForm()
  },
  mounted(){
    this.$store.dispatch('user/loadWells')
    this.$store.dispatch('user/dashboardLoad')
  },
  methods:{
    async openCamera(){
      navigator.camera.getPicture(this.cameraSuccess, this.cameraError,this.cameraOptions)
    },

    createFileUrl(val){
      return new Promise((resolve, reject) => {
        window.resolveLocalFileSystemURL(val, function success(fileEntry) {
          resolve(fileEntry)
          navigator.camera.cleanup()
        }, function () {
          // If don't get the FileEntry (which may happen when testing
          // on some emulators), copy to a new FileEntry.
          createNewFileEntry(imgUri);
        });
      })
      
    },

    cameraSuccess(val){
      this.createFileUrl(val)
      .then((response) => {
        console.log(response.nativeURL)
        this.form.file = response
      })
    },

    cameraError(val){
      console.log(val)
    },

    async submitToAddPsi(reading){
      try{
        const obj = {
          post_id: reading.post_id,
          user_id: reading.user_id,
          idate: reading.idate,
          reading_a: reading.reading_a,
          reading_b: reading.reading_b,
          reading_c: reading.reading_c,
          comment: reading.comment,
        }
        // obj.file = reading.file //  ? await this.parseFile(reading.file, 'File') : null
        obj.file = await this.createFileUrl(reading.file)
        await this.$store.dispatch('user/submitPSI',obj)
        const index = this.to_add_psi.findIndex(x => x.add_id == reading.add_id)
        if(index >= 0){
          this.to_add_psi.splice(index,1)
          LocalStorage.set('to_add_psi', this.to_add_psi)
        }
        if(this.to_add_psi.length){
          this.submitToAddPsi(this.to_add_psi[0])
        }else{
          this.$store.dispatch('user/dashboardLoad')
        }
      }catch(error){
        if(this.to_add_psi.length){
        //  this.submitToAddPsi(this.to_add_psi[0])
        }
      }
    },

    parseFile(dataURI) {
      var byopenCameraring = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }
        return new Blob([ab], { type: 'image/png' });
    },

    toBase64(file){
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      })
    },
    
    resetForm(){
      this.form = {
        post_id: null,
        user_id: null,
        idate: null,
        reading_a: null,
        reading_b: null,
        reading_c: null,
        comment: null,
        file: null,
      }
      this.selected_well = null
      const idate = new Date()
      this.form.idate = idate.getFullYear()+'-'+(idate.getMonth() < 10 ? '0'+(idate.getMonth()+1) : (idate.getMonth()+1) )+'-'+idate.getDate()
    },
    
    async addOffline(obj){
      if(!obj) return
     
      if(this.form.file && this.form.file.name){
        // obj.file = await this.toBase64(this.form.file);
        obj.file = this.form.file.nativeURL
        obj.file_name = this.form.file.name
      }

      obj.add_id = new Date().getTime()
      this.to_add_psi.push(obj)
      LocalStorage.set('to_add_psi', this.to_add_psi)
      this.resetForm()
      this.$q.notify({
        timeout: 2000,
        color: 'green',
        message: 'PSI reading will be uploaded when you get back online',
        icon: 'check_circle'
      })
    },

    async submitPSI(){
      try{
        if(this.loading) return
        this.loading = true
        const obj = {
          ...this.form,
          idate: this.current_date,
        }
        if(this.is_online){
          this.addOffline(obj)
        }else{
          await this.$store.dispatch('user/submitPSI',obj)
          this.$store.dispatch('user/dashboardLoad')
          this.$q.notify({
            timeout: 2000,
            color: 'green',
            message: 'PSI reading uploaded',
            icon: 'check_circle'
          })
        }
        
        // const obj2 = {
          //   post_id: this.selected_well.ID,
          //   author_name: 'System',
          //   dated: this.current_date,
          //   reading_a: this.form.reading_a,
          //   reading_b: this.form.reading_b,
          //   reading_c: this.form.reading_c,
          //   comment: this.form.comment,
          //   file_name: '',
          //   timestamp: response.data.dated,
          //   download_href: '',
          // }
          this.loading = false
          this.resetForm()
      }catch(error){
        const obj = {
          ...this.form,
          idate: this.current_date,
        }
        this.addOffline(obj)
        this.loading = false
      }
    }
  }
}
</script>
<style lang="scss">
.dashboard{
  .expansion-header{
    .q-item__section--side{
      min-width: auto !important;
      padding-right: 5px !important;
    }
  }
}
.add_psi{
  .q-field__control {
    border-radius: 10px !important;
  }
}
</style>
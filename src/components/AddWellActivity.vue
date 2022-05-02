<template>
  <div>
    <q-dialog
      @show="askForGPSPermission"
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
      style="max-height: 100vh"
      :value="add_well_activity"
      class="column"
    >
      <q-layout view="hHh lpR fFf" ref="cpage" class="scroll">
        <q-header class="bg-white">
          <q-toolbar class="flex">
            <div style="flex: 1">
              <q-btn
                color="blue-6"
                size="sm"
                icon="arrow_back_ios_new"
                flat
                round
                dense
                style="flex: 1;"
                @click="backHeader">
              <span
                class="relative-position text-subtitle1 text-blue-6">
                Back
              </span>
              </q-btn>
            </div>
            <div>
               <span class="vertical-middle text-body1 text-bold text-black">
              New Well Activty
            </span>
            </div>
            <div style="flex: 1;"></div>
          </q-toolbar>
        </q-header>
        <q-page-container class="bg-white">
          <q-page class="q-px-xs bg-grey-3 q-pb-none q-pt-none">
            <q-stepper
              v-model="step"
              ref="stepper"
              animated
              flat
              header-class="hide-el"
              class="bg-transparent q-pb-lg"
            >
              <q-step
                :name="1"
                title="Lease Area"
                :done="step > 1"
                style="min-height: 200px;"
                class="scroll"
              >
                <q-card flat class="my-card bg-transparent">
                  <q-card-section class="bg-green-brand text-white">
                    <div class="text-body1">INSPECTION DATA</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pa-none">
                    <q-img
                      src="https://placeimg.com/500/300/nature?t=0.43049858038561917"
                      style="height: auto; width: 100%"
                    />
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <div class="row justify-between items-center">
                      <span class="text-weight-bold text-subtitle1">Select Well *</span>
                      <q-btn @click="wellsList = true" icon-right="keyboard_arrow_down" class="text-capitalize text-weight-bold" flat color="grey-9" :label="selected_well ? selected_well.post_title : 'Select Well'"></q-btn>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white q-mb-md">
                    <q-separator class="bg-blue-10 q-mb-lg" />
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <p class="text-weight-medium text-subtitle1">Verify by Scanning QR Code</p>
                    <div style="height: 80px" class="bg-white row justify-center q-py-md">
                      <q-btn @click="openCamera('barcode')" label="Scan Barcode" class="text-capitalize" color="negative" />
                    </div>
                  </q-card-section>
                  <q-card-section class="q-px-none">
                    <div class="row justify-between items-center">
                      <span class="text-weight-medium text-subtitle1">Or Gathering GPS Point</span>
                      <q-btn
                        color="negative"
                        label="Clear"
                        no-caps
                        @click="gpsPoint = ''; gpsAltitude = ''; gpsAccurancy = '';"
                      />
                    </div>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white">
                    <div style="height: 80px" class="flex justify-center">
                      <p class="text-light-blue-9 text-weight-bold q-mb-none">{{ gpsPoint }}</p>
                      <br>
                      <p class="text-light-blue-9 text-weight-bold">Altitude: {{ gpsAltitude }}, Accuracy: {{ gpsAccurancy }} </p>
                    </div>
                    <q-separator class="bg-blue-10 q-mb-lg" />
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <q-input
                      type="date"
                      borderless
                      v-model="inspectionDate"
                    >
                      <template v-slot:prepend>
                        <span class="text-subtitle1">Date</span>
                      </template>
                    </q-input>
                  </q-card-section>
                  <q-card-section class="q-pa-none">
                    <q-input
                      borderless
                      type="time"
                      v-model="inspectionTime">
                      <template v-slot:prepend>
                        <span class="text-subtitle1">Time</span>
                      </template>
                    </q-input>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white">
                    <q-separator class="bg-blue-10 q-mb-lg" />
                  </q-card-section>
                </q-card>
              </q-step>
              <q-step
                :name="2"
                title="Inspection Data"
                :done="step > 2"
                style="min-height: 200px;"
                class="scroll"
              >
                <q-card flat class="my-card">
                  <q-card-section class="bg-green-brand text-white">
                    <div class="text-body1">LEASE AREA</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pa-sm">
                    <div class="row q-mb-lg">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Is the entry to the lease in acceptable condition?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="leaseOptions.acceptableCondition"
                            toggle-color="green"
                            :options="leaseAreaOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <p class="text-subtitle1 text-center text-weight-bold">Some localised rutting, but generally ok</p>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <div class="row q-mb-lg">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Is the signage in tact?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="leaseOptions.signageInTact"
                            toggle-color="green"
                            :options="leaseAreaOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                    <div class="row q-pr-sm">
                      <div class="col-12">
                        <q-input class="text-right" v-model="leaseOptions.signageInTactOptionalComment" borderless label="Optional comment" />
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <div class="row q-mb-lg">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Is the lease clean and tidy?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="leaseOptions.cleanAndTidy"
                            toggle-color="green"
                            :options="leaseAreaOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                    <div class="row q-pr-sm">
                      <div class="col-12">
                        <q-input v-model="leaseOptions.cleanAndTidyOptionalComment" borderless label="Optional comment" />
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <div class="row q-mb-lg">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Is the cellar / grating in acceptable condition ?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="leaseOptions.cellarAcceptableCondition"
                            toggle-color="green"
                            :options="leaseAreaOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                    <div class="row">
                      <div class="col-12">
                        <p class="q-pl-md text-subtitle1 text-weight-bold">Per photo</p>
                      </div>
                    </div>
                  </q-card-section>
                </q-card>
                <q-card flat class="my-card bg-transparent">
                  <q-card-section class="bg-green-brand text-white">
                    <div class="text-body1 text-weight-bold">PHOTOS OF SIGNATURE / CELLAR / LEASE (AS REQUIRED)</div>
                  </q-card-section>
                  <q-card-section class="bg-transparent text-black">
                    <div class="row justify-between items-center">
                      <span class="text-subtitle1 text-weight-medium">Cellar</span>
                      <q-btn color="negative" class="text-capitalize" label="Clear" @click="signaturePhoto = null;"></q-btn>
                    </div>
                    <div class="row justify-center q-my-md">
                      <q-img
                        :src="signaturePhoto"
                        style="width: 100%; height: auto;"
                      />
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-white">
                    <q-field
                      outlined
                      placeholder="Outlined"
                      stack-label
                      dense>
                      <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0" @click="openCamera('signaturePhoto')">
                          Take a Picture
                        </div>
                      </template>
                      <template v-slot:append>
                        <div class="q-gutter-x-sm">
                          <q-icon
                            name="fa fa-camera"
                            @click="openCamera('signaturePhoto')" />
                          <!--                      <q-icon-->
                          <!--                        v-if="form.file && false"-->
                          <!--                        name="cancel"-->
                          <!--                        @click="form.file = null" />-->
                        </div>
                      </template>
                    </q-field>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white">
                    <q-separator class="bg-blue-10 q-mb-lg" />
                  </q-card-section>
                </q-card>
              </q-step>

              <q-step
                title="Wellhead"
                :name="3"
                style="min-height: 200px;"
                class="scroll"
              >
                <q-card flat class="my-card bg-transparent">
                  <q-card-section class="bg-green-brand text-white">
                    <div class="text-body1">WELLHEAD / XMAS TREE</div>
                  </q-card-section>
                  <q-separator />
                  <q-card-section class="q-pa-sm bg-white">
                    <div class="row q-mb-lg">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Well Status</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="wellHead.wellStatus"
                            toggle-color="green"
                            :options="wellStatusOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-subtitle1 text-weight-medium">TUBING</span>
                  </q-card-section>
                  <q-card-section class="q-pa-sm bg-white">
                    <div class="row">
                      <div class="col-6 flex items-center">
                        <p class="text-body1 text-weight-medium q-mb-none">Gauge present?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="wellHead.gaugePresent"
                            toggle-color="green"
                            :options="gaugePresentOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-subtitle1 text-weight-medium">Tubing Head Pressure (psi)</span>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white">
                    <div class="q-px-md">
                      <p class="text-weight-bold">630</p>
                      <p class="text-weight-bold q-mb-lg">Choke fully open</p>
                    </div>
                    <q-separator class="bg-blue-10 q-mb-lg" />
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-body1">PRODUCTION CASING ANNULUS</span>
                  </q-card-section>
                  <q-card-section class="q-pa-sm bg-white">
                    <div class="row">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Gauge present?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="productionCasing.gaugePresent"
                            toggle-color="green"
                            :options="gaugePresentOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-subtitle1 text-weight-medium">Production Casing Pressure (psi)</span>
                  </q-card-section>
                  <q-card-section class="q-px-none bg-white">
                    <div class="q-px-md">
                      <p class="text-weight-bold">180</p>
                      <p class="text-weight-bold q-mb-lg">Approaching MOP, recommend bleed down.</p>
                    </div>
                    <q-separator class="bg-blue-10" />
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-body1">SURFACE CASING ANNULUS</span>
                  </q-card-section>
                  <q-card-section class="q-pa-sm bg-white">
                    <div class="row">
                      <div class="col-6 flex items-center">
                        <p class="text-subtitle1 text-weight-medium q-mb-none">Gauge present?</p>
                      </div>
                      <div class="col-6 row justify-end">
                        <div>
                          <q-btn-toggle
                            v-model="surfaceCasing.gaugePresent"
                            toggle-color="negative"
                            :options="gaugePresentOptions"
                            size="md"
                            color="grey-5"
                            padding="8px"
                            class="style-toggle"
                            unelevated
                          >
                          </q-btn-toggle>
                        </div>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="q-pa-sm">
                    <span class="text-body1">Surface Casing Pressure (psi)</span>
                  </q-card-section>
                  <q-card-section class="q-pa-sm bg-white">
                    <div class="row">
                      <div class="col-12">
                        <q-input
                          v-model="surfaceCasing.pressure"
                          label="Enter pressure (psi)"
                          borderless
                        />
                      </div>
                      <div class="col-12">
                        <p class="text-center text-subtitle1 text-weight-bold">Gate valve seized closed, requires drill out</p>
                      </div>
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-green-brand text-white">
                    <div class="text-body1">PHOTOS OF WELLHEAD XMAS TREE (AS REQUIRED)</div>
                  </q-card-section>
                  <q-card-section class="bg-transparent text-black">
                    <div class="row justify-end items-center">
                      <q-btn color="negative" class="text-capitalize" label="Clear" @click="wellheadPhoto = null;"></q-btn>
                    </div>
                    <div class="row justify-center q-my-md">
                      <q-img
                        :src="wellheadPhoto"
                        style="width: 100%; height: auto;"
                      />
                    </div>
                  </q-card-section>
                  <q-card-section class="bg-white">
                    <q-field
                      outlined
                      placeholder="Outlined"
                      stack-label
                      dense>
                      <template v-slot:control>
                        <div class="self-center full-width no-outline" tabindex="0" @click="openCamera('wellheadPhoto')">
                          Take a Picture
                        </div>
                      </template>
                      <template v-slot:append>
                        <div class="q-gutter-x-sm">
                          <q-icon
                            name="fa fa-camera"
                            @click="openCamera('wellheadPhoto')" />
                          <!--                      <q-icon-->
                          <!--                        v-if="form.file && false"-->
                          <!--                        name="cancel"-->
                          <!--                        @click="form.file = null" />-->
                        </div>
                      </template>
                    </q-field>
                  </q-card-section>
                </q-card>
              </q-step>

              <template v-slot:navigation>
                <q-stepper-navigation class="bg-white q-pb-xl">
                  <div class="row justify-center q-pt-md">
                    <q-btn v-if="step > 1" no-caps dense color="positive" @click="back" label="Back" />
                    <q-btn @click="next" no-caps dense color="positive" class="q-ml-sm" :label="step === 3 ? 'Submit' : 'Next'" />
                  </div>
                </q-stepper-navigation>
              </template>
            </q-stepper>
          </q-page>
        </q-page-container>
      </q-layout>
    </q-dialog>
    <q-dialog
      maximized
      transition-show="slide-left"
      transition-hide="slide-right"
      v-model="wellsList">
      <q-card>
        <q-card-section>
          <q-space/>
          <q-btn dense flat icon="close" v-close-popup>
            <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
          </q-btn>
        </q-card-section>
        <q-card-section class="q-px-xs">
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
          <template v-if="wells">
            <q-list>
              <q-item
                clickable
                v-ripple
                v-for="(item,index) in wells.filter(x => x.post_title.toLowerCase().includes(search_well.toLowerCase()))"
                :key="'well-'+index"
                @click="selected_well = item; wellsList = false;"
                >
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
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import {mapState} from "vuex";
import { scroll } from 'quasar'
const { getScrollTarget, setVerticalScrollPosition, setScrollPosition } = scroll

export default {
  name: "AddWellActivity",
  data () {
    return {
      wellsList: false,
      step: 1,
      search_well: '',
      inspectionDate: '',
      inspectionTime: '',
      selected_well: null,
      leaseAreaOptions: [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'},
        {label: 'N/A', value: 'na'}
      ],
      whereToSavePhoto: '',
      signaturePhoto: null,
      wellheadPhoto: null,
      barcode: null,
      wellHead: {
        wellStatus: 'online',
        gaugePresent: 'yes'
      },
      productionCasing: {
        gaugePresent: 'yes'
      },
      surfaceCasing: {
        gaugePresent: 'yes',
        pressure: ''
      },
      wellStatusOptions: [
        {label: 'Online', value: 'online'},
        {label: 'Offline', value: 'offline'}
      ],
      gaugePresentOptions: [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'}
      ],
      leaseOptions: {
        acceptableCondition: 'na',
        signageInTact: 'na',
        signageInTactOptionalComment: '',
        cleanAndTidy: 'na',
        cleanAndTidyOptionalComment: '',
        cellarAcceptableCondition: 'na'
      },
      gpsPoint: '',
      gpsAltitude: '',
      gpsAccurancy: '',
      deviceReady: false
    }
  },
  computed: {
    ...mapState('user', ['user','wells']),
    ...mapState('settings', ['cameraOptions'])
  },
  mounted() {
    document.addEventListener("deviceready", this.deviceReady = true, false);
  },
  methods: {
    askForGPSPermission () {
      if (this.deviceReady) {
        this.getLocationGPS()
      }
    },
    scrollTop() {
      const element = this.$refs.cpage.$el
      const target = getScrollTarget(element)
      let offset = element.offsetTop
      setVerticalScrollPosition(target, offset, 10)
    },
    next() {
      this.$refs.stepper.next()
      this.scrollTop()
    },
    back() {
      this.$refs.stepper.previous()
      this.scrollTop()
    },
    backHeader() {
      if (this.step === 1) {
        this.$emit('close')
      } else {
        this.$refs.stepper.previous()
        this.scrollTop()
      }
    },
    getLocationGPS() {
      navigator.geolocation.getCurrentPosition(this.onSuccessGPS, this.onGPSError);
    },
    onSuccessGPS(position) {
      this.gpsPoint = position.coords.latitude + ' ' + position.coords.longitude
      this.gpsAltitude = position.coords.altitude
      this.gpsAccurancy = position.coords.accuracy
    },
    onGPSError(val) {
      console.log('error on GPS: ', val)
    },
    async openCamera(whereToSave){
      this.whereToSavePhoto = whereToSave
      navigator.camera.getPicture(this.cameraSuccess, this.cameraError,this.cameraOptions)
    },
    cameraSuccess(val){
      const vm = this
      console.log(Camera)
      console.log(val)
      window.resolveLocalFileSystemURL(val,
        function(fileEntry){
          fileEntry.file(function (file) {
            let reader = new FileReader();
            reader.onload = function() {
              var blob = vm.parseFile(reader.result)
              blob.dataURL = reader.result
              blob.name = file.name
              // vm.barcode = blob.dataURL
              vm[vm.whereToSavePhoto] = blob.dataURL
            };
            reader.readAsDataURL(file)
          });
        },
        function(val){
          vm.barcode = 'ERROR: ' + val
        }
      );
    },
    parseFile(dataURI,file_name='file') {
      var byteString = atob(dataURI.split(',')[1]);
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: 'image/png' });
    },
    cameraError(val){
      console.log(val)
    },
  },
  props: ['add_well_activity']
}
</script>
<style lang="scss">
.hide-el {
  display: none !important;
}
.bg-green-brand {
  background-color: #7ab929;
}
.q-stepper__step-inner {
  padding: 4px 4px 0px !important;
}
.style-toggle {
  border-radius: 0px;
  button {
    margin-right: 12px !important;
    text-transform: capitalize;
    font-weight: bold;
    border-radius: 8px;
  }
}
.q-icon {
  &.on-right {
    margin-left: 2px;
  }
}
input[type='date'], input[type='time'] {
  &.q-field__native {
    background-color: $grey-3;
    text-align: end;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    &:last-child {
      margin-left: auto;
    }
  }
}
</style>

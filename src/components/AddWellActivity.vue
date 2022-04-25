<template>
  <q-dialog
    maximized
    key="hey"
    transition-show="slide-left"
    transition-hide="slide-right"
    :value="add_well_activity"
  >
    <q-card>
      <q-card-section class="row items-center q-py-sm q-px-xs bg-white">
        <div class="text-h6 full-width relative-position">
          <q-btn
            color="blue-6"
            size="sm"
            icon="arrow_back_ios_new"
            flat
            round
            dense
            @click="$emit('close');">
              <span
                class="relative-position text-subtitle1 text-blue-6">
                Back
              </span>
          </q-btn>
          <span
            class="absolute-center text-body1 text-bold">
              New Well Activty
            </span>
        </div>
      </q-card-section>

      <q-card-section class="q-px-xs bg-grey-3 q-pt-none">
        <q-stepper
          v-model="step"
          ref="stepper"
          animated
          flat
          header-class="hide-el"
          class="bg-transparent"
        >
          <q-step
            :name="1"
            title="Lease Area"
            :done="step > 1"
            style="min-height: 200px;"
          >
            <q-card flat class="my-card">
              <q-card-section class="bg-green-brand text-white">
                <div class="text-subtitle1 text-weight-bold">LEASE AREA</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-lg">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Is the entry to the lease in acceptable condition?</p>
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
                    <p class="text-body2 text-weight-bold">Some localised rutting, but generally ok</p>
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-lg">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Is the signage in tact?</p>
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
                <div class="row q-px-lg">
                  <div class="col-12">
                    <q-input borderless label="Optional comment" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-lg">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Is the lease clean and tidy?</p>
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
                <div class="row q-px-lg">
                  <div class="col-12">
                    <q-input borderless label="Optional comment" />
                  </div>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-sm">
                <div class="row q-mb-lg">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Is the cellar / grating in acceptable condition ?</p>
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
                    <p class="text-center text-body1 text-weight-bold">Per photo</p>
                  </div>
                </div>
              </q-card-section>
            </q-card>
            <q-card flat class="my-card bg-transparent">
              <q-card-section class="bg-green-brand text-white">
                <div class="text-subtitle1 text-weight-bold">PHOTOS OF SIGNATURE / CELLAR / LEASE (AS REQUIRED)</div>
              </q-card-section>
              <q-card-section class="bg-transparent text-black">
                <div class="row justify-between items-center">
                  <span class="text-body1 text-weight-medium">Cellar</span>
                  <q-btn color="negative" label="Clear"></q-btn>
                </div>
              </q-card-section>
              <q-separator />
            </q-card>
          </q-step>
          <q-step
            :name="2"
            title="Inspection Data"
            :done="step > 2"
            style="min-height: 200px;"
          >
            <q-card flat class="my-card bg-transparent">
              <q-card-section class="bg-green-brand text-white">
                <div class="text-subtitle1 text-weight-bold">INSPECTION DATA</div>
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
                  <span class="text-weight-bold">Select Well *</span>
                  <q-btn-dropdown flat color="grey-9" label="Hercules 1">
                    <q-list>
                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label>Hercules 2</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label>Hercules 3</q-item-label>
                        </q-item-section>
                      </q-item>

                      <q-item clickable v-close-popup>
                        <q-item-section>
                          <q-item-label>Hercules 4</q-item-label>
                        </q-item-section>
                      </q-item>
                    </q-list>
                  </q-btn-dropdown>
                </div>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <p class="text-weight-medium">Verify by Scanning QR Code</p>
                <div style="height: 80px" class="bg-white row justify-center q-py-md">
                  <q-btn label="Scan Barcode" color="negative" />
                </div>
              </q-card-section>
              <q-card-section class="q-px-none">
                <div class="row justify-between items-center">
                  <span class="text-weight-medium">Or Gathering GPS Point</span>
                  <q-btn
                    color="negative"
                    label="Clear"
                    no-caps
                    dense
                  />
                </div>
              </q-card-section>
              <q-card-section class="q-px-none bg-white">
                <div style="height: 80px" class="flex justify-center">
                  <p class="text-light-blue-9 text-weight-bold q-mb-none">272438S 15330E</p>
                  <p class="text-light-blue-9 text-weight-bold">Altitude: 14.7144m, Accuracy: 4.5906m </p>
                </div>
                <q-separator class="bg-blue-10 q-mb-lg" />
              </q-card-section>
              <q-card-section class="q-pa-none">
                <q-input label="Date" no-error-icon borderless readonly mask="date" :rules="['date']">
                  <template v-slot:append>
                    <span class="text-body1">{{ inspectionDate }}</span>
                  </template>
                  <template v-slot:after>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-date v-model="inspectionDate">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </q-card-section>
              <q-card-section class="q-pa-none">
                <q-input label="Time" no-error-icon borderless readonly mask="date" :rules="['date']">
                  <template v-slot:append>
                    <span class="text-body1">{{ inspectionTime }}</span>
                  </template>
                  <template v-slot:after>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy ref="qDateProxy" cover transition-show="scale" transition-hide="scale">
                        <q-time v-model="inspectionTime">
                          <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                          </div>
                        </q-time>
                      </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
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
          >
            <q-card flat class="my-card bg-transparent">
              <q-card-section class="bg-green-brand text-white">
                <div class="text-subtitle1 text-weight-bold">WELLHEAD / XMAS TREE</div>
              </q-card-section>
              <q-separator />
              <q-card-section class="q-pa-sm bg-white">
                <div class="row q-mb-lg">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Well Status</p>
                  </div>
                  <div class="col-6 row justify-end">
                    <div>
                      <q-btn-toggle
                        v-model="wellStatus"
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
                        v-model="gaugePresent"
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
                <span class="text-subtitle1 text-weight-medium">PRODUCTION CASING ANNULUS</span>
              </q-card-section>
              <q-card-section class="q-pa-sm bg-white">
                <div class="row">
                  <div class="col-6 flex items-center">
                    <p class="text-body1 text-weight-medium q-mb-none">Gauge present?</p>
                  </div>
                  <div class="col-6 row justify-end">
                    <div>
                      <q-btn-toggle
                        v-model="gaugePresent"
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
                  <p class="text-weight-bold">180</p>
                  <p class="text-weight-bold q-mb-lg">Approaching MOP, recommended bleed down.</p>
                </div>
                <q-separator class="bg-blue-10" />
              </q-card-section>
            </q-card>
          </q-step>

          <template v-slot:navigation>
            <q-stepper-navigation>
              <div class="row justify-center q-mt-xl">
                <q-btn v-if="step > 1" color="positive" @click="$refs.stepper.previous()" label="Back" />
                <q-btn @click="$refs.stepper.next()" color="positive" class="q-ml-sm" :label="step === 3 ? 'Finish' : 'Next'" />
              </div>
            </q-stepper-navigation>
          </template>

<!--          <template v-slot:message>-->
<!--            <q-banner v-if="step === 1" class="q-px-md bg-grenn-brand">-->
<!--              <span class="text-white text-weight-bold text-body1">LEASE AREA</span>-->
<!--            </q-banner>-->
<!--            <q-banner v-else-if="step === 2" class="q-px-md bg-grenn-brand">-->
<!--              <span class="text-white text-weight-bold text-body1">INSPECTION AREA</span>-->
<!--            </q-banner>-->
<!--            <q-banner v-else-if="step === 3" class="q-px-md bg-grenn-brand">-->
<!--              <span class="text-white text-weight-bold text-body1">WELLHEAD / XMAS TREE</span>-->
<!--            </q-banner>-->
<!--          </template>-->
        </q-stepper>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "AddWellActivity",
  data () {
    return {
      step: 1,
      inspectionDate: '',
      inspectionTime: '',
      leaseAreaOptions: [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'},
        {label: 'N/A', value: 'na'}
      ],
      wellStatus: '',
      wellStatusOptions: [
        {label: 'Online', value: 'online'},
        {label: 'Offline', value: 'offline'}
      ],
      gaugePresent: '',
      gaugePresentOptions: [
        {label: 'Yes', value: 'yes'},
        {label: 'No', value: 'no'}
      ],
      leaseOptions: {
        acceptableCondition: ''
      }
    }
  },
  mounted () {
    const stepper = document.getElementsByClassName("q-stepper__header")
    console.log("stepper: ", stepper);
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
  padding: 4px !important;
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
</style>

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
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { LocalStorage } from 'quasar'
export default {
  name: 'Dashboard',
  data(){
    return{

    }
  },
  computed:{
    ...mapState('user', ['user','webAppUrl','pressure_readings','activities']),
  },
  created(){
    const pressure_readings = LocalStorage.getItem('pressure_readings')
    const activities = LocalStorage.getItem('activities')
    if(pressure_readings) this.$store.commit('user/setPressureReadings',pressure_readings)
    if(activities) this.$store.commit('user/setActivities',activities)
  },
  mounted(){
    // this.$store.dispatch('user/loadWells')
    this.$store.dispatch('user/dashboardLoad')
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
</style>
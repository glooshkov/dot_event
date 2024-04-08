<template>
  <div class="parent" style="justify-content: normal;">
    <div class="tab-container">
      <div
        class="tab-item"
        :class="{ active: activeTab === 'events' }"
        @click="changeTab('events')"
      >
        СОБЫТИЯ
      </div>
      <div
        class="tab-item"
        :class="{ active: activeTab === 'bids' }"
        @click="changeTab('bids')"
      >
        ЗАЯВКИ
      </div>
    </div>
    <div class="selection-container">
      <div class="selection-label">
        Ваши {{ activeTab === 'events' ? 'события' : 'заявки' }} на
      </div>
      <div style="width: 10px; height: 25px; border-right: 1px solid var(--event-color-border)"></div>
      <SelectButton
          style="border-radius: 0.375rem;width: 100px" id="selectedYear"
          v-model="year.selectedYear"
          :options="years"
          :initialSelected="base_year"
          @update="switchParamsGlobal($event, 'selectedYear', 'year'); changeTab(this.activeTab)"
          @click="changeTab(this.activeTab)"
      />
    </div>

    <!-- Блок: список событий -->
    <div class="event-list-log">
      <div
          class="event-list-block-log"
          v-for="event in array_events"
          :key="event.id_event"
          @click="goToEventDetails(event)"
      >
        <div style="width: 300px; ">
          <div class="cal-date-log">
            <strong>{{ formatDateGlobal(event.date_event) }}</strong>
          </div>
          <div class="cal-time-log">
            <strong>{{ event.start_time }} - {{ event.end_time }}: </strong>
            ({{formatDurationGlobal(event.start_time,event.end_time)}})
          </div>
          <div v-if="event.date_event > currentDateNow" class="event-remaining-log">
            <strong>Осталось:</strong>{{ getRemainingDaysGlobal(event.date_event) }}
          </div>
          <div class="cal-details-log">
            <span class="cal-format-log">{{ event.format_event.label }}: </span>
            <span class="cal-client-log">{{ event.client }}</span>
          </div>
          <div class="cal-details-log">
            <span class="cal-format-log">Статус: </span>
            <span class="cal-client-log">{{ event.status_event.label }}</span>
          </div>
        </div>
        <div class="circle-log" :style="{ backgroundColor: getButtonColorGlobal(event.format_event.value) }"/>
      </div>
    </div>
  </div>
</template>

<script>
import { All_EVENTS_LOG } from "@/queries";
import SelectButton from "@/views/UI/SelectButton.vue";
import Data from "@/views/UI/(Empty)Data.vue";
import {
  formatDateGlobal,
  formatDurationGlobal,
  getButtonColorGlobal,
  getRemainingDaysGlobal,
  switchParamsGlobal
} from "@/stores/methodGlobal.js";
import BaseData from "@/views/UI/BaseData.vue";

export default {
  name: "LogEventView",
  components: {SelectButton},
  data() {
    return {
      activeTab: 'events',
      isYearDropdownVisible: false,
      currentDateNow: new Date(),
      base_year: Data.data().base_year,
      allEvents: [],
      array_events: [],
      year: {
        selectedYear: Data.data().base_year,
      }
    };
  },
  mounted() {
    const createEvents = this.allEvents.filter(event =>
        event.type_event.value === 'Event' &&
        event.status_event.value === 'In progress' &&
        new Date(event.date_event) >= this.currentDateNow &&
        new Date(event.date_event).getFullYear() === this.year.selectedYear.value);
    this.array_events = createEvents.sort((a, b) => a.date_event - b.date_event);
  },
  computed: {
    years() {
      const currentYear = new Date().getFullYear();
        const yearArray = [];
        for (let i = 0; i <= 10; i++) {
          const year = currentYear + i;
          yearArray.push({ value: year, label: year.toString() });
        }
        return yearArray;
    },
  },
  methods: {
    switchParamsGlobal,
    formatDurationGlobal,
    getButtonColorGlobal,
    toggleYearDropdown() {
      this.isYearDropdownVisible = !this.isYearDropdownVisible;
    },
    getRemainingDaysGlobal,
    formatDateGlobal,
    goToEventDetails(event) {
      this.$router.push({ name: 'AboutEvent', params: { id_event: event.id_event } });
    },
    changeTab(tab) {
      this.activeTab = tab;
      if (this.activeTab === 'bids') {
        const waitingBids = this.allEvents.filter(event =>
            event.status_event.value === 'Waiting' &&
            new Date(event.date_event) >= this.currentDateNow &&
            new Date(event.date_event).getFullYear() === this.year.selectedYear.value);
        this.array_events = waitingBids.sort((a, b) => new Date(a.date_event) - new Date(b.date_event));
      } else {
        const waitingEvents = this.allEvents.filter(event => event.type_event.value === 'Event' &&
            event.status_event.value === 'In progress' &&
            new Date(event.date_event) >= this.currentDateNow &&
            new Date(event.date_event).getFullYear() === this.year.selectedYear.value);
        this.array_events = waitingEvents.sort((a, b) => a.date_event - b.date_event);
      }
    },
  },
  props: {
    isAuthenticated: Boolean,
  },
  async created() {
    try {
      if (!this.isAuthenticated) {
        return this.$router.push({ name: 'SignIn' });
      }

      const currentDate = new Date();
      const eventsByLog = await this.$apollo.query({
        query: All_EVENTS_LOG,
        variables: {
           id: JSON.parse(localStorage.getItem("user")).id,
        },
      });
      const allEvents = eventsByLog.data.all_events_by_user;

      this.allEvents = allEvents.filter(event => new Date(event.date_event) >= currentDate);
    } catch (error) {
      console.error('Ошибка при создании хука:', error);
    }
  }
};
</script>

<template>
  <div class="app" style="background-color: #111827;">
    <router-view :isAuthenticated="current_user.is_authenticated" />
  </div>
  <div class="bm-lider" v-if="$route.name !== 'SignIn' && $route.name !== 'SignUp' && $route.name !== 'ResetPassword' && $route.name !== 'Confirm'">
    <ul class="ul-bm">
      <li class="list-bm">
        <a @click="goTo(1)">
          <BookOpenIcon class="icon-bm"></BookOpenIcon>
          <span class="text">ЖУРНАЛ</span>
        </a>
      </li>
      <li class="list-bm">
        <a @click="goTo(2)">
          <CalendarDaysIcon class="icon-bm"></CalendarDaysIcon>
          <span class="text">КАЛЕНДАРЬ</span>
        </a>
      </li>
      <li class="list-bm">
        <a @click="goTo(3)">
          <PlusIcon class="icon-bm"></PlusIcon>
          <span class="text">СОЗДАТЬ</span>
        </a>
      </li>
      <li class="list-bm">
        <a @click="goTo(4)">
          <ChartBarIcon class="icon-bm"></ChartBarIcon>
          <span class="text">АНАЛИТИКА</span>
        </a>
      </li>
      <li class="list-bm">
        <a @click="goTo(5)">
          <UserIcon class="icon-bm"></UserIcon>
          <span class="text">ПРОФИЛЬ</span>
        </a>
      </li>
      <div class="circle-bm"></div>
    </ul>
  </div >
  <div class="bm-lider-bg">
  </div>
  <div class="bm-lider-bg"/>
</template>

<script>
import {BookOpenIcon, CalendarDaysIcon, ChartBarIcon, PlusIcon, UserIcon} from "@heroicons/vue/20/solid/index.js";
import { SITE_INFO } from "@/queries";
import { useUserStore } from "@/stores/user";
import '@/style.css';

export default {
  name: "AppView",
  components: {BookOpenIcon, CalendarDaysIcon, ChartBarIcon, PlusIcon, UserIcon},
  setup() {
    const userStore = useUserStore();
    return { userStore };
  },
  data() {
    return {
      menuOpen: false,
      mySite: null,
      current_user: {
        is_authenticated: true,
        token: this.userStore.getToken || "",
        info: this.userStore.getUser || {},
      },
      dataLoaded: false,
    };
  },
  async created() {
    const siteInfo = await this.$apollo.query({
      query: SITE_INFO,
    });
    this.mySite = siteInfo.data.site;

    if (this.current_user.token) {
      this.current_user.is_authenticated = true;
    }
  },
  methods: {
    goTo(tab) {
      const tabNames = ['LogEvent', 'Calendar', 'CreateEvent', 'Analytics', 'Profile'];
      this.$router.push({ name: tabNames[tab - 1] });
    },
    activateLink(tab) {
      const list = document.querySelectorAll(".list-bm");
      list.forEach((item) => item.classList.remove("active"));
      if (tab !== 0) {
        list[tab - 1].classList.add("active");
      } else {
        console.error('0')
      }
    }
  },
  computed: {
    activeTab() {
      const routeToTabMapping = {
        'LogEvent': 1,
        'AboutEvent':1,
        'Calendar': 2,
        'CreateEvent': 3,
        'Analytics': 4,
        'AnalyticsFinancial': 4,
        'AnalyticsProfile': 4,
        'Profile': 5,
        'SearchEvent': 5,
        'SettingsPage': 5,
        'PersonalData': 5,
        'FAQPage': 5,
        'ChatSupport': 5,
      };
      return routeToTabMapping[this.$route.name] || 0;
    },
  },
  watch: {
    activeTab(newValue) {
      this.activateLink(newValue);
    }
  }
}
</script>

<style>

</style>


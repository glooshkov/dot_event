import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '@/views/user/SignIn.vue'
import SignUpView from '@/views/user/SignUp.vue'
import ResetPasswordView from '@/views/user/ResetPassword.vue'
import ConfirmView from '@/views/user/Confirm.vue'
import AnalyticsView from '@/views/main/Analytics.vue'
import CalendarView from '@/views/main/Calendar.vue'
import CreateEventView from '@/views/main/CreateEvent.vue'
import LogEventView from '@/views/main/LogEvent.vue'
import AboutEventView from '@/views/main/AboutEvent.vue'
import ProfileView from '@/views/main/Profile.vue'

import AnalyticsFinancialView from '@/views/main/analytics/AnalyticsFinancial.vue'
import AnalyticsProfileView from "@/views/main/analytics/AnalyticsProfile.vue";
import AnalyticsEstimateView from "@/views/main/analytics/AnalyticsEstimate.vue";

import SearchEventView from '@/views/main/settingsprofie/SearchEvent.vue'
import SettingsPageView from '@/views/main/settingsprofie/SettingsPage.vue'
import PersonalDataView from "@/views/main/settingsprofie/PersonalData.vue";
import FAQPageView from '@/views/main/settingsprofie/FAQPage.vue'

import FakeEventView from '@/views/UI/FakeEvent.vue'


const routes = [
  {
    path: '/signin',
    name: 'SignIn',
    component: SignInView
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUpView
  },
  {
    path: '/resetpassword',
    name: 'ResetPassword',
    component: ResetPasswordView,
  },
  {
    path: '/confirm/:confirmation_token',
    name: 'Confirm',
    component: ConfirmView,
    props: true,
  },
  {
    path: '/analytics',
    name: 'Analytics',
    component: AnalyticsView,
  },
  {
    path: '/calendar',
    name: 'Calendar',
    component: CalendarView
  },
  {
    path: '/create',
    name: 'CreateEvent',
    component: CreateEventView
  },
  {
    path: '/logevent',
    name: 'LogEvent',
    component: LogEventView
  },
  {
    path: '/aboutevent/:id_event',
    name: 'AboutEvent',
    component: AboutEventView,
    props: true,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: ProfileView
  },
  {
    path: '/analitfinancial',
    name: 'AnalyticsFinancial',
    component: AnalyticsFinancialView
  },
  {
    path: '/analitprofile',
    name: 'AnalyticsProfile',
    component: AnalyticsProfileView,
  },
  {
    path: '/analitestimate',
    name: 'AnalyticsEstimate',
    component: AnalyticsEstimateView,
  },
  {
    path: '/searchevent',
    name: 'SearchEvent',
    component: SearchEventView
  },
  {
    path: '/settingspage',
    name: 'SettingsPage',
    component: SettingsPageView
  },
  {
    path: "/personaldata",
    name: "PersonalData",
    component: PersonalDataView,
  },
  {
    path: "/faq",
    name: "FAQPage",
    component: FAQPageView,
  },
  {
    path: "/fake",
    name: "CreateFakeEvent",
    component: FakeEventView,
  },
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router

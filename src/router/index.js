import { createRouter, createWebHistory } from 'vue-router';
import LoginViewVue from '@/views/LoginView.vue';
import MapViewVue from '@/views/MapView.vue';
import WaypointViewVue from '@/views/WaypointView.vue';
import DataImuViewVue from '@/views/DataImuView.vue';
import FlightViewVue from '@/views/FlightView.vue';
import TestingViewVue from '@/views/TestingView.vue';
import SettingsViewVue from '@/views/SettingsView.vue';
import DashboardViewVue from '@/views/DashboardView.vue';
import LandingViewVue from '@/views/LandingView.vue';
import SignUpViewVue from '@/views/SignUpView.vue';
import AvionicsViewVue from '@/views/AvionicsView.vue';
// import CombinedViewVue from '@/views/CombinedView.vue';
import ReplayExportViewVue from '@/views/ReplayExportView.vue';

// Define path and route name constants
const PATHS = {
  LOGIN: '/login',
  SIGNUP: '/signup',
  FLIGHT: '/flight',
  TESTING: '/testing',
  WAYPOINT: '/waypoint',
  DATA_IMU: '/dataimu',
  MAP_VIEW: '/mapview',
  SETTINGS: '/settings',
  // COMBINED: '/combined',
  DASHBOARD: '/dashboard',
  LANDING: '/',
  AVIONICS: '/avionics',
  REPLAY: '/replay',
};

const ROUTE_NAMES = {
  LOGIN: 'login',
  SIGNUP: 'signup',
  FLIGHT: 'efrisa.flight',
  TESTING: 'efrisa.testing',
  WAYPOINT: 'efrisa.waypoint',
  DATA_IMU: 'efrisa.dataimu',
  MAP_VIEW: 'efrisa.mapview',
  // COMBINED_VIEW:'efrisa.combinedview',
  SETTINGS: 'efrisa.settings',
  DASHBOARD: 'efrisa.dashboard',
  LANDING: 'landing',
  AVIONICS: 'avionics',
  REPLAY: 'efrisa.replay',
};

const routes = [
  {
    path: PATHS.LOGIN,
    name: ROUTE_NAMES.LOGIN,
    component: LoginViewVue,
    meta: {
      authPage: true
    }
  },
  {
    path: PATHS.SIGNUP,
    name: ROUTE_NAMES.SIGNUP,
    component: SignUpViewVue
  },
  {
    path: PATHS.FLIGHT,
    name: ROUTE_NAMES.FLIGHT,
    component: MapViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.TESTING,
    name: ROUTE_NAMES.TESTING,
    component: TestingViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.WAYPOINT,
    name: ROUTE_NAMES.WAYPOINT,
    component: WaypointViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.DATA_IMU,
    name: ROUTE_NAMES.DATA_IMU,
    component: DataImuViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.MAP_VIEW,
    name: ROUTE_NAMES.MAP_VIEW,
    component: FlightViewVue,
    meta: {
      requiresAuth: true
    }
  },
  //   {
  //   path: PATHS.COMBINED_VIEW,
  //   name: ROUTE_NAMES.COMBINED_VIEW,
  //   component: CombinedViewVue,
  //   meta: {
  //     requiresAuth: true
  //   }
  // },
  {
    path: PATHS.SETTINGS,
    name: ROUTE_NAMES.SETTINGS,
    component: SettingsViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.DASHBOARD,
    name: ROUTE_NAMES.DASHBOARD,
    component: DashboardViewVue,
    meta: {
      requiresAuth: true
    }
  },
  {
    path: PATHS.LANDING,
    name: ROUTE_NAMES.LANDING,
    component: LandingViewVue
  },
  {
    path: PATHS.AVIONICS,
    name: ROUTE_NAMES.AVIONICS,
    component: AvionicsViewVue
  },
  {
    path: PATHS.REPLAY,
    name: ROUTE_NAMES.REPLAY,
    component: ReplayExportViewVue,
    meta: {
      requiresAuth: true
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

// Middleware for route authentication
router.beforeEach((to, from, next) => {
  const tokenName = 'x-access-token'; // Define token name as a variable

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!localStorage.getItem(tokenName)) {
      console.warn('Access denied. Please log in first.'); // Optional logging
      next({
        name: ROUTE_NAMES.LOGIN
      });
      return;
    }
    next();
    return;
  }
  next();
});

export default router;

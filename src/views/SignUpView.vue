<template>
  <div
    class="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900"
  >
    <a
      href=""
      class="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
    >
      <!-- <img src="logo-efrisa.png" class="mr-4 h-11" alt="FlowBite Logo" /> -->
      <span>Ground Control Station</span>
    </a>
    <!-- Card -->
    <div
      class="w-full max-w-xl p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow dark:bg-gray-800"
    >
      <h2 class="text-2xl font-bold text-gray-900 dark:text-white">
        Create Account
      </h2>
      <form class="mt-8 space-y-6" action="#" @submit.prevent="signup()">
        <div>
          <label
            for="email"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Email</label
          >
          <input
            type="email"
            name="email"
            id="email"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            placeholder="name@company.com"
            v-model="dataSignUp.email"
            required
          />
        </div>
        <div>
          <label
            for="userame"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Username</label
          >
          <input
            type="username"
            name="username"
            id="username"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            placeholder="Efrisa"
            v-model="dataSignUp.username"
            required
          />
        </div>
        <div>
          <label
            for="password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Password</label
          >
          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            v-model="dataSignUp.password"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            required
          />
        </div>
        <div>
          <label
            for="confirm-password"
            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >Confirm password</label
          >
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="••••••••"
            v-model="dataSignUp.confpassword"
            class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-slate-500 focus:border-slate-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-slate-500 dark:focus:border-slate-500"
            required
          />
        </div>
        <div class="flex items-start">
          <div class="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              name="remember"
              type="checkbox"
              class="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-slate-300 dark:focus:ring-slate-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              required
            />
          </div>
          <div class="ml-3 text-sm">
            <label
              for="remember"
              class="font-medium text-black-900 dark:text-white"
              >I accept the
              <router-link
                to="#"
                class="text-slate-700 hover:underline dark:text-slate-900"
                >Terms and Conditions</router-link
              ></label
            >
          </div>
        </div>
        <button
          type="submit"
          class="w-full px-5 py-3 text-base font-medium text-center text-white bg-slate-700 rounded-lg hover:bg-slate-800 focus:ring-4 focus:ring-slate-300 sm:w-auto dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800"
        >
          Create account
        </button>
        <div class="text-sm font-medium text-gray-500 dark:text-gray-400">
          Already have an account?
          <router-link
            to="/login"
            class="text-slate-700 hover:underline dark:text-slate-500"
            >Login here</router-link
          >
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { reactive } from "vue";
import { useRouter } from "vue-router";
// import authJwt from "@/middleware/authJwt";
export default {
  name: "SignUp",
  setup() {
    const dataSignUp = reactive({
      email: "",
      username: "",
      password: "",
      confpassword: "",
    });

    const router = useRouter();
    // const myAuthVerif = new authJwt();
    function signup() {
      if (dataSignUp.password == dataSignUp.confpassword) {
        axios
          .post("auth/signup", dataSignUp)
          .then((response) => {
            //   console.log(response.data);
            // localStorage.setItem("token");
            if (response.data) {
              alert("success");
              //set token
              // myAuthVerif.getToken(response.data.accessToken);
              // localStorage.setItem("x-access-token", response.data.accessToken);

              // console.log(response.data.accessToken);
              // router.push({
              //   name: "dahsboard",
              // });
              //redirect ke halaman dashboard
              return router.push({
                name: "efrisa.dashboard",
              });
            }
          })
          .catch((err) => {
            alert(err);
            console.log(err.response);
          });
      } else {
        alert("Confirm Password is incorrect");
      }
    }
    return {
      dataSignUp,
      router,
      signup,
    };
  },
  //   data() {
  //     return {
  //       email: "",
  //       username: "",
  //       password: "",
  //     };
  //   },
  //   methods: {
  //     login() {
  //       console.log("email: " + this.email);
  //       console.log("username: " + this.username);
  //       console.log("password: " + this.password);
  //     },
  //   },
};
</script>

<style>
</style>
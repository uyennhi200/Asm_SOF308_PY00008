<template>
  <header class="header-top bg-grey justify-content-center">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-2 col-md-4 text-center d-none d-lg-block">
          <a class="navbar-brand" href="/">
            <img src="/images/logo.png" alt="Logo" class="img-fluid" />
          </a>
        </div>

        <div class="col-lg-8 col-md-12">
          <nav class="navbar navbar-expand-lg navigation">
            <a class="navbar-brand text-uppercase d-lg-none" href="#">
              <img src="/images/logo.png" alt="Logo" class="img-fluid" />
            </a>
            <button
              class="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbar-collapse"
              aria-controls="navbar-collapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span class="ti-menu"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbar-collapse">
              <ul id="menu" class="menu navbar-nav mx-auto">
                <li class="nav-item">
                  <router-link class="nav-link" to="/">Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/about">About</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                  <router-link class="nav-link" to="/managerBlog">Manager</router-link>
                </li>
                <li class="nav-item">
                  <router-link class="nav-link" to="/contact">Contact</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                  <router-link class="nav-link" to="/profile">Profile</router-link>
                </li>
                <li v-if="!isLoggedIn" class="nav-item">
                  <router-link class="nav-link" to="/login">Login</router-link>
                </li>
                <li v-if="isLoggedIn" class="nav-item">
                  <a class="nav-link" href="#!" @click.prevent="logout">Logout</a>
                </li>
              </ul>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import { computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export default {
  name: "NavBar", // Đặt tên component
  setup() {
    const store = useStore();
    const router = useRouter();

    // Kết nối trạng thái từ Vuex
    const isLoggedIn = computed(() => store.getters.getLoginStatus);

    // Hàm đăng xuất
    const logout = () => {
      localStorage.removeItem("userInfo");
      localStorage.removeItem("isLoggedIn");
      store.commit("setLoginStatus", false); // Cập nhật trạng thái đăng xuất
      router.push("/login"); // Điều hướng về trang login
    };

    return {
      isLoggedIn,
      logout,
    };
  },
};
</script>

<style scoped>
.nav-link {
  color: #333 !important;
  font-size: 16px;
}
.nav-link:hover {
  color: #007bff !important;
  text-decoration: underline;
}
</style>

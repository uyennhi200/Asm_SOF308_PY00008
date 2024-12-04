<template>
    <div class="login-container min-vh-100 d-flex align-items-center bg-gradient">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-5">
                <h2 class="text-center mb-4 text-primary">Đăng Nhập</h2>
                
                <div v-if="errorMessage" class="alert alert-danger text-center">
                  {{ errorMessage }}
                </div>
                
                <div v-if="successMessage" class="alert alert-success text-center">
                  {{ successMessage }}
                </div>
                
                <form @submit.prevent="login">
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control rounded-pill"
                      placeholder="Nhập email"
                      required
                    />
                  </div>
  
                  <div class="mb-3">
                    <label class="form-label">Mật Khẩu</label>
                    <input
                      v-model="password"
                      type="password"
                      class="form-control rounded-pill"
                      placeholder="Nhập mật khẩu"
                      required
                    />
                  </div>
  
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="form-check">
                      <input
                        v-model="rememberMe"
                        class="form-check-input"
                        type="checkbox"
                        id="rememberCheck"
                      />
                      <label class="form-check-label" for="rememberCheck">
                        Ghi nhớ
                      </label>
                    </div>
                    <router-link to="/register" class="text-muted text-decoration-none">
                      Đăng kí
                    </router-link>
                  </div>
  
                  <button type="submit" class="btn btn-primary w-100 rounded-pill">
                    Đăng Nhập
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
import axios from "axios";
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Cookies from "js-cookie";
import { useStore } from "vuex";

export default {
  setup() {
    const email = ref("");
    const password = ref("");
    const rememberMe = ref(false);
    const errorMessage = ref("");
    const successMessage = ref("");
    const router = useRouter();
    const store = useStore();

    onMounted(() => {
      const storedEmail = Cookies.get("email");
      if (storedEmail) {
        email.value = storedEmail;
        rememberMe.value = true;
      }
    });

    const login = async () => {
      if (!email.value.match(/^[\w.%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/)) {
        errorMessage.value = "Vui lòng nhập email hợp lệ!";
        return;
      }
      try {
        const _response = await axios.post(
          "http://localhost:8080/api/user/login",
          { email: email.value, matKhau: password.value }
        );
        localStorage.setItem("userInfo", JSON.stringify(_response.data));
        store.dispatch("login", { isLoggedIn: true, userInfo: _response.data });
        if (rememberMe.value) {
          Cookies.set("email", email.value, { expires: 7 });
        } else {
          Cookies.remove("email");
        }
        successMessage.value = "Đăng nhập thành công!";
        errorMessage.value = "";
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (error) {
        errorMessage.value =
          error.response?.data?.message || "Đăng nhập thất bại";
        successMessage.value = "";
      }
    };

    return {
      email, 
      password, 
      rememberMe, 
      errorMessage, 
      successMessage, 
      login
    };
  }
};
</script>
  
  <style scoped>
  .bg-gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  }
  
  .card {
    border-radius: 20px;
    overflow: hidden;
  }
  
  .form-control {
    background-color: #f4f4f4;
    border: none;
    transition: all 0.3s ease;
  }
  
  .form-control:focus {
    background-color: #ffffff;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  }
  
  .btn-primary {
    background-color: #6a11cb;
    border-color: #6a11cb;
    transition: all 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #5b14b3;
  }
  
  .form-check-input:checked {
    background-color: #6a11cb;
    border-color: #6a11cb;
  }
  </style>
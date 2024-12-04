<template>
    <div class="register-container min-vh-100 d-flex align-items-center bg-gradient">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-6 col-lg-5">
            <div class="card border-0 shadow-lg">
              <div class="card-body p-5">
                <h2 class="text-center mb-4 text-primary">Đăng Ký Tài Khoản</h2>
                <form @submit.prevent="register" class="needs-validation">
                  <div class="mb-3">
                    <label class="form-label">Họ Tên</label>
                    <input
                      v-model="hoTen"
                      type="text"
                      class="form-control rounded-pill"
                      placeholder="Nhập họ tên"
                      :disabled="loading"
                      required
                    />
                  </div>
  
                  <div class="mb-3">
                    <label class="form-label">Email</label>
                    <input
                      v-model="email"
                      type="email"
                      class="form-control rounded-pill"
                      placeholder="Nhập email"
                      :disabled="loading"
                      required
                    />
                  </div>
  
                  <div class="mb-3">
                    <label class="form-label">Mật Khẩu</label>
                    <input
                      v-model="matKhau"
                      type="password"
                      class="form-control rounded-pill"
                      placeholder="Nhập mật khẩu"
                      :disabled="loading"
                      required
                    />
                  </div>
  
                  <div v-if="errorMessage" class="alert alert-danger">
                    {{ errorMessage }}
                  </div>
  
                  <div class="d-flex justify-content-between align-items-center mb-3">
                    <router-link to="/login" class="text-muted text-decoration-none">
                      Đã có tài khoản?
                    </router-link>
                  </div>
  
                  <button
                    type="submit"
                    class="btn btn-primary w-100 rounded-pill"
                    :disabled="loading"
                  >
                    {{ loading ? "Đang đăng ký..." : "Đăng Ký" }}
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
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

export default {
  setup() {
    const hoTen = ref("");
    const email = ref("");
    const matKhau = ref("");
    const errorMessage = ref("");
    const loading = ref(false);
    const router = useRouter();

    const register = async () => {
      // Giữ nguyên logic ban đầu
      if (!hoTen.value || !email.value || !matKhau.value) {
        errorMessage.value = "Vui lòng điền đầy đủ thông tin.";
        return;
      }
      loading.value = true;
      try {
        let data = {
          hoTen: hoTen.value,
          email: email.value,
          matKhau: matKhau.value,
        };
        console.log(data);
        await axios.post(
          "http://localhost:8080/api/user/register",
          data
        );
        router.push("/login");
      } catch (error) {
        errorMessage.value = error.response?.data?.message || "Đăng ký thất bại";
      } finally {
        loading.value = false;
      }
    };

    return {
      hoTen,
      email,
      matKhau,
      errorMessage,
      loading,
      register
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
  </style>
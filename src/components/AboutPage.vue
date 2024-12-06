<template>
  <div class="user-profile-container py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-8 col-md-10">
          <div class="card shadow-lg border-0 rounded-4 overflow-hidden">
            <div class="card-header bg-primary text-white text-center py-4">
              <h2 class="mb-0">Trang Cá Nhân</h2>
            </div>
            <div class="card-body p-5">
              <div class="row align-items-center">
                <!-- Avatar Section -->
                <div class="col-md-4 text-center mb-4 mb-md-0">
                  <div class="avatar-container mb-3">
                    <img 
                      :src="avatarUrl || 'https://via.placeholder.com/200'"
                      class="img-fluid rounded-circle shadow-sm"
                      style="width: 200px; height: 200px; object-fit: cover;"
                      alt="Ảnh đại diện"
                    />
                    <label 
                      for="avatar" 
                      class="btn btn-outline-primary rounded-circle avatar-upload-btn"
                    >
                      <i class="bi bi-camera"></i>
                      <input 
                        type="file" 
                        id="avatar" 
                        class="d-none"
                        @change="handleAvatarChange" 
                      />
                    </label>
                  </div>
                </div>

                <!-- Form Section -->
                <div class="col-md-8">
                  <form @submit.prevent="updateUser" class="needs-validation" novalidate>
                    <div class="mb-3">
                      <label for="email" class="form-label">Email</label>
                      <input 
                        v-model="email" 
                        type="email" 
                        class="form-control" 
                        id="email" 
                        readonly 
                        required
                      />
                    </div>
                    <div class="mb-3">
                      <label for="hoTen" class="form-label">Họ Tên</label>
                      <input 
                        v-model="hoTen" 
                        type="text" 
                        class="form-control" 
                        id="hoTen" 
                        required 
                        placeholder="Nhập họ tên"
                      />
                    </div>
                    <div class="mb-3">
                      <label for="matKhau" class="form-label">Mật Khẩu</label>
                      <input 
                        v-model="matKhau" 
                        type="password" 
                        class="form-control" 
                        id="matKhau" 
                        required 
                        placeholder="Nhập mật khẩu mới"
                      />
                    </div>
                    <button 
                      type="submit" 
                      class="btn btn-primary w-100 mt-3" 
                      :disabled="loading"
                    >
                      <span 
                        v-if="loading" 
                        class="spinner-border spinner-border-sm me-2" 
                        role="status" 
                        aria-hidden="true"
                      ></span>
                      {{ loading ? "Đang cập nhật..." : "Cập Nhật Thông Tin" }}
                    </button>
                  </form>

                  <div 
                    v-if="errorMessage" 
                    class="alert mt-3" 
                    :class="errorMessage.includes('thành công') ? 'alert-success' : 'alert-danger'"
                  >
                    {{ errorMessage }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const email = ref("");
const hoTen = ref("");
const matKhau = ref("");
const avatarUrl = ref("");
const errorMessage = ref("");
const loading = ref(false);
const avatarFile = ref(null);

// Lấy dữ liệu người dùng từ localStorage
const data = localStorage.getItem("userInfo");

if (data) {
  const parsedData = JSON.parse(data);
  const savedEmail = parsedData?.email;
  if (savedEmail) {
    email.value = savedEmail;
    onMounted(async () => {
      loading.value = true;
      console.log(
        "Đang lấy thông tin người dùng từ API với email:",
        savedEmail
      );

      const apiUrl = `http://localhost:8080/api/user/${savedEmail}`;
      try {
        const response = await axios.get(apiUrl);
        console.log("Thông tin người dùng nhận được:", response.data);
        const user = response.data;
        hoTen.value = user.hoTen || "";

        avatarUrl.value = user.anh
          ? `http://localhost:8080/api/image/uploads/${user.anh}`
          : avatarUrl.value;
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
        errorMessage.value = "Không thể lấy thông tin người dùng!";
      } finally {
        loading.value = false;
      }
    });
  } else {
    console.log("Không tìm thấy email trong localStorage!");
    errorMessage.value = "Không tìm thấy email trong localStorage!";
  }
} else {
  console.log("Không có dữ liệu người dùng trong localStorage!");
  errorMessage.value = "Không có dữ liệu người dùng trong localStorage!";
}
// eslint-disable-next-line no-unused-vars
const logout = () => {
  console.log("Đăng xuất người dùng");
  localStorage.removeItem("data");
  window.location.href = "/login";
};

const handleAvatarChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Đã chọn tệp avatar mới:", file);
    avatarFile.value = file;
  }
};

const updateUser = async () => {
  loading.value = true;
  const updatedData = new FormData();
  updatedData.append("email", email.value);
  updatedData.append("hoTen", hoTen.value);
  updatedData.append("matKhau", matKhau.value);

  if (avatarFile.value) {
    console.log("Đang thêm avatar vào FormData:", avatarFile.value);
    updatedData.append("file", avatarFile.value);
  }

  console.log("Dữ liệu gửi đi:");
  for (let pair of updatedData.entries()) {
    console.log(pair[0] + ": " + pair[1]);
  }

  try {
    const apiUrl = `http://localhost:8080/api/user/${email.value}`;
    console.log("Gửi PUT request tới API:", apiUrl);

    const response = await axios.put(apiUrl, updatedData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    console.log(
      "Cập nhật thành công, thông tin nhận được từ API:",
      response.data
    );
    errorMessage.value = "Cập nhật thành công!";
    avatarUrl.value =
      `http://localhost:8080/api/image/uploads/${response.data.anh}` ||
      avatarUrl.value;
  } catch (error) {
    console.error("Lỗi khi cập nhật:", error);
    errorMessage.value = "Cập nhật thất bại!";
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.user-profile-container {
  background-color: #f8f9fa;
}

.card {
  transition: transform 0.3s ease;
}

.card:hover {
  transform: translateY(-5px);
}

.avatar-container {
  position: relative;
}

.avatar-upload-btn {
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background-color: #0056b3;
  transform: scale(1.02);
}

.form-control {
  border-radius: 8px;
  transition: all 0.3s ease;
}

.form-control:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
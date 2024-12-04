<template>
  <div class="page-wrapper">
    <!-- Welcome Section -->
    <div class="welcome-content text-center animate__animated animate__fadeIn">
      <div class="brand-logo mb-4">
        <i class="fas fa-user-circle fa-4x text-primary"></i>
      </div>
      <h2 class="fw-bold mb-4">Online Entertainment</h2>
      <button class="btn btn-primary btn-lg px-5" @click="openModal('signin')">
        Get Started
      </button>
    </div>

    <!-- Modal -->
    <div
      v-if="showModal"
      class="modal fade show"
      tabindex="-1"
      role="dialog"
      style="display: block;"
    >
      <div
        class="modal-dialog modal-dialog-centered animate__animated"
        :class="modalAnimation"
      >
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">{{ modalTitle }}</h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
            ></button>
          </div>
          <div class="modal-body p-4">
            <div v-if="errorMessage" class="alert alert-danger text-center">
              {{ errorMessage }}
            </div>

            <!-- Sign In Form -->
            <form
              v-if="currentModal === 'signin'"
              @submit.prevent="submitSignIn"
            >
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  placeholder="Email"
                  v-model="email"
                  required
                />
                <label for="username">Email</label>
              </div>
              <div class="form-floating mb-4">
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  placeholder="Password"
                  v-model="password"
                  required
                />
                <label for="password">Password</label>
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Sign In
              </button>
              <p class="text-center">
                Don't have an account? 
                <a
                  href="#"
                  class="text-primary"
                  @click.prevent="openModal('signup')"
                >
                  Sign Up
                </a>
              </p>
            </form>

            <!-- Sign Up Form -->
            <form
              v-if="currentModal === 'signup'"
              @submit.prevent="submitSignUp"
            >
              <div class="row">
                <div class="col-md-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="signupFullname"
                      placeholder="Full Name"
                      v-model="signupFullname"
                      required
                    />
                    <label for="signupFullname">Full Name</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="email"
                      class="form-control"
                      id="signupEmail"
                      placeholder="Email"
                      v-model="signupEmail"
                      required
                    />
                    <label for="signupEmail">Email</label>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="signupUsername"
                      placeholder="Username"
                      v-model="signupUsername"
                      required
                    />
                    <label for="signupUsername">Username</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input
                      type="password"
                      class="form-control"
                      id="signupPassword"
                      placeholder="Password"
                      v-model="signupPassword"
                      required
                    />
                    <label for="signupPassword">Password</label>
                  </div>
                </div>
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Create Account
              </button>
              <p class="text-center">
                Already have an account? 
                <a
                  href="#"
                  class="text-primary"
                  @click.prevent="openModal('signin')"
                >
                  Sign In
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn", // Đặt tên component cho SignIn
  data() {
    return {
      // Common
      showModal: false,
      currentModal: "signin", // "signin" or "signup"
      modalAnimation: "animate__fadeInUp",
      errorMessage: "",

      // Sign In
      email: "",
      password: "",

      // Sign Up
      signupFullname: "",
      signupEmail: "",
      signupUsername: "",
      signupPassword: "",
    };
  },
  computed: {
    modalTitle() {
      return this.currentModal === "signin" ? "Sign In" : "Create Account";
    },
  },
  methods: {
    openModal(type) {
      this.currentModal = type;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
      this.errorMessage = "";
    },
    async submitSignIn() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/login",
          { email: this.email, matKhau: this.password }
        );
        console.log("Login successful:", response.data);
        localStorage.setItem("userInfo", JSON.stringify(response.data));
        this.closeModal();
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Invalid email or password.";
      }
    },
    async submitSignUp() {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/user/register",
          {
            hoTen: this.signupFullname,
            email: this.signupEmail,
            matKhau: this.signupPassword,
          }
        );
        console.log("Sign-up successful:", response.data);
        this.closeModal();
        alert("Account created successfully!");
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Failed to create account.";
      }
    },
  },
};
</script>

<style scoped>
.page-wrapper {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.welcome-content {
  max-width: 400px;
  padding: 40px 20px;
}

.form-control {
  border-radius: 8px;
  border: 1px solid #e1e1e1;
}

.form-control:focus {
  box-shadow: 0 0 0 3px rgba(13, 110, 253, 0.15);
}

.btn-primary {
  border-radius: 8px;
  padding: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

/* Modal Styling */
.modal {
  background: rgba(0, 0, 0, 0.5);
}

.modal.show {
  display: flex !important;
  align-items: center;
  justify-content: center;
}

.modal-content {
  border: none;
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.modal-header {
  background: transparent;
  padding: 1.5rem 1.5rem 0.5rem;
}

.modal-title {
  font-weight: 600;
  color: #333;
}

.btn-close {
  background-color: #f8f9fa;
  padding: 0.75rem;
  border-radius: 50%;
  transition: background-color 0.2s;
}

.btn-close:hover {
  background-color: #e9ecef;
}

/* Animation durations */
.animate__fadeIn {
  animation-duration: 0.5s;
}

.animate__fadeInUp,
.animate__fadeInRight {
  animation-duration: 0.3s;
}

/* Responsive adjustments */
@media (max-width: 576px) {
  .modal-dialog {
    margin: 0.5rem;
    width: calc(100% - 1rem);
  }
}
</style>

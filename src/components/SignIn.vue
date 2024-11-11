<template>
  <div class="page-wrapper">
    <div class="welcome-content text-center animate__animated animate__fadeIn">
      <div class="brand-logo mb-4">
        <i class="fas fa-user-circle fa-4x text-primary"></i>
      </div>
      <h2 class="fw-bold mb-4">Online Entertainment</h2>
      <button class="btn btn-primary btn-lg px-5" @click="showSignIn = true">
        Get Started
      </button>
    </div>

    <!-- Modal Sign In -->
    <div v-if="showSignIn" class="modal fade" :class="{'show': showSignIn}" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered animate__animated" :class="modalAnimation">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Sign In</h5>
            <button type="button" class="btn-close" @click="showSignIn = false"></button>
          </div>
          <div class="modal-body p-4">
            <p class="text-danger">{{ error }}</p>
            <form @submit.prevent="submitLogin">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  placeholder="Username"
                  v-model="username"
                  required
                />
                <label for="username">Username</label>
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
            </form>
            <div class="text-center">
              <a href="#" class="text-primary" @click.prevent="switchModal('forgot')">
                Forgot your password?
              </a>
              <p class="mt-3 mb-0">
                Don't have an account? 
                <a href="#" class="text-primary" @click.prevent="switchModal('signup')">Sign Up</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Sign Up -->
    <div v-if="showSignUp" class="modal fade" :class="{'show': showSignUp}" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered animate__animated" :class="modalAnimation">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Create Account</h5>
            <button type="button" class="btn-close" @click="closeAllModals"></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submitSignUp">
              <div class="row">
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
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Create Account
              </button>
              <div class="text-center">
                <p class="mb-0">
                  Already have an account? 
                  <a href="#" class="text-primary" @click.prevent="switchModal('signin')">Sign In</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Forgot Password -->
    <div v-if="showForgotPassword" class="modal fade" :class="{'show': showForgotPassword}" tabindex="-1">
      <div class="modal-dialog modal-dialog-centered animate__animated" :class="modalAnimation">
        <div class="modal-content">
          <div class="modal-header border-0">
            <h5 class="modal-title">Reset Password</h5>
            <button type="button" class="btn-close" @click="closeAllModals"></button>
          </div>
          <div class="modal-body p-4">
            <form @submit.prevent="submitForgotPassword">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="forgotUsername"
                  placeholder="Username"
                  v-model="forgotUsername"
                  required
                />
                <label for="forgotUsername">Username</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="forgotEmail"
                  placeholder="Email"
                  v-model="forgotEmail"
                  required
                />
                <label for="forgotEmail">Email</label>
              </div>
              <button type="submit" class="btn btn-primary w-100 mb-3">
                Reset Password
              </button>
              <div class="text-center">
                <p class="mb-0">
                  Remember your password? 
                  <a href="#" class="text-primary" @click.prevent="switchModal('signin')">Sign In</a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      signupUsername: "",
      signupPassword: "",
      signupFullname: "",
      signupEmail: "",
      forgotUsername: "",
      forgotEmail: "",
      error: "",
      showSignIn: false,
      showSignUp: false,
      showForgotPassword: false,
      modalAnimation: 'animate__fadeInUp',
    };
  },
  methods: {
    closeAllModals() {
      this.showSignIn = false;
      this.showSignUp = false;
      this.showForgotPassword = false;
    },
    switchModal(type) {
      this.modalAnimation = 'animate__fadeInRight';
      
      // Đóng modal hiện tại
      this.closeAllModals();
      
      // Mở modal mới sau 300ms để có animation đẹp
      setTimeout(() => {
        switch(type) {
          case 'signin':
            this.showSignIn = true;
            break;
          case 'signup':
            this.showSignUp = true;
            break;
          case 'forgot':
            this.showForgotPassword = true;
            break;
        }
      }, 300);
    },
    submitLogin() {
      console.log("Logging in:", this.username, this.password);
    },
    submitSignUp() {
      console.log(
        "Signing up:",
        this.signupUsername,
        this.signupPassword,
        this.signupFullname,
        this.signupEmail
      );
      this.closeAllModals();
    },
    submitForgotPassword() {
      console.log(
        "Forgot Password for:",
        this.forgotUsername,
        this.forgotEmail
      );
      this.closeAllModals();
    },
  },
  name: "SigninPage",
};
</script>

<style scoped>
/* Add these imports in your main.js or index.html */
/* 
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
  <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet">
*/

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
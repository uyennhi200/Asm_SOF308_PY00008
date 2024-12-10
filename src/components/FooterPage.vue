<template>
  <footer class="footer-pastel py-5" style="background-color: #e6f2ff;">
    <div class="container">
      <div class="row text-dark">
        <div class="col-lg-4 mb-4 mb-lg-0">
          <div class="footer-logo mb-3">
            <h3 class="font-weight-bold text-primary">Revolve Blog</h3>
          </div>
          <p class="text-muted">Kết nối và nhận những thông tin mới nhất, insights độc đáo và ưu đãi đặc biệt.</p>
          <div class="social-icons mt-4">
            <a href="#" class="text-primary mr-3"><i class="fab fa-facebook-f"></i></a>
            <a href="#" class="text-primary mr-3"><i class="fab fa-twitter"></i></a>
            <a href="#" class="text-primary mr-3"><i class="fab fa-instagram"></i></a>
            <a href="#" class="text-primary"><i class="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        <div class="col-lg-4 mb-4 mb-lg-0">
          <h5 class="text-primary mb-3">Liên Kết Nhanh</h5>
          <div class="row">
            <div class="col-6">
              <ul class="list-unstyled">
                <li class="mb-2"><a href="#" class="text-muted">Trang Chủ</a></li>
                <li class="mb-2"><a href="#" class="text-muted">Dịch Vụ</a></li>
                <li class="mb-2"><a href="#" class="text-muted">Về Chúng Tôi</a></li>
              </ul>
            </div>
            <div class="col-6">
              <ul class="list-unstyled">
                <li class="mb-2"><a href="#" class="text-muted">Liên Hệ</a></li>
                <li class="mb-2"><a href="#" class="text-muted">Blog</a></li>
                <li class="mb-2"><a href="#" class="text-muted">Hỗ Trợ</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <h5 class="text-primary mb-3">Đăng Ký Nhận Tin</h5>
          <form>
            <div class="input-group mb-3">
              <input 
                type="email" 
                class="form-control" 
                placeholder="Nhập địa chỉ email" 
                aria-label="Email đăng ký"
              >
              <div class="input-group-append">
                <button class="btn btn-primary text-white" type="submit">
                  Đăng Ký
                </button>
              </div>
            </div>
          </form>
          <small class="text-muted">Nhận ưu đãi và thông tin mới nhất</small>
        </div>
      </div>
      
      <hr class="my-4">
      
      <div class="row">
        <div class="col-12 text-center">
          <p class="text-muted mb-0">
            &copy; 2024 Bản Quyền Thuộc Về Chúng Tôi. 
            Thiết Kế Bởi <span class="text-primary">Đội Ngũ Của Chúng Tôi</span>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterPage'
}
</script>

<style scoped>
.footer-pastel a {
  transition: color 0.3s ease;
}

.footer-pastel a:hover {
  color: #007bff !important;
  text-decoration: none;
}

.social-icons a {
  font-size: 1.2rem;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.social-icons a:hover {
  opacity: 1;
}

.btn-primary {
  background-color: #4a90e2;
  border-color: #4a90e2;
}

.btn-primary:hover {
  background-color: #357abd;
  border-color: #357abd;
}
</style>
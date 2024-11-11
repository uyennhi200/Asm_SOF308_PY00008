<template>
  <header class="header-top bg-grey justify-content-center">
    <div class="container">
      <div class="row align-items-center">
        <div class="col-lg-2 col-md-4 text-center d-none d-lg-block">
          <a class="navbar-brand" href="/">
            <img src="/images/logo.png" alt="" class="img-fluid" />
          </a>
        </div>

        <div class="col-lg-8 col-md-12">
          <nav class="navbar navbar-expand-lg navigation-2 navigation">
            <a class="navbar-brand text-uppercase d-lg-none" href="#">
              <img src="/images/logo.png" alt="" class="img-fluid" />
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
                <li class="nav-item"><a href="/" class="nav-link">Home</a></li>
                <li class="nav-item">
                  <a href="/about" class="nav-link">About</a>
                </li>
                <li class="nav-item dropdown">
                  <a
                    class="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown1"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Category
                  </a>
                  <div class="dropdown-menu" aria-labelledby="navbarDropdown1">
                    <a class="dropdown-item" href="standard-fullwidth.html"
                      >Korea Travel</a
                    >
                    <a class="dropdown-item" href="standard-left-sidebar.html"
                      >China Travel</a
                    >
                    <a class="dropdown-item" href="standard-right-sidebar.html"
                      >Vietnam Travel</a
                    >
                  </div>
                </li>

                <!--<li class="nav-item dropdown">
									<a class="nav-link dropdown-toggle" href="#" id="navbarDropdown2" role="button" data-toggle="dropdown"
										aria-haspopup="true" aria-expanded="false">
										Post Format
									</a>
									<div class="dropdown-menu" aria-labelledby="navbarDropdown2">
										<a class="dropdown-item" href="post-video.html">Video Formats</a>
										<a class="dropdown-item" href="post-audio.html">Audio Format</a>
										<a class="dropdown-item" href="post-link.html">Quote Format</a>
										<a class="dropdown-item" href="post-gallery.html">Gallery Format</a>
										<a class="dropdown-item" href="post-image.html">Image Format</a>
									</div>
								</li>-->

                <li class="nav-item">
                  <a href="contact.html" class="nav-link">Contact</a>
                </li>
                <li class="nav-item">
                  <a href="/manager" class="nav-link">Manager</a>
                </li>
              </ul>

              <ul class="list-inline mb-0 d-block d-lg-none">
                <li class="list-inline-item">
                  <a href="#"><i class="ti-facebook"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#"><i class="ti-twitter"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#"><i class="ti-linkedin"></i></a>
                </li>
                <li class="list-inline-item">
                  <a href="#"><i class="ti-pinterest"></i></a>
                </li>
              </ul>
            </div>
          </nav>
        </div>

        <div class="col-lg-2 col-md-4 col-6">
          <div class="header-socials-2 text-right d-none d-lg-block">
            <ul class="list-inline mb-0">
              <li class="list-inline-item">
                <a href="/signin" class="icon-login">
                  <i class="ti-user"></i> Login
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: "NavBar",
};
</script>

<style>
	.icon-login {
        display: inline-flex;
        align-items: center;
        gap: 6px; /* Khoảng cách giữa icon và chữ */
        color: #333; /* Màu sắc của chữ và icon */
        text-decoration: none; /* Xóa gạch chân */
		font-weight: bold;
		font-size: 25px;
    }
    .icon-login i {
        font-size: 18px; /* Kích thước của icon */
		
    }
</style>

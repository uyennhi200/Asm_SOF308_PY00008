<template>
  <div>
    <!-- Bootstrap Carousel -->
    <div id="blogCarousel" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-indicators">
        <button type="button" data-bs-target="#blogCarousel" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
        <button type="button" data-bs-target="#blogCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
        <button type="button" data-bs-target="#blogCarousel" data-bs-slide-to="2" aria-label="Slide 3"></button>
      </div>
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="images/slider/SL1.jpg" class="d-block w-100" alt="Slide 1">
          <div class="carousel-caption d-none d-md-block">
            <h5 class="carousel-title">KOREA</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/slider/SL2.jpg" class="d-block w-100" alt="Slide 2">
          <div class="carousel-caption d-none d-md-block">
            <h5 class="carousel-title">CHINA</h5>
          </div>
        </div>
        <div class="carousel-item">
          <img src="images/slider/SL3.jpg" class="d-block w-100" alt="Slide 3">
          <div class="carousel-caption d-none d-md-block">
            <h5 class="carousel-title">VIETNAM</h5>
          </div>
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#blogCarousel" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#blogCarousel" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <div class="blog-list-container py-5 bg-light">
      <div class="container">
        <h1 class="text-center mb-5 blog-title">Danh Sách Bài Viết</h1>

        <!-- Loading Indicator -->
        <div v-if="loading" class="text-center my-5">
          <div class="spinner-grow text-pastel-primary" role="status">
            <span class="visually-hidden">Đang tải...</span>
          </div>
        </div>

        <div v-if="errorMessage" class="alert alert-danger text-center" role="alert">
          <strong>{{ errorMessage }}</strong>
        </div>

        <div v-if="blogs.length > 0" class="row g-4">
          <div 
            v-for="blog in blogs" 
            :key="blog.ma" 
            class="col-12 col-md-6 col-lg-4"
          >
            <div class="card blog-card h-100 shadow-soft border-0">
              <router-link :to="`/blogDetail/${blog.ma}`" class="card-img-link">
                <div class="card-image-container">
                  <img
                    :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
                    alt="Blog Image"
                    class="card-img-top blog-image"
                  />
                </div>
              </router-link>
              <div class="card-body p-4 d-flex flex-column">
                <div class="d-flex justify-content-between align-items-center mb-3">
                  <span class="badge bg-pastel-secondary text-dark">
                  {{ formatDate(blog.thoiGian) }}
                  </span> 
                  <span class="text-muted author-name">
                  Tác giả: {{ blog.authorName }}
                  </span>
                </div>
                <h5 class="card-title mb-3 blog-title-text">
                  {{ blog.tieuDe }}
                </h5>
                <p class="card-text text-muted mb-4 blog-excerpt">
                  {{ blog.noiDung.substring(0, 100) }}...
                </p>
                <div class="mt-auto">
                  <router-link 
                    :to="`/blogDetail/${blog.ma}`" 
                    class="btn btn-pastel-primary stretched-link"
                  >
                    Đọc tiếp
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Pagination -->
        <div class="d-flex justify-content-center align-items-center mt-5">
          <nav aria-label="Blog navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 0 }">
                <button 
                  @click="prevPage" 
                  class="page-link"
                  :disabled="currentPage === 0"
                >
                  Trước
                </button>
              </li>
              <li 
                v-for="page in totalPages" 
                :key="page" 
                class="page-item" 
                :class="{ active: currentPage === page - 1 }"
              >
                <button 
                  @click="goToPage(page - 1)" 
                  class="page-link"
                >
                  {{ page }}
                </button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                <button 
                  @click="nextPage" 
                  class="page-link"
                  :disabled="currentPage === totalPages - 1"
                >
                  Tiếp
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { format } from "date-fns";
import { ref, onMounted } from "vue";
import axios from "axios";

const blogs = ref([]);
const loading = ref(true);
const errorMessage = ref("");

const currentPage = ref(0);
const totalPages = ref(0);
const pageSize = ref(6); // Số lượng bài viết trên mỗi trang

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy");
};

onMounted(async () => {
  await loadBlogs(currentPage.value);
});

const loadBlogs = async (page) => {
  loading.value = true;
  try {
    const response = await axios.get(
      `http://localhost:8080/api/blogs?page=${page}&size=${pageSize.value}`
    );

    const totalResponse = await axios.get(
      `http://localhost:8080/api/blogs/size-page?size=${pageSize.value}`
    );

    blogs.value = response.data;
    totalPages.value = totalResponse.data;
  } catch (error) {
    errorMessage.value = "Không thể tải dữ liệu bài viết!";
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value - 1) {
    currentPage.value++;
    loadBlogs(currentPage.value);
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
    loadBlogs(currentPage.value);
  }
};

const goToPage = (page) => {
  currentPage.value = page;
  loadBlogs(currentPage.value);
};
</script>

<style scoped>
:root {
  --pastel-primary: #6495ED;
  --pastel-secondary: #E6E6FA;
  --soft-shadow: rgba(0, 0, 0, 0.1);
}

.blog-list-container {
  background-color: #f8f9fa;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.blog-title {
  color: var(--pastel-primary);
  font-weight: 700;
  letter-spacing: 1px;
}

/* Carousel Caption Styles */
.carousel-caption {
  background-color: rgba(0,0,0,0.6);
  border-radius: 15px;
  padding: 15px;
  text-align: center;
}

.carousel-title {
  font-size: 3rem;
  font-weight: 700;
  color: white;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 10px;
  background-color: rgba(100, 149, 237, 0.5);
  display: inline-block;
  padding: 10px 20px;
  border-radius: 10px;
}

.blog-card {
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.blog-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px var(--soft-shadow);
}

.card-image-container {
  height: 250px;
  overflow: hidden;
}

.blog-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.carousel-item img {
  height: 500px;
  object-fit: cover;
}

.blog-card:hover .blog-image {
  transform: scale(1.1);
}

.blog-title-text {
  color: #333;
  font-weight: 600;
  transition: color 0.3s ease;
}

.blog-card:hover .blog-title-text {
  color: var(--pastel-primary);
}

.blog-excerpt {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.btn-pastel-primary {
  background-color: var(--pastel-primary);
  color: rgb(92, 160, 238);
  border: none;
  transition: all 0.3s ease;
}

.btn-pastel-primary:hover {
  background-color: darken(#6495ED, 10%);
  transform: translateY(-3px);
}

.badge {
  background-color: var(--pastel-secondary);
}

.author-name {
  font-size: 0.9rem;
  font-style: italic;
}

@media (max-width: 768px) {
  .blog-card {
    margin-bottom: 20px;
  }
}
</style>
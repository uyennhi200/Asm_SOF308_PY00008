<template>
  <section class="slider mt-4">
    <div class="container-fluid">
      <div class="row">
        <!-- Slider code giữ nguyên -->
        <div class="col-lg-4 col-md-6 mb-4" v-for="(blog, index) in sliderBlogs" :key="index">
          <div class="slider-item-content">
            <div class="post-thumb mb-4">
              <router-link :to="`/detail/${blog.id}`">
                <img :src="blog.image" alt="" class="img-fluid" />
              </router-link>
            </div>
            <div class="slider-post-content">
              <span class="cat-name text-color font-sm font-extra text-uppercase letter-spacing">
                {{ blog.category }}
              </span>
              <h3 class="post-title mt-1">
                <router-link :to="`/detail/${blog.id}`">{{ blog.title }}</router-link>
              </h3>
              <span class="text-muted text-capitalize">{{ formatDate(blog.date) }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <div class="container">
      <div class="row">
        <!-- Danh sách bài viết -->
        <div class="col-lg-3 col-md-6" v-for="(blog, index) in blogs" :key="index">
          <article class="post-grid mb-5">
            <router-link class="post-thumb mb-4 d-block" :to="`/detail/${blog.id}`">
              <img :src="blog.image" alt="" class="img-fluid w-100" />
            </router-link>
            <span class="cat-name text-color font-sm font-extra text-uppercase letter-spacing">
              {{ blog.category }}
            </span>
            <h3 class="post-title mt-1">
              <router-link :to="`/detail/${blog.id}`">{{ blog.title }}</router-link>
            </h3>
            <span class="text-muted letter-spacing text-uppercase font-sm">
              {{ formatDate(blog.date) }}
            </span>
          </article>
        </div>
      </div>

      <!-- Pagination -->
      <div class="m-auto">
        <div class="pagination mt-5 pt-4">
          <ul class="list-inline">
            <li class="list-inline-item">
              <button @click="prevPage" :disabled="currentPage === 0" class="btn btn-link">Previous</button>
            </li>
            <li class="list-inline-item">{{ currentPage + 1 }} / {{ totalPages }}</li>
            <li class="list-inline-item">
              <button @click="nextPage" :disabled="currentPage === totalPages - 1" class="btn btn-link">Next</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { ref, onMounted } from "vue";
import axios from "axios";

export default {
  name: "IndexPage",
  setup() {
    const blogs = ref([]);
    const sliderBlogs = ref([]);
    const loading = ref(true);  
    const currentPage = ref(0);
    const totalPages = ref(0);

    const loadBlogs = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/blogs?page=${currentPage.value}`
        );
        blogs.value = response.data.content;
        sliderBlogs.value = blogs.value.slice(0, 3); // Chọn 3 bài đầu làm slider
        totalPages.value = response.data.totalPages;
      } catch (error) {
        console.error("Error loading blogs:", error);
      } finally {
        loading.value = false;
      }
    };

    const nextPage = async () => {
      if (currentPage.value < totalPages.value - 1) {
        currentPage.value++;
        await loadBlogs();
      }
    };

    const prevPage = async () => {
      if (currentPage.value > 0) {
        currentPage.value--;
        await loadBlogs();
      }
    };

    const formatDate = (date) => {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return new Date(date).toLocaleDateString(undefined, options);
    };

    onMounted(loadBlogs);

    return { blogs, sliderBlogs, loading, currentPage, totalPages, nextPage, prevPage, formatDate };
  },
};
</script>

<style>
.slider-item-content {
  text-align: center;
}

.post-thumb img {
  width: 100%;
  height: auto;
  border-radius: 8px;
}

.slider-post-content {
  padding-top: 15px;
}

.cat-name {
  color: #555;
  font-weight: bold;
}
</style>

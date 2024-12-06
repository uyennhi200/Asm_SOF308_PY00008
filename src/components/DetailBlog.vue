<template>
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-pastel-blue" role="status">
        <span class="sr-only">Đang tải...</span>
      </div>
    </div>
  
    <div v-else-if="errorMessage" class="alert alert-pastel-red text-center" role="alert">
      <strong>{{ errorMessage }}</strong>
    </div>
  
    <div v-else-if="blog" class="container blog-detail my-5">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-8">
          <div class="blog-header text-center mb-4">
            <h1 class="display-5 text-pastel-purple">{{ blog.tieuDe }}</h1>
          </div>
  
          <div class="blog-image mb-4">
            <img
              :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
              alt="Blog Image"
              class="img-fluid rounded-lg shadow-soft"
            />
          </div>
  
          <div class="blog-content bg-pastel-green p-4 rounded-lg mb-4">
            <p class="text-dark">{{ blog.noiDung }}</p>
          </div>
  
          <div class="comments-section">
            <h4 class="text-pastel-blue mb-3">Bình luận</h4>
  
            <div v-if="comments.length === 0" class="text-center text-muted">
              <button class="btn btn-pastel-pink" @click="showComments">
                Hiển thị bình luận
              </button>
            </div>
  
            <div v-if="loadingComments" class="text-center">
              <div class="spinner-border text-pastel-blue" role="status">
                <span class="sr-only">Đang tải bình luận...</span>
              </div>
            </div>
  
            <div class="comments-list">
              <div v-for="comment in comments" :key="comment.id" class="comment-card mb-3">
                <div class="card bg-pastel-lavender">
                  <div class="card-body">
                    <p class="mb-0">
                      <strong class="text-pastel-purple">{{ comment.hoTenNguoiComment }}:</strong>
                      {{ comment.noiDung }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
  
            <div v-if="isLoggedIn" class="comment-form mt-4">
              <h5 class="text-pastel-blue mb-3">Thêm bình luận</h5>
              <form @submit.prevent="submitComment">
                <div class="form-group">
                  <textarea
                    id="commentText"
                    class="form-control bg-pastel-yellow"
                    v-model="newComment"
                    placeholder="Viết bình luận của bạn"
                    required
                  ></textarea>
                </div>
                <button type="submit" class="btn btn-pastel-pink mt-3">
                  Gửi bình luận
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import { useStore } from "vuex";
  import { computed } from "vue";
  
  const store = useStore();
  
  const isLoggedIn = computed(() => store.getters.getLoginStatus);
  
  const route = useRoute();
  const blog = ref(null);
  const comments = ref([]);
  const newComment = ref("");
  const loading = ref(true);
  const loadingComments = ref(false);
  const errorMessage = ref("");
  
  const getBlog = async (blogId) => {
    try {
      const blogResponse = await axios.get(
        `http://localhost:8080/api/blogs/${blogId}`
      );
      blog.value = blogResponse.data;
      console.log(blogResponse);
    } catch (error) {
      console.error("Lỗi khi tải bài viết:", error);
      errorMessage.value = "Không thể tải bài viết!";
    }
  };
  
  const getComments = async (blogId) => {
    try {
      const commentsResponse = await axios.get(
        `http://localhost:8080/api/comments/blog/${blogId}`
      );
      comments.value = commentsResponse.data;
    } catch (error) {
      console.error("Lỗi khi tải bình luận:", error);
      errorMessage.value = "Không thể tải bình luận!";
    } finally {
      loadingComments.value = false;
    }
  };
  
  const submitComment = async () => {
    try {
      const blogId = route.params.id;
      const data = localStorage.getItem("userInfo");
      const parsedData = JSON.parse(data);
      const email = parsedData?.email || "Người dùng chưa đăng nhập";
  
      const newCommentData = {
        email: email,
        blogId: blogId,
        noiDung: newComment.value,
      };
  
      await axios.post(`http://localhost:8080/api/comments/add`, newCommentData);
  
      await getComments(blogId);
  
      newComment.value = "";
    } catch (error) {
      console.error("Lỗi khi gửi bình luận:", error);
    }
  };
  
  onMounted(async () => {
    const blogId = route.params.id;
    console.log(blogId);
  
    await getBlog(blogId);
    loading.value = false;
  });
  
  const showComments = () => {
    const blogId = route.params.id;
    getComments(blogId);
  };
  </script>
  
  <style scoped>
  :root {
    --pastel-blue: #A7C7E7;
    --pastel-green: #C1E1C1;
    --pastel-pink: #FFB6C1;
    --pastel-purple: #D8BFD8;
    --pastel-yellow: #FFFACD;
    --pastel-lavender: #E6E6FA;
    --pastel-red: #FFB6C1;
    --pastel-indigo: #6A5ACD;
  }
  
  .text-pastel-blue { color: var(--pastel-blue); }
  .text-pastel-green { color: var(--pastel-green); }
  .text-pastel-pink { color: var(--pastel-pink); }
  .text-pastel-purple { color: var(--pastel-purple); }
  .text-pastel-yellow { color: var(--pastel-yellow); }
  
  .bg-pastel-blue { background-color: var(--pastel-blue); }
  .bg-pastel-green { background-color: var(--pastel-green); }
  .bg-pastel-pink { background-color: var(--pastel-pink); }
  .bg-pastel-purple { background-color: var(--pastel-purple); }
  .bg-pastel-yellow { background-color: var(--pastel-yellow); }
  .bg-pastel-lavender { background-color: var(--pastel-lavender); }
  
  .btn-pastel-pink {
    background-color: var(--pastel-pink);
    color: var(--pastel-indigo);
    border: 2px solid var(--pastel-purple);
    transition: all 0.3s ease;
    font-weight: 600;
    padding: 10px 20px;
  }
  
  .btn-pastel-pink:hover {
    background-color: var(--pastel-purple);
    color: white;
    transform: scale(1.05);
  }
  
  .comment-form textarea {
    border: 2px solid var(--pastel-blue);
    border-radius: 10px;
    transition: all 0.3s ease;
  }
  
  .comment-form textarea:focus {
    border-color: var(--pastel-pink);
    box-shadow: 0 0 10px rgba(255,182,193,0.2);
  }
  
  .alert-pastel-red {
    background-color: var(--pastel-red);
    color: white;
  }
  
  .shadow-soft {
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  }
  
  .rounded-lg {
    border-radius: 0.75rem;
  }
  
  .blog-detail {
    font-family: 'Arial', sans-serif;
  }
  
  .comment-card .card {
    border: none;
  }
  
  textarea {
    min-height: 120px;
    resize: vertical;
  }
  </style>
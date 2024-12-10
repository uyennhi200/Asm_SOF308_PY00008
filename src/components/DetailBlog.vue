<template>
  <div v-if="loading" class="text-center py-5">
    <div class="spinner-border text-primary" role="status">
      <span class="sr-only">Đang tải...</span>
    </div>
  </div>

  <div v-else-if="errorMessage" class="alert alert-danger text-center" role="alert">
    <strong>{{ errorMessage }}</strong>
  </div>

  <div v-else-if="blog" class="container blog-detail my-5">
    <div class="row justify-content-center">
      <div class="col-lg-10 col-xl-8">
        <div class="blog-header text-center mb-5">
          <h1 class="display-5 text-primary">{{ blog.tieuDe }}</h1>
        </div>

        <div class="blog-image mb-5 shadow-lg">
          <img
            :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
            alt="Blog Image"
            class="img-fluid rounded-4 blog-image-hover"
          />
        </div>

        <div class="blog-content bg-soft-primary p-4 rounded-4 mb-5">
          <p class="text-dark-primary lead">{{ blog.noiDung }}</p>
        </div>

        <div class="comments-section">
          <h3 class="text-primary mb-4 border-bottom pb-3">
            <i class="fas fa-comments me-2"></i>
            Bình luận ({{ comments.length }})
          </h3>

          <div v-if="comments.length === 0" class="text-center mb-4">
            <p class="text-muted">Chưa có bình luận.</p>
          </div>

          <div v-else class="comments-list space-y-4">
            <div v-for="comment in comments" :key="comment.id" class="comment-card">
              <div class="card border-0 bg-soft-secondary shadow-sm">
                <div class="card-body p-3">
                  <div class="d-flex align-items-center mb-2">
                    <div class="avatar avatar-sm me-3">
                      <span class="avatar-text rounded-circle bg-primary text-white">
                        {{ comment.hoTenNguoiComment.charAt(0).toUpperCase() }}
                      </span>
                    </div>
                    <div>
                      <h6 class="mb-0 text-primary">{{ comment.hoTenNguoiComment }}</h6>
                      <small class="text-muted">{{ formatDate(comment.thoiGian) }}</small>
                    </div>
                  </div>
                  <p class="mb-0 text-dark-primary">{{ comment.noiDung }}</p>
                </div>
              </div>
            </div>
          </div>

          <div v-if="isLoggedIn" class="comment-form mt-5">
            <h4 class="text-primary mb-4 border-bottom pb-3">
              <i class="fas fa-edit me-2"></i>Thêm bình luận
            </h4>
            <form @submit.prevent="submitComment">
              <div class="form-group mb-3">
                <textarea
                  id="commentText"
                  class="form-control comment-textarea"
                  v-model="newComment"
                  placeholder="Viết bình luận của bạn"
                  required
                ></textarea>
              </div>
              <button type="submit" class="btn btn-primary">
                <i class="fas fa-paper-plane me-2"></i>Gửi bình luận
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { format } from "date-fns";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useStore } from "vuex";
import { computed } from "vue";

const formatDate = (dateString) => {
  return format(new Date(dateString), "dd/MM/yyyy");
};
const store = useStore();

const isLoggedIn = computed(() => store.getters.getLoginStatus);

const route = useRoute();
const blog = ref(null);
const comments = ref([]);
const newComment = ref("");
const loading = ref(true);
const errorMessage = ref("");

const getBlog = async (blogId) => {
  try {
    const blogResponse = await axios.get(
      `http://localhost:8080/api/blogs/${blogId}`
    );
    blog.value = blogResponse.data;
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
    comments.value = commentsResponse.data || []; // Nếu không có bình luận, mảng sẽ rỗng.
  } catch (error) {
    console.warn("Bài viết này chưa có bình luận hoặc xảy ra lỗi khi tải bình luận.");
    comments.value = []; // Đảm bảo mảng rỗng khi có lỗi.
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

  // Tải bài viết trước
  await getBlog(blogId);

  // Tải bình luận
  await getComments(blogId);

  // Hoàn thành tải dữ liệu
  loading.value = false;
});
</script>
<style scoped>
:root {
  --primary: #4a90e2;
  --primary-soft: #e6f2ff;
  --secondary-soft: #f0f4f8;
  --dark-primary: #2c3e50;
}

.text-primary { color: var(--primary) !important; }
.text-dark-primary { color: var(--dark-primary) !important; }
.bg-soft-primary { background-color: var(--primary-soft) !important; }
.bg-soft-secondary { background-color: var(--secondary-soft) !important; }

.blog-image-hover {
  transition: transform 0.3s ease;
}

.blog-image-hover:hover {
  transform: scale(1.02);
}

.comment-textarea {
  border: 2px solid var(--primary);
  border-radius: 10px;
  transition: all 0.3s ease;
  min-height: 150px;
}

.comment-textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 10px rgba(74, 144, 226, 0.2);
}

.comment-form .btn-primary {
  background-color: var(--primary);
  transition: all 0.3s ease;
}

.comment-form .btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 6px rgba(74, 144, 226, 0.3);
}

.avatar-text {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: bold;
}

.blog-detail {
  font-family: 'Roboto', 'Arial', sans-serif;
}
</style>

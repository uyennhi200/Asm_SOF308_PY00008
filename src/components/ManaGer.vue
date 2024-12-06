<template>
  <div class="blog-management bg-light-pastel">
    <section id="profile" class="profile section bg-pastel-pink">
      <div class="container">
        <div class="text-center my-5">
          <h1 class="fw-bolder text-dark-pastel">Quản lý Bài viết</h1>
        </div>
      </div>
    </section>

    <div class="container py-4">
      <div class="row justify-content-center">
        <div class="col-12 col-md-10">
          <div class="card shadow-sm border-pastel mb-4">
            <div class="card-body bg-light-blue">
              <form 
                @submit.prevent="isEditing ? editBlog() : addBlog()" 
                class="col-12"
              >
                <div class="mb-3">
                  <label for="tieuDe" class="form-label text-pastel-dark">Tiêu đề</label>
                  <input
                    v-model="tieuDe"
                    type="text"
                    class="form-control form-control-lg bg-white border-pastel"
                    id="tieuDe"
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="noiDung" class="form-label text-pastel-dark">Nội dung</label>
                  <textarea
                    v-model="noiDung"
                    class="form-control form-control-lg bg-white border-pastel"
                    id="noiDung"
                    rows="5"
                    required
                  ></textarea>
                </div>
                <div class="mb-3">
                  <label for="hinh" class="form-label text-pastel-dark">Hình ảnh</label>
                  <input
                    @change="handleFileChange"
                    type="file"
                    class="form-control form-control-lg bg-white border-pastel"
                    id="hinh"
                    accept="image/*"
                  />
                </div>

                <div class="d-flex gap-2">
                  <button 
                    type="submit" 
                    class="btn btn-pastel-green"
                  >
                    {{ isEditing ? "Cập nhật" : "Thêm" }}
                  </button>
                  <button
                    type="reset"
                    @click="cancelEdit"
                    class="btn btn-pastel-pink"
                    v-if="isEditing"
                  >
                    Hủy
                  </button>
                </div>
              </form>
            </div>
          </div>

          <div class="card shadow-sm border-pastel">
            <div class="card-body bg-light-blue">
              <div class="table-responsive">
                <table class="table table-hover">
                  <thead class="bg-pastel-blue">
                    <tr>
                      <th scope="col" class="text-pastel-dark">STT</th>
                      <th scope="col" class="text-pastel-dark">Tiêu đề</th>
                      <th scope="col" class="text-pastel-dark">Nội dung</th>
                      <th scope="col" class="text-pastel-dark">Hình</th>
                      <th colspan="2" class="text-pastel-dark text-center">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(blog, index) in blogs" 
                      :key="blog.ma" 
                      class="bg-white"
                    >
                      <td>{{ index + 1 }}</td>
                      <td>{{ blog.tieuDe }}</td>
                      <td>{{ blog.noiDung.substring(0, 100) }}...</td>
                      <td>
                        <img
                          :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
                          class="img-thumbnail rounded blog-image"
                          alt="Blog Image"
                        />
                      </td>
                      <td>
                        <button 
                          @click="editBlogForm(blog.ma)" 
                          class="btn btn-pastel-yellow btn-sm"
                        >
                          Sửa
                        </button>
                      </td>
                      <td>
                        <button 
                          @click="deleteBlog(blog.ma)" 
                          class="btn btn-pastel-red btn-sm"
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Toàn bộ script giữ nguyên từ code ban đầu
import { ref, onMounted } from "vue";
import axios from "axios";

const blogs = ref([]);
const tieuDe = ref("");
const noiDung = ref("");
const hinh = ref(null);
const isEditing = ref(false);
const editingBlogId = ref(null);

const data = localStorage.getItem("userInfo");
const parsedData = JSON.parse(data);
const savedEmail = parsedData?.email;

onMounted(async () => {
  if (savedEmail) {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/blogs/user/${savedEmail}`
      );
      blogs.value = response.data;
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu bài viết:", error);
    }
  } else {
    console.log("Email không tồn tại trong localStorage");
  }
});

const addBlog = async () => {
  try {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("tieuDe", tieuDe.value);
    formData.append("noiDung", noiDung.value);
    if (hinh.value) {
      formData.append("file", hinh.value);
    }

    console.log(hinh.value);

    const response = await axios.post(
      "http://localhost:8080/api/blogs/add",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("Thêm bài viết thành công!");
      blogs.value.push(response.data);
      tieuDe.value = "";
      noiDung.value = "";
      hinh.value = null;
    }
  } catch (error) {
    console.error("Lỗi khi thêm bài viết:", error);
    alert("Có lỗi xảy ra khi thêm bài viết.");
  }
};

const editBlogForm = (blogId) => {
  const blogToEdit = blogs.value.find((blog) => blog.ma === blogId);
  if (blogToEdit) {
    tieuDe.value = blogToEdit.tieuDe;
    noiDung.value = blogToEdit.noiDung;
    hinh.value = null;
    isEditing.value = true;
    editingBlogId.value = blogId;
  }
};

const editBlog = async () => {
  try {
    const formData = new FormData();
    formData.append("email", savedEmail);
    formData.append("tieuDe", tieuDe.value);
    formData.append("noiDung", noiDung.value);
    if (hinh.value) {
      formData.append("file", hinh.value);
    }

    const response = await axios.put(
      `http://localhost:8080/api/blogs/update/${editingBlogId.value}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200) {
      alert("Sửa bài viết thành công!");
      const index = blogs.value.findIndex(
        (blog) => blog.ma === editingBlogId.value
      );
      if (index !== -1) {
        blogs.value[index] = response.data;
      }
      isEditing.value = false;
      tieuDe.value = "";
      noiDung.value = "";
      hinh.value = null;
    }
  } catch (error) {
    console.error("Lỗi khi sửa bài viết:", error);
    alert("Có lỗi xảy ra khi sửa bài viết.");
  }
};

const cancelEdit = () => {
  isEditing.value = false;
  tieuDe.value = "";
  noiDung.value = "";
  hinh.value = null;
};

const deleteBlog = async (blogId) => {
  const confirmDelete = confirm("Bạn có chắc chắn muốn xóa bài viết này?");
  if (confirmDelete) {
    try {
      const response = await axios.delete(
        `http://localhost:8080/api/blogs/${blogId}`
      );
      if (response.status === 200) {
        alert("Xóa bài viết thành công!");
        blogs.value = blogs.value.filter((blog) => blog.ma !== blogId);
      }
    } catch (error) {
      console.error("Lỗi khi xóa bài viết:", error);
      alert("Có lỗi xảy ra khi xóa bài viết.");
    }
  }
};

const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    hinh.value = file;
  }
};
</script>

<style scoped>
:root {
  --pastel-pink: #FFB6C1;
  --pastel-blue: #87CEFA;
  --pastel-green: #98FB98;
  --pastel-yellow: #FFFFE0;
  --pastel-red: #FFA07A;
  
  --light-pastel: #F0F8FF;
  --light-blue: #E6F2FF;
  --pastel-dark: #4A4A4A;
}

.bg-pastel-pink { background-color: var(--pastel-pink) !important; }
.bg-pastel-blue { background-color: var(--pastel-blue) !important; }
.bg-light-pastel { background-color: var(--light-pastel) !important; }
.bg-light-blue { background-color: var(--light-blue) !important; }

.text-pastel-dark { color: var(--pastel-dark) !important; }

.btn-pastel-green { 
  background-color: var(--pastel-green);
  color: var(--pastel-dark);
}
.btn-pastel-pink { 
  background-color: var(--pastel-pink);
  color: var(--pastel-dark);
}
.btn-pastel-yellow { 
  background-color: var(--pastel-yellow);
  color: var(--pastel-dark);
}
.btn-pastel-red { 
  background-color: var(--pastel-red);
  color: var(--pastel-dark);
}

.border-pastel {
  border: 1px solid var(--pastel-blue);
}

.blog-image {
  max-width: 150px;
  max-height: 100px;
  object-fit: cover;
}
</style>
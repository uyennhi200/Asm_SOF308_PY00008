<template>
  <div class="blog-management min-vh-100 bg-soft-pastel">
    <div class="container py-5">
      <div class="row justify-content-center">
        <div class="col-12 col-lg-10 col-xl-8">
          <div class="card card-elegant shadow-lg border-0 mb-4">
            <div class="card-header bg-gradient-pastel text-center py-3">
              <h2 class="text mb-0 fw-bold">Quản Lý Bài Viết</h2>
            </div>
            
            <div class="card-body p-4">
              <form 
                @submit.prevent="isEditing ? editBlog() : addBlog()" 
                class="blog-form"
              >
                <div class="row g-3">
                  <div class="col-12">
                    <label for="tieuDe" class="form-label">Tiêu đề</label>
                    <input
                      v-model="tieuDe"
                      type="text"
                      class="form-control form-control-lg elegant-input"
                      id="tieuDe"
                      placeholder="Nhập tiêu đề bài viết"
                      required
                    />
                  </div>
                  
                  <div class="col-12">
                    <label for="noiDung" class="form-label">Nội dung</label>
                    <textarea
                      v-model="noiDung"
                      class="form-control form-control-lg elegant-input"
                      id="noiDung"
                      rows="5"
                      placeholder="Nhập nội dung bài viết"
                      required
                    ></textarea>
                  </div>
                  
                  <div class="col-12">
                    <label for="hinh" class="form-label">Hình ảnh</label>
                    <input
                      @change="handleFileChange"
                      type="file"
                      class="form-control form-control-lg elegant-input"
                      id="hinh"
                      accept="image/*"
                    />
                  </div>
                  
                  <div class="col-12 d-flex gap-3">
                    <button 
                      type="submit" 
                      class="btn btn-primary flex-grow-1"
                    >
                      {{ isEditing ? "Cập Nhật" : "Thêm Bài Viết" }}
                    </button>
                    
                    <button
                      v-if="isEditing"
                      type="reset"
                      @click="cancelEdit"
                      class="btn btn-secondary flex-grow-1"
                    >
                      Hủy
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div class="card card-elegant shadow-lg border-0">
            <div class="card-header bg-gradient-pastel text-center py-3">
              <h3 class="text-white mb-0 fw-bold">Danh Sách Bài Viết</h3>
            </div>
            
            <div class="card-body p-0">
              <div class="table-responsive">
                <table class="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th class="text-center">STT</th>
                      <th>Tiêu Đề</th>
                      <th class="d-none d-md-table-cell">Nội Dung</th>
                      <th>Hình</th>
                      <th class="text-center">Hành Động</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr 
                      v-for="(blog, index) in blogs" 
                      :key="blog.ma" 
                      class="blog-row"
                    >
                      <td class="text-center">{{ index + 1 }}</td>
                      <td>{{ blog.tieuDe }}</td>
                      <td class="d-none d-md-table-cell">
                        {{ blog.noiDung.substring(0, 50) }}...
                      </td>
                      <td>
                        <img
                          :src="`http://localhost:8080/api/image/uploads/${blog.anh}`"
                          class="blog-thumbnail"
                          alt="Blog Image"
                        />
                      </td>
                      <td class="text-center">
                        <div class="btn-group" role="group">
                          <button 
                            @click="editBlogForm(blog.ma)" 
                            class="btn btn-sm btn-warning"
                          >
                            Sửa
                          </button>
                          <button 
                            @click="deleteBlog(blog.ma)" 
                            class="btn btn-sm btn-danger"
                          >
                            Xóa
                          </button>
                        </div>
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
import { ref, onMounted } from "vue";
import axios from "axios";

// Script remains exactly the same as the original
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
  --color-primary: #6a11cb;
  --color-secondary: #2575fc;
  --color-background: #f4f5f7;
  --color-text-dark: #333;
  --color-text-light: #fff;
}

.bg-soft-pastel {
  background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
  background-attachment: fixed;
}

.card-elegant {
  border-radius: 15px;
  overflow: hidden;
}

.bg-gradient-pastel {
  background: linear-gradient(45deg, var(--color-primary), var(--color-secondary));
}

.elegant-input {
  border-radius: 10px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.elegant-input:focus {
  border-color: var(--color-primary);
  box-shadow: 0 4px 6px rgba(106, 17, 203, 0.2);
}

.blog-thumbnail {
  width: 100px;
  height: 70px;
  object-fit: cover;
  border-radius: 8px;
}

.blog-row {
  transition: background-color 0.3s ease;
}

.blog-row:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.table thead {
  background-color: rgba(255, 255, 255, 0.1);
}

.btn-group .btn {
  padding: 0.25rem 0.5rem;
}
</style>
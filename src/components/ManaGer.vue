<template>
  <div>
    <!-- Form CRUD -->
    <form @submit.prevent="handleSubmit" class="p-4 border rounded shadow-sm bg-light">
      <h4 class="text-center mb-4">{{ form.id ? 'Edit Article' : 'Add New Article' }}</h4>

      <!-- Hidden ID Field -->
      <div class="mb-3" v-if="form.id">
        <label class="form-label">Article ID:</label>
        <input type="text" class="form-control" v-model="form.id" readonly>
      </div>

      <!-- Title Field -->
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input type="text" class="form-control" v-model="form.title" required placeholder="Enter article title">
      </div>

      <!-- Category Select -->
      <div class="mb-3">
        <label class="form-label">Category:</label>
        <select v-model="form.categoryId" class="form-select" required>
          <option disabled value="">Please Select Category*</option>
          <option v-for="category in categories" :key="category.idCategories" :value="category.idCategories">
            {{ category.names }}
          </option>
        </select>
      </div>

      <!-- Content Field -->
      <div class="mb-3">
        <label class="form-label">Content:</label>
        <textarea rows="5" class="form-control" v-model="form.content" required placeholder="Enter article content"></textarea>
      </div>

      <!-- Posted Date Field -->
      <div class="mb-3">
        <label class="form-label">Posted Date:</label>
        <input type="date" class="form-control" v-model="form.postedDate" required>
      </div>

      <!-- Image Upload -->
      <div class="mb-3">
        <label class="form-label">Image:</label>
        <input name="image" type="file" class="form-control" @change="handleFileUpload">
      </div>

      <!-- Checkbox for Home -->
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" v-model="form.home">
        <label class="form-check-label">Post to the front page?</label>
      </div>

      <!-- Action Buttons -->
      <div class="text-center mt-4">
        <button v-if="!form.id" @click="createArticle" type="submit" class="btn btn-success mx-1">Add</button>
        <button v-if="form.id" @click="updateArticle" type="submit" class="btn btn-info mx-1">Update</button>
        <button @click="deleteArticle" v-if="form.id" type="button" class="btn btn-danger mx-1">Delete</button>
        <button @click="resetForm" type="button" class="btn btn-secondary mx-1">Reset</button>
      </div>
    </form>

    <hr class="my-4">

    <!-- Table Display Articles -->
    <h4 class="text-center mb-4">Articles List</h4>
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>STT</th>
          <th>Title</th>
          <th>Posted Date</th>
          <th>Category</th>
          <th>Front page?</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="articles.length === 0">
          <td colspan="6" class="text-center">No articles available</td>
        </tr>
        <tr v-for="(article, index) in articles" :key="article.id">
          <td>{{ index + 1 }}</td>
          <td>{{ article.title }}</td>
          <td>{{ article.postedDate }}</td>
          <td>{{ article.category.names }}</td>
          <td>{{ article.home ? 'Yes' : 'No' }}</td>
          <td>
            <button @click="editArticle(article)" class="btn btn-sm btn-info">Edit</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  name: 'ArticleManager',
  data() {
    return {
      articles: [], // Danh sách bài viết
      categories: [], // Danh sách thể loại
      form: {
        id: null,
        title: '',
        content: '',
        categoryId: '',
        home: false,
        image: null, // Dùng để upload file
      },
    };
  },
  methods: {
    // Fetch danh sách bài viết và thể loại từ API
    async fetchData() {
      try {
        const articlesResponse = await axios.get('http://localhost:8081/api/articles');
        const categoriesResponse = await axios.get('http://localhost:8081/api/categories');
        this.articles = articlesResponse.data;
        this.categories = categoriesResponse.data;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    // Xử lý file upload
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.form.image = file;
    },
    // Reset form
    resetForm() {
      this.form = {
        id: null,
        title: '',
        content: '',
        categoryId: '',
        home: false,
        image: null,
      };
    },
    // Thêm bài viết mới
    async createArticle() {
      try {
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('content', this.form.content);
        formData.append('categoryId', this.form.categoryId);
        formData.append('home', this.form.home);
        if (this.form.image) {
          formData.append('image', this.form.image);
        }

        await axios.post('http://localhost:8081/api/articles', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Article added successfully!');
        this.fetchData(); // Làm mới danh sách
        this.resetForm(); // Xóa dữ liệu form
      } catch (error) {
        console.error('Error creating article:', error);
      }
    },
    // Cập nhật bài viết
    async updateArticle() {
      if (!this.form.id) {
        alert('Please select an article to edit!');
        return;
      }

      try {
        const formData = new FormData();
        formData.append('title', this.form.title);
        formData.append('content', this.form.content);
        formData.append('categoryId', this.form.categoryId);
        formData.append('home', this.form.home);
        if (this.form.image) {
          formData.append('image', this.form.image);
        }

        await axios.put(`http://localhost:8081/api/articles/${this.form.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        alert('Article updated successfully!');
        this.fetchData();
        this.resetForm();
      } catch (error) {
        console.error('Error updating article:', error);
      }
    },
    // Xóa bài viết
    async deleteArticle() {
      if (!this.form.id) {
        alert('Please select an article to delete!');
        return;
      }

      try {
        await axios.delete(`http://localhost:8081/api/articles/${this.form.id}`);
        alert('Article deleted successfully!');
        this.fetchData();
        this.resetForm();
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    },
    // Điền thông tin bài viết vào form để sửa
    editArticle(article) {
      this.form = { ...article, categoryId: article.category.idCategories };
    },
  },
  async mounted() {
    await this.fetchData(); // Tải dữ liệu khi component được gắn vào
  },
};
</script>

<style>
.form-label {
  font-weight: bold;
}

.form-control,
.form-select {
  border-radius: 8px;
}

.btn {
  min-width: 80px;
}

.table {
  margin-top: 20px;
}

.table th,
.table td {
  text-align: center;
  vertical-align: middle;
}
</style>

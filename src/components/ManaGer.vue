<template>
    <form method="post" enctype="multipart/form-data" class="p-4 border rounded shadow-sm bg-light">
      <div class="mb-3">
        <input type="hidden" class="form-control" name="idNews" readonly>
      </div>
  
      <div class="mb-3">
        <label class="form-label">Title:</label>
        <input type="text" class="form-control" name="title" required>
      </div>
  
      <div class="mb-3">
        <label class="form-label">Category:</label>
        <select name="category" class="form-select" required>
          <option disabled selected>Please Select Category*</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>
  
      <div class="mb-3">
        <label class="form-label">Content:</label>
        <textarea rows="5" class="form-control" required name="content"></textarea>
      </div>
  
      <div class="mb-3">
        <label class="form-label">Image:</label>
        <input name="image" type="file" class="form-control">
      </div>
  
      <div class="form-check mb-3">
        <input type="checkbox" class="form-check-input" name="home" value="true">
        <label class="form-check-label">Post to the front page?</label>
      </div>
  
      <div class="text-center mt-4">
        <button formaction="${path}/create" class="btn btn-info mx-1">Add</button>
        <button formaction="${path}/update" class="btn btn-info mx-1">Edit</button>
        <button formaction="${path}/delete" class="btn btn-danger mx-1">Delete</button>
        <button formaction="${path}/reset" class="btn btn-info mx-1">Reset</button>
      </div>
    </form>
  
    <hr class="my-4">
  
    <table class="table table-striped table-bordered">
      <thead class="table-dark">
        <tr>
          <th>STT</th>
          <th>Title</th>
          <th>Posted Date</th>
          <th>Author</th>
          <th>Category</th>
          <th>Front page?</th>
          <th>Edit</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>Sample Title</td>
          <td>2023-12-01</td>
          <td>Admin</td>
          <td>Category Name</td>
          <td>Yes</td>
          <td><a href="#" class="btn btn-sm btn-info">Edit</a></td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script>
  export default {
    name: 'ManaGer'
  }
  </script>
  
  <style>
    /* Tuỳ chỉnh CSS để có giao diện đẹp */
    .form-label {
      font-weight: bold;
    }
  
    .form-control, .form-select {
      border-radius: 8px;
    }
  
    .btn {
      min-width: 80px;
    }
  
    .table {
      margin-top: 20px;
    }
  
    .table th, .table td {
      text-align: center;
      vertical-align: middle;
    }
  </style>
  
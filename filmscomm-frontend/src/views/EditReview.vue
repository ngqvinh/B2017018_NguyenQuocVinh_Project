<template>
  <div v-if="review" class="edit-form">
    <div class="jumbotron">
      <h4>Điều chỉnh thông tin tập phim</h4>
      <reviewListForm :review="review" @review-submit="updateReview" @review-delete="deleteReview" />
      <div role="alert">{{ message }}</div>
    </div>
  </div>
  <div v-else>
    <br />
    <p>Không tìm thấy!!!</p>
  </div>
</template>
<script>
import ReviewService from "../services/review.service";
import reviewListForm from "../components/reviewListForm.vue";
export default {
  name: "EditReview",
  components: {
    reviewListForm,
  },
  data() {
    return {
      review: null,
      message: "",
    };
  },
  methods: {
    async getReview(id) {
      const [error, response] = await this.handle(ReviewService.getone(id));
      if (error) {
        console.log(error);
      } else {
        this.review = response.data;
        console.log(response.data);
      }
    },
    async updateReview(data) {
      const [error, response] = await this.handle(
        ReviewService.update(this.$route.params.id, data)
      );
      if (error) {
        console.log(error);
        this.message = " Không có quyền chỉnh sửa";
      } else {
        console.log(response.data);
        this.message = " Cập nhật thành công.";
      }
    },
    async deleteReview() {
      const [error, response] = await this.handle(
        ReviewService.delete(this.review.id)
      );
      if (error) {
        console.log(error);
        this.message = "Không có quyền chỉnh sửa";
      } else {
        console.log(response.data);
        alert("Đã xóa");
      }
    },
  },
  mounted() {
    this.message = "";
    this.getReview(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 450px;
  margin: auto;
}
</style>
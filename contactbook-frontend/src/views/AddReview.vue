<template>
  <div class="edit-form">
    <div class="jumbotron">
      <h4>Thêm phim</h4>
      <reviewListForm :review="review" @review-submit="addreview" @review-delete="resetreview" />
      <p>{{ message }}</p>
    </div>

  </div>
</template>
<script>
import ReviewService from "../services/review.service";
import reviewListForm from "../components/reviewListForm.vue";
export default {
  name: "AddReview",
  components: {
    reviewListForm,
  },
  data() {
    return {
      review: {
        episode: "",
        content: "",
        rating: "",
        url: "",
      },
      message: "",
    };
  },
  methods: {
    async addreview(data) {
      data.infoId = this.$route.params.id;
      console.log("input: ", data);
      const [error, response] = await this.handle(ReviewService.create(this.$route.params.id, data));
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Phim được thêm thành công.";
      }
    },
    resetreview() {
      alert("reset");
    },
  },
  mounted() {
    this.message = "";
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
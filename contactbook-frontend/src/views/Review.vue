<template>
  <div class="lisrow">
    <div class="col-md-11">
      <div
        v-for="(review, index) in listReview"
        :key="review.id"
        @click="setActiveReview(review, index)"
      >
        <div class="card mb-3 bg-white">
          <div class="row no-gutters">
            <div class="col-md-6">
              <div>
                <iframe width="450px" height="250px" v-bind:src="review.url" allowfullscreen></iframe>
              </div>
            </div>
            <div class="col-md-6">
              <div class="card-body">
                <h1 class="mt-0">{{ review.episode }}</h1>
                <p>Nội dung: {{ review.content }}</p>
                <p>Đánh giá: {{ review.rating }}</p>
                <div v-if="currentUser">
                  <div v-if="currentUser.id === review.ownerId">
                    <router-link :to="{ path: '/reviews/edit/' + review.id }">
                      <button>Chỉnh sửa</button>
                    </router-link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-link :to="{ path: this.$route.params.id + '/add' }">
      <button class="btn btn-info" type="button">Thêm tập phim</button>
    </router-link>
  </div>
</template>
<script>
import ReviewService from "../services/review.service";

export default {
  name: "Anime Review",
  data() {
    return {
      listReview: [],
      currentReviewId: -1,
      currentReview: null,
      episodeToSearch: "",
      currentUser: null,
    };
  },
  methods: {
    setActiveReview(review, index) {
      this.currentReviewId = index;
      this.currentReview = review;
    },

    async retrieveReview() {
      const [error, response] = await this.handle(
        ReviewService.get(this.$route.params.id)
      );
      if (error) {
        console.log(error);
      } else {
        this.listReview = response.data;
        console.log(response.data);
      }
    },
  },

  mounted() {
    this.retrieveReview();
    this.currentUser = this.$store.getters.loggedInUser;
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>

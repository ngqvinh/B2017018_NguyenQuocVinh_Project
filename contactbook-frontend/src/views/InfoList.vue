<template>
  <div class="lisrow">
    <div class="col-md-11">
      <div class="mb-3 input-group">
        <input
          type="text"
          class="form-control"
          placeholder="Tên phim"
          v-model="nameToSearch"
        />
        <div class="input-group-append">
          <button class="btn btn-secondary" type="button" @click="searchName">
            Tìm kiếm
          </button>
        </div>
      </div>
    </div>

    <div class="row row-cols-2 row-cols-md-3">
      <div
        class="col mb-4 rounded"
        v-for="(info, index) in listInfo"
        :key="info.id"
        @click="setActiveInfo(info, index)"
      >
        <div class="card">
          <img
            v-bind:src="info.illustrator"
            class="card-img-top"
            style="width: auto; height: 250px"
          />
          <div class="card-body">
            <router-link :to="{ path: '/reviews/' + info.id }">
              <h5 class="card-title">{{ info.title }}</h5>
            </router-link>
            <p class="card-text">Quốc gia: {{ info.nation }}</p>
            <p v-if="info.vietsub === true">
              Vietsub: <i class="fas fa-check-circle"></i>
            </p>
            <p class="card-text" v-if="info.vietsub === false">
              Vietsub: <i class="fas fa-times-circle"></i>
            </p>
            <p class="card-text">Thể loại: {{ info.type }}</p>
          </div>
          <div class="card-footer">
            <div v-if="currentUser">
              <div v-if="currentUser.id === info.ownerId">
                <router-link :to="{ path: '/edit/' + info.id }">
                  <button>Chỉnh sửa</button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import InfoService from "../services/info.service";

export default {
  name: "Anime Info",
  data() {
    return {
      listInfo: [],
      currentInfoId: -1,
      currentInfo: null,
      nameToSearch: "",
      currentUser: null,
    };
  },
  methods: {
    setActiveInfo(info, index) {
      this.currentInfoId = index;
      this.currentInfo = info;
    },

    async retrieveInfo() {
      const [error, response] = await this.handle(InfoService.getAll());
      if (error) {
        console.log(error);
      } else {
        this.listInfo = response.data;
        console.log(response.data);
      }
    },

    async searchName() {
      const [error, response] = await this.handle(
        InfoService.findByName(this.nameToSearch)
      );
      if (error) {
        console.log(error);
      } else {
        this.listInfo = response.data;
        this.setActiveInfo(null);
        console.log(response.data);
      }
    },
  },

  mounted() {
    this.retrieveInfo();
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

<template>
  <div class="edit-form">
    <div class="jumbotron">
      <h4>Thêm Phim</h4>
      <infoListForm :info="info" @info-submit="addInfo" @info-delete="resetInfo" />
      <p>{{ message }}</p>
    </div>
  </div>

</template>
<script>
import InfoService from "../services/info.service";
import infoListForm from "../components/infoListForm.vue";
export default {
  name: "AddInfo",
  components: {
    infoListForm,
  },
  data() {
    return {
      info: {
        title: "",
        illustrator: "",
        nation: "",
        type: "",
        num_episodes: "",
        vietsub: false,
        compendious: "",
      },
      message: "",
    };
  },
  methods: {
    async addInfo(data) {
      console.log("input: ", data);
      const [error, response] = await this.handle(InfoService.create(data));
      if (error) {
        console.log(error);
      } else {
        console.log(response.data);
        this.message = "Phim được thêm thành công.";
      }
    },
    resetInfo() {
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
  max-width: 450px;
  margin: auto;
}
</style>
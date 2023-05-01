<template>
  <div v-if="info" class="edit-form">
    <div class="jumbotron">
      <h4>Điều chỉnh thông tin</h4>
      <infoListForm :info="info" @info-submit="updateInfo" @info-delete="deleteInfo" />
      <div role="alert">{{ message }}</div>
    </div>
  </div>
  <div v-else>
    <br />
    <p>Không tìm thấy!!!</p>
  </div>
</template>
<script>
import InfoService from "../services/info.service";
import infoListForm from "../components/infoListForm.vue";
export default {
  name: "EditInfo",
  components: {
    infoListForm,
  },
  data() {
    return {
      info: null,
      message: "",
    };
  },
  methods: {
    async getInfo(id) {
      const [error, response] = await this.handle(InfoService.get(id));
      if (error) {
        console.log(error);
      } else {
        this.info = response.data;
        console.log(response.data);
      }
    },
    async updateInfo(data) {
      const [error, response] = await this.handle(
        InfoService.update(this.info.id, data)
      );
      if (error) {
        console.log(error);
        this.message = " Không có quyền chỉnh sửa";
      } else {
        console.log(response.data);
        this.message = " Cập nhật thành công.";
      }
    },
    async deleteInfo() {
      const [error, response] = await this.handle(
        InfoService.delete(this.info.id)
      );
      if (error) {
        console.log(error);
        this.message = "Không có quyền chỉnh sửa";
        this.$router.push({ path: "/info" });
      } else {
        console.log(response.data);
        alert("Đã xóa")
        this.$router.push({ path: "/info" });
      }
    },
  },
  mounted() {
    this.message = "";
    this.getInfo(this.$route.params.id);
  },
};
</script>
<style>
.edit-form {
  max-width: 400px;
  margin: auto;
}
</style>
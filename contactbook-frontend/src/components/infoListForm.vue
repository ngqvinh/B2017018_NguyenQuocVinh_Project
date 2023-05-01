<template>
  <Form @submit="$emit('info-submit', infoLocal)" :validation-schema="schema">
    <div class="form-group">
      <label for="title">Tên phim</label>
      <Field
        name="title"
        type="text"
        class="form-control"
        v-model="infoLocal.title"
      />
      <ErrorMessage name="title" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="illustrator">Link ảnh</label>
      <Field
        name="illustrator"
        type="text"
        class="form-control"
        v-model="infoLocal.illustrator"
      />
      <ErrorMessage name="illustrator" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="nation">Quốc gia</label>
      <Field
        name="nation"
        type="text"
        class="form-control"
        v-model="infoLocal.nation"
      />
      <ErrorMessage name="nation" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="type">Thể loại</label>
      <Field
        name="type"
        type="text"
        class="form-control"
        v-model="infoLocal.type"
      />
      <ErrorMessage name="type" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="num_episodes">Số tập</label>
      <Field
        name="num_episodes"
        type="text"
        class="form-control"
        v-model="infoLocal.num_episodes"
      />
      <ErrorMessage name="num_episodes" class="error-feedback" />
    </div>

    <div class="form-group form-check">
      <input
        name="vietsub"
        type="checkbox"
        class="form-check-input"
        v-model="infoLocal.vietsub"
      />
      <label for="vietsub" class="form-check-label">
        <strong>Vietsub</strong>
      </label>
    </div>
    <div class="form-group">
      <label for="exampleFormControlTextarea1">Tóm tắt</label>
      <textarea
        name="compendious"
        type="text"
        class="form-control"
        rows="5"
        v-model="infoLocal.compendious"
      ></textarea>
      <ErrorMessage name="compendious" class="error-feedback" />
    </div>

    <div class="form-group">
      <button class="btn btn-success">Lưu</button>
      <button
        v-if="infoLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('info-delete', infoLocal.id)"
      >
        Xóa
      </button>
    </div>
  </Form>
</template>
<script>
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "infoListForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["info-submit", "info-delete"],
  props: ["info"],
  data() {
    const schema = yup.object().shape({
      title: yup
        .string()
        .required("Tên phải có giá trị.")
    });
    return {
      infoLocal: this.info,
      schema,
    };
  },
};
</script>
<style>
@import "../assets/styles/main.css";
</style>

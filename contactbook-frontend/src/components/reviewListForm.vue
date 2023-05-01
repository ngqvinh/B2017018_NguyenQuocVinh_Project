<template>
  <Form
    @submit="$emit('review-submit', reviewLocal)"
    :validation-schema="schema"
  >
    <div class="form-group">
      <label for="episode">Tập phim:</label>
      <Field
        name="episode"
        type="text"
        class="form-control"
        v-model="reviewLocal.episode"
      />
      <ErrorMessage name="episode" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="content">Nội dung tập phim:</label>
      <Field
        name="content"
        type="text"
        class="form-control"
        v-model="reviewLocal.content"
      />
      <ErrorMessage name="content" class="error-feedback" />
    </div>

    <div class="form-group">
      <label for="rating">Đánh giá:</label>
      <Field
        name="rating"
        type="number"
        class="form-control"
        v-model="reviewLocal.rating"
      />
      <ErrorMessage name="rating" class="error-feedback" />
    </div>
    <div class="form-group">
      <label for="url">link tập phim:</label>
      <Field
        name="url"
        type="text"
        class="form-control"
        v-model="reviewLocal.url"
      />
      <ErrorMessage name="url" class="error-feedback" />
    </div>
    <div class="form-group">
      <button class="btn btn-success" type="submit">Lưu</button>
      <button
        v-if="reviewLocal.id"
        type="button"
        class="ml-2 btn btn-danger"
        @click="$emit('review-delete', reviewLocal.id)"
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
  name: "reviewListForm",
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  emits: ["review-submit", "review-delete"],
  props: ["review"],
  data() {
    const schema = yup.object().shape({
      episode: yup
        .string()
        .required("Chưa nhập tập phim.")
    });
    return {
      reviewLocal: this.review,
      schema,
    };
  },
};
</script>
<style>
@import "../assets/styles/main.css";
</style>

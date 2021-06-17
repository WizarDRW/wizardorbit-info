<template>
  <div>
    <h3 class="secondary--text">
      {{ _ly == "daily" ? "Bugün" : _ly == "monthly" ? "1 Ay" : "1 Yıl" }}
      içerisinde en çok okunanlar
    </h3>
    <br />
    <v-card
      color="v_card_background"
      tile
      rounded
      outlined
      hover
      v-for="item in getImpressionSort()"
      :key="item._id"
    >
      <div @click="toContent(item)" class="click">
        <v-img :src="item.image_path" width="100px" height="auto"></v-img>
        <v-card-title>
          {{ item.name }}
        </v-card-title>
        <v-card-text>
          <span>{{ item.short_description }}</span>
        </v-card-text>
      </div>
    </v-card>
  </div>
</template>

<script>
import moment from "moment";
export default {
  props: {
    _news: {
      type: String,
    },
    _ly: {
      type: String,
      default: "daily",
    },
  },
  methods: {
    getImpressionSort() {
      if (this._ly == "daily") {
        let array = JSON.parse(this._news)
          .filter(
            (x) =>
              moment(x.create_date) == moment() ||
              moment(x.create_date) >= moment().subtract(1, "days")
          )
          .sort((x, y) => y.impression - x.impression);
        return array;
      } else if (this._ly == "monthly") {
        let array = JSON.parse(this._news)
          .filter(
            (x) =>
              moment(x.create_date) == moment() ||
              moment(x.create_date) >= moment().subtract(1, "months")
          )
          .sort((x, y) => y.impression - x.impression);
        return array;
      } else {
        let array = JSON.parse(this._news)
          .filter(
            (x) =>
              moment(x.create_date) == moment() ||
              moment(x.create_date) >= moment().subtract(1, "years")
          )
          .sort((x, y) => y.impression - x.impression);
        return array;
      }
    },
    toContent(item) {
      this.$emit("content", item);
    },
  },
};
</script>

<style lang="scss">
.card-body p {
  font-size: 13px;
}
@media only screen and (max-width: 1200px) {
  .card-text {
    display: none;
  }
}
.click {
  cursor: pointer;
}
.v-card{
  color: var(--v-v_card_title_color-base) !important
}
</style>
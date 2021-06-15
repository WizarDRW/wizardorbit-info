<template>
  <div>
    <v-card tile rounded outlined hover>
      <v-timeline align-top dense>
        <v-timeline-item
          color="white"
          small
          v-for="item in getDateSort()"
          :key="item._id"
        >
          <v-row class="pt-1">
            <v-col sm="1" md="1">
              <strong>{{
                new Date(item.create_date) | moment("from", "now")
              }}</strong>
            </v-col>
            <v-col>
              <div @click="toContent(item)" class="click">
                <strong>{{ item.name }}</strong>
                <br />
                <i>{{ item.short_description }}</i>
              </div>
              <div class="caption">
                <ul>
                  <li v-for="category in item.categories" :key="category">
                    <v-tooltip color="blue" bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-icon v-bind="attrs" v-on="on">
                          {{ category.icon }}
                        </v-icon>
                      </template>
                      <span>{{ category.label }}</span>
                    </v-tooltip>
                  </li>
                </ul>
                <br />
                <div @click="profile(item.user_data)">
                  <v-avatar size="60">
                    <v-img
                      :src="
                        item.user_data.image_path
                          ? item.user_data.image_path
                          : require('@/assets/vendor/img/null_profile.png')
                      "
                      alt=""
                    ></v-img>
                  </v-avatar>
                  <div class="timeline-user-info">
                    <v-card-subtitle
                      v-if="
                        item.user_data.first_name || item.user_data.last_name
                      "
                    >
                      <div
                        v-if="
                          item.user_data.first_name &&
                          item.user_data.last_name &&
                          item.user_data.reverse
                        "
                      >
                        {{
                          item.user_data.last_name
                            ? item.user_data.last_name
                            : ""
                        }},
                        {{
                          item.user_data.first_name
                            ? item.user_data.first_name
                            : ""
                        }}
                      </div>
                      <div v-else>
                        {{
                          item.user_data.first_name
                            ? item.user_data.first_name
                            : ""
                        }}
                        {{
                          item.user_data.last_name
                            ? item.user_data.last_name
                            : ""
                        }}
                      </div>
                    </v-card-subtitle>
                    <v-card-subtitle v-if="item.user_data.username">
                      @{{ item.user_data.username }}
                    </v-card-subtitle>
                    <v-card-subtitle v-if="item.user_data.email">
                      {{ item.user_data.email }}
                    </v-card-subtitle>
                    <v-card-subtitle v-if="item.user_data.title">
                      {{ item.user_data.title }}
                    </v-card-subtitle>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-timeline-item>
      </v-timeline>
    </v-card>
  </div>
</template>

<script>
import { USER } from "@/core/services/store/user.module";
export default {
  props: {
    _news: {
      type: String,
    },
  },
  methods: {
    getCategories(categories) {
      var cat = "";
      categories.forEach((element, index, array) => {
        if (index === array.length - 1) {
          cat += element;
        } else cat += element + ", ";
      });
      return cat;
    },
    getDateSort() {
      let array = JSON.parse(this._news).sort(
        (x, y) => new Date(y.create_date) - new Date(x.create_date)
      );
      return array;
    },
    profile(item) {
      this.$store.dispatch(USER, item);
      this.$router.push({ name: `Profile`, params: { id: item._id } });
    },
    toContent(item) {
      this.$emit("content", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.right {
  float: right;
  width: 100px;
  transition: width 2s;
}
.right:hover {
  width: 150px;
  z-index: 999;
}
.click {
  cursor: pointer;
}
ul {
  padding: 0;
}
ul li {
  display: inline;
  list-style: none;
  padding-right: 10px;
}
</style>
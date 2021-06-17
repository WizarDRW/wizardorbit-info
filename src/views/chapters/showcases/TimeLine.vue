<template>
  <v-card tile rounded outlined color="v_card_background">
    <v-container>
      <v-timeline>
        <v-timeline-item
          color="white"
          small
          v-for="(item, index) in getDateSort()"
          :key="index"
        >
          <v-card color="v_timeline_card_background" @click="toContent(item)">
            <v-card-title>{{ item.name }}</v-card-title>
            <v-card-subtitle
              ><i>{{ item.short_description }}</i></v-card-subtitle
            >
            <v-card-subtitle
              ><strong>{{
                item.create_date | moment("from", "now")
              }}</strong></v-card-subtitle
            >
            <v-card-actions class="caption">
              <ul>
                <li
                  v-for="(category, cat_index) in item.categories"
                  :key="cat_index"
                >
                  <v-tooltip color="v_tooltip_success_color" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon color="v_timeline_card_color" v-bind="attrs" v-on="on">
                        {{ category.icon }}
                      </v-icon>
                    </template>
                    <span>{{ category.label }}</span>
                  </v-tooltip>
                </li>
              </ul>
            </v-card-actions>
          </v-card>
          <template v-slot:icon>
            <v-avatar>
              <v-img
                :src="
                  item.user_data.image_path
                    ? item.user_data.image_path
                    : require('@/assets/vendor/img/null_profile.png')
                "
              ></v-img>
            </v-avatar>
          </template>
          <template v-slot:opposite>
            <div class="timeline-user-info">
              <v-card-subtitle
                v-if="item.user_data.first_name || item.user_data.last_name"
              >
                <div
                  v-if="
                    item.user_data.first_name &&
                    item.user_data.last_name &&
                    item.user_data.reverse
                  "
                >
                  {{
                    item.user_data.last_name ? item.user_data.last_name : ""
                  }},
                  {{
                    item.user_data.first_name ? item.user_data.first_name : ""
                  }}
                </div>
                <div v-else>
                  {{
                    item.user_data.first_name ? item.user_data.first_name : ""
                  }}
                  {{ item.user_data.last_name ? item.user_data.last_name : "" }}
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
          </template>
        </v-timeline-item>
      </v-timeline>
    </v-container>
  </v-card>
</template>

<script>
import { USER } from "@/core/services/store/user.module";
export default {
  props: {
    _chapters: {
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
      let array = JSON.parse(this._chapters).sort(
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

<style scoped>
ul {
  padding: 0;
}
ul li {
  display: inline;
  list-style: none;
  padding-right: 10px;
}
.v-card, .v-card__subtitle {
  color: var(--v-v_card_title_color-base) !important;
}
.timeline-user-info .v-card__subtitle {
  padding: 5px;
}
</style>
<template>
  <div>
    <v-card>
      <v-timeline align-top dense>
        <v-timeline-item
          color="white"
          small
          v-for="item in getDateSort()"
          :key="item._id"
        >
          <v-row class="pt-1">
            <v-col sm="2" md="2">
              <strong>{{ item.create_date | moment("from", "now") }}</strong>
            </v-col>
            <v-col>
              <div @click="toContent(item)" class="click">
                <strong>{{ item.name }}</strong>
              </div>
              <div class="caption">
                <ul>
                  <li v-for="category in item.categories" :key="category.id">
                    <v-tooltip color="green" bottom>
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
                <div>
                  <v-avatar size="60">
                    <img
                      :src="
                        item.user_data.image_path
                          ? item.user_data.image_path
                          : require('@/assets/vendor/img/null_profile.png')
                      "
                      alt=""
                    />
                  </v-avatar>
                  <div class="timeline-user-info">
                    <v-card-subtitle v-if="item.user_data.first_name || item.user_data.last_name">
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
export default {
  props: {
    _forums: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      datas: [],
    };
  },
  computed: {
    filterForms: {
      get() {
        return this.datas;
      },
      set(val) {
        this.datas = val;
      },
    },
  },
  methods: {
    getDateSort() {
      return this._forums;
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
a {
  text-decoration: none;
  color: #fff;
}
.timeline-user-info .v-card__subtitle {
  padding: 5px;
}
</style>
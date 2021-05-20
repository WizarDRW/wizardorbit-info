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
              <strong>{{
                item.create_date | moment("from", "now")
              }}</strong>
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
                    <img :src="item.user_data.image_path" alt="" />
                  </v-avatar>
                  <p>
                    {{
                      item.user_data.first_name + " " + item.user_data.last_name
                    }}
                    <br />
                    <span>{{ item.user_data.title }}</span>
                  </p>
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
      default: () => []
    },
  },
  data() {
    return {
      forums: this._forums,
    };
  },
  methods: {
    getDateSort() {
      return this._forums.sort(
        (x, y) => new Date(y.create_date) - new Date(x.create_date)
      );
    },
    toContent(item){
      this.$emit("content", item)
    }
  },
  computed: {},
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
</style>
<template>
  <v-card color="v_card_background">
    <v-container>
      <v-timeline>
        <v-timeline-item
          color="white"
          small
          v-for="item in getDateSort()"
          :key="item._id"
        >
          <v-card color="v_timeline_card_background" @click="toContent(item)">
            <v-card-title>
              {{ item.name }}
            </v-card-title>
            <slot :item="item"></slot>
            <v-card-subtitle
              ><strong>{{
                item.create_date | moment()
              }}</strong></v-card-subtitle
            >
            <v-card-actions class="caption">
              <ul>
                <li v-for="category in item.categories" :key="category.id">
                  <v-tooltip color="v_tooltip_success_color" bottom>
                    <template v-slot:activator="{ on, attrs }">
                      <v-icon
                        color="v_timeline_card_color"
                        v-bind="attrs"
                        v-on="on"
                      >
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
            <v-btn
              @click="
                $router.push({
                  name: 'Profile',
                  params: { username: item.user_data.username },
                })
              "
              fab
              color="tertiary"
            >
              <v-avatar>
                <v-img
                  :src="
                    item.user_data.image_path
                      ? item.user_data.image_path
                      : require('@/assets/vendor/img/null_profile.png')
                  "
                ></v-img>
              </v-avatar>
            </v-btn>
          </template>
          <template v-slot:opposite>
            <div
              @click="
                $router.push({
                  name: 'Profile',
                  params: { username: item.user_data.username },
                })
              "
              class="timeline-user-info"
            >
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
import moment from 'moment'
require('moment/locale/tr')
export default {
  props: {
    _contents: {
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
      return this._contents;
    },
    toContent(item) {
      this.$emit("content", item);
    },
  },
  filters: {
    moment: function(date){
      return moment(date).fromNow()
    }
  }
};
</script>

<style lang="scss" scoped>
ul {
  padding: 0;
}
ul li {
  display: inline;
  list-style: none;
  padding-right: 10px;
}
.v-card,
.v-card__subtitle {
  color: var(--v-v_card_title_color-base) !important;
}
.timeline-user-info .v-card__subtitle {
  padding: 5px;
  cursor: pointer;
}
</style>
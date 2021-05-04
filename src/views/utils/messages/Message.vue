<template>
  <div class="shrink">
    <div class="message-menu">
      <v-badge
        v-if="0 < parseInt(totalseen)"
        color="red"
        left
        :content="totalseen"
      >
        <v-card @click="visible = !visible" color="#2b3738" min-width="300">
          <v-card-subtitle> Mesajlar </v-card-subtitle>
        </v-card>
      </v-badge>
      <v-card
        @click="
          () => {
            visible = !visible
          }
        "
        v-else
        color="#2b3738"
        min-width="300"
      >
        <v-card-subtitle> Mesajlar </v-card-subtitle>
      </v-card>
      <v-expand-transition>
        <v-card v-show="visible">
          <v-container>
            <div v-for="(item, index) in data.messages" :key="index">
              <v-card @click="() => {}">
                <v-row>
                  <v-col cols="2">
                    <v-avatar>
                      <v-img
                        v-if="item.user_data.image_path"
                        :src="item.user_data.image_path"
                      ></v-img>
                      <v-img
                        v-else
                        src="@/assets/vendor/img/null_profile.png"
                      ></v-img>
                    </v-avatar>
                  </v-col>
                  <v-col cols="9">
                    <p class="text-right">
                      <span class="name">
                        {{
                          item.user_data.first_name +
                          " " +
                          item.user_data.last_name
                        }}
                      </span>
                      <span class="date">
                        <i>
                          {{
                            item.messages[item.messages.length - 1].create_date
                              | moment("DD MMMM HH:mm")
                          }}</i
                        ></span
                      >
                      <br />
                      <span class="text-content"
                        >{{
                          item.messages[
                            item.messages.length - 1
                          ].text.substring(0, 20)
                        }}...</span
                      >
                    </p>
                  </v-col>
                </v-row>
              </v-card>
            </div>
          </v-container>
        </v-card>
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    _notify: {
      type: String,
      default: "0",
    },
  },
  data() {
    return {
      data: {},
      visible: false,
      totalseen: 0,
    };
  },
  async mounted() {
    this.data = this.$store.getters.getMessage
    console.log(this.data);
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.date {
  font-size: 10px;
}
.text-content {
  font-size: 15px;
}
.name {
  font-size: 12px;
}
.message-menu {
  float: right;
}
.window {
  position: unset;
  float: left;
  bottom: 0;
  left: 0;
}
</style>
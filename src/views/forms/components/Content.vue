<template>
  <v-container>
    <v-card>
      <v-card-title>
        {{ data.name }}
      </v-card-title>
      <v-container>
        <v-row>
          <v-col md="1" xs="1">
            <v-card>
              <v-img :src="data.user_data.image_path"></v-img>
              <v-card-subtitle>{{ data.user_data.first_name }}</v-card-subtitle>
            </v-card>
          </v-col>
          <v-col md="11" xs="11">
            <v-card>
              <v-card-actions>
                <v-list-item class="grow">
                  {{ data.create_date | moment("DD MMMM YYYY HH:mm") }}

                  <v-row align="center" justify="end">
                    <i class="mr-2">
                      <a
                        :href="`mailTo:${data.user_data.email}`"
                        target="_blank"
                        >{{ data.user_data.email }}</a
                      ></i
                    >
                    <span class="mr-1">·</span>
                    <span class="mr-1">·</span>
                    <span class="mr-1">·</span>
                    <v-btn icon
                      ><v-icon class="mr-1">
                        mdi-thumb-up-outline
                      </v-icon></v-btn
                    >
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-btn icon
                      ><v-icon class="mr-1">
                        mdi-thumb-down-outline
                      </v-icon></v-btn
                    >
                    <span class="subheading mr-2">256</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1"> mdi-share-variant </v-icon>
                    <span class="subheading mr-2">45</span>
                    <span class="mr-1">·</span>
                    <v-icon class="mr-1"> mdi-cogs </v-icon>
                  </v-row>
                </v-list-item>
              </v-card-actions>
              <v-card-text>
                {{ data.description }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br />
    <v-row>
      <v-col>
        <v-container>
          <v-card v-for="item in comments" :key="item.id">
            <v-row>
              <v-col md="1">
                <v-card>
                  <v-img
                    v-if="item.user_data.image_path"
                    :src="item.user_data.image_path"
                  ></v-img>
                  <v-img
                    v-else
                    src="@/assets/vendor/img/null_profile.png"
                  ></v-img>
                  <v-card-subtitle>{{
                    item.user_data.first_name
                  }}</v-card-subtitle>
                </v-card>
              </v-col>
              <v-col>
                <v-card>
                  <v-card-actions>
                    <v-list-item class="grow">
                      {{ item.create_date | moment("DD MMMM YYYY HH:mm") }}

                      <v-row align="center" justify="end">
                        <i class="mr-2">
                          <a
                            :href="`mailTo:${item.user_data.email}`"
                            target="_blank"
                            >{{ item.user_data.email }}</a
                          ></i
                        >
                        <span class="mr-1">·</span>
                        <span class="mr-1">·</span>
                        <span class="mr-1">·</span>
                        <v-btn icon
                          ><v-icon class="mr-1">
                            mdi-thumb-up-outline
                          </v-icon></v-btn
                        >
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-btn icon
                          ><v-icon class="mr-1">
                            mdi-thumb-down-outline
                          </v-icon></v-btn
                        >
                        <span class="subheading mr-2">256</span>
                        <span class="mr-1">·</span>
                        <v-btn icon @click="reply(item.id)">
                          <v-icon class="mr-1"> mdi-reply </v-icon>
                        </v-btn>
                        <span class="mr-1">·</span>
                        <v-btn icon>
                          <v-icon class="mr-1"> mdi-cogs </v-icon>
                        </v-btn>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                  <v-card-text>
                    <div v-if="nested(item.comment_id)" class="nested">
                      {{
                        nested(item.comment_id)
                          ? nested(item.comment_id).description
                          : ""
                      }}
                      <div class="email">
                        {{
                          nested(item.comment_id)
                            ? nested(item.comment_id).user_data.email
                            : ""
                        }}
                      </div>
                    </div>
                    {{ item.description }}
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
          <br />
          <v-card v-if="$store.getters.isAuthenticated">
            <v-container>
              <v-row>
                <v-col md="1">
                  <v-card>
                    <v-img
                      v-if="$store.getters.currentUser.image_path"
                      :src="$store.getters.currentUser.image_path"
                    ></v-img>
                    <v-img
                      v-else
                      src="@/assets/vendor/img/null_profile.png"
                    ></v-img>
                    <v-card-subtitle>{{
                      $store.getters.currentUser.first_name
                    }}</v-card-subtitle>
                  </v-card>
                </v-col>
                <v-col>
                  <div v-if="nested(comment.comment_id)" class="nested">
                    {{
                      nested(comment.comment_id)
                        ? nested(comment.comment_id).description
                        : ""
                    }}
                    <div class="email">
                      {{
                        nested(comment.comment_id)
                          ? nested(comment.comment_id).user_data.email
                          : ""
                      }}
                    </div>
                  </div>
                  <tiptap :_content="comment" />
                  <br />
                  <v-btn color="success">Gönder</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <div v-else></div>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ApiService from "@/core/services/api.service";
export default {
  components: {
    /**
     * Rich textbox
     */
    Tiptap: () => import("./contents/Tiptap"),
  },
  data() {
    return {
      data: {
        user_data: {
          image_path: "",
        },
      },
      comments: [],
      comment: {
        comment_id: 0,
      },
    };
  },
  async beforeMount() {
    await this.getComment();
  },
  methods: {
    /** Get Comment */
    async getComment() {
      this.data = {
        ...(await ApiService.get(`forms/id/${this.$route.params.id}`)).data,
      };
      this.getComments(this.data.comments);
    },
    /** Get Comments in Comment */
    getComments(data) {
      var arr = data.map((el) => {
        var arr = {
          ...el,
          user_data: {
            image_path: "",
          },
        };
        ApiService.get(`users/id/${el.user_id}`).then((x) => {
          arr.user_data = x.data;
        });
        return arr;
      });
      this.comments = arr;
    },
    /**
     * Nested comment
     * @param {Number} id Comment id
     */
    nested(id) {
      const dt = this.comments.find((x) => x.id == id);
      if (dt) return dt;
      else return;
    },
    /**
     * Comment reply
     * @param {Number} id Comment id
     */
    reply(id) {
      this.comment.comment_id = id;
    },
  },
};
</script>

<style lang="scss" scoped>
.nested {
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid #858585;
  border-radius: 5px;
}
.nested .email {
  text-align: right;
}
</style>
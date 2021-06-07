<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h2>{{ data.name }}</h2>
      </v-card-title>
      <v-container>
        <v-row>
          <v-col sm="2" md="1" lg="1">
            <v-img
              :src="
                data.user_data.image_path
                  ? data.user_data.image_path
                  : `@/assets/vendor/img/null_profile.png`
              "
              width="100%"
            ></v-img>
            <div class="w-100 text-center">
              <p>{{ data.user_data.first_name }}</p>
            </div>
          </v-col>
          <v-col sm="10" md="11" lg="11">
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
                  <div v-if="$store.getters.isAuthenticated">
                    <span class="mr-1">·</span>
                    <span class="mr-1">·</span>
                    <span class="mr-1">·</span>
                    <v-tooltip color="orange" top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon class="mr-1"> mdi-share-variant </v-icon>
                        </v-btn>
                      </template>
                      <span>Paylaş</span>
                    </v-tooltip>
                    <span class="mr-1">·</span>
                    <v-tooltip color="blue" top>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn icon v-bind="attrs" v-on="on">
                          <v-icon class="mr-1"> mdi-cogs </v-icon>
                        </v-btn>
                      </template>
                      <span>Seçenekler</span>
                    </v-tooltip>
                  </div>
                </v-row>
              </v-list-item>
            </v-card-actions>
            <v-card-text>
              <div v-html="data.description"></div>
            </v-card-text>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
    <br />
    <v-divider></v-divider>
    <v-card-subtitle>
      <h4>Yorumlar</h4>
    </v-card-subtitle>
    <v-row>
      <v-col>
        <v-container>
          <v-card
            tile
            rounded
            outlined
            v-for="item in listPag()"
            :key="item.id"
          >
            <v-container>
              <v-row>
                <v-col xs="12" sm="2" md="1">
                  <v-img
                    :src="
                      item.user_data.image_path
                        ? item.user_data.image_path
                        : `@/assets/vendor/img/null_profile.png`
                    "
                    width="100%"
                  ></v-img>
                  <div class="w-100 text-center">
                    <p>{{ item.user_data.first_name }}</p>
                  </div>
                </v-col>
                <v-col xs="12" sm="10" md="11">
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
                        <div v-if="$store.getters.isAuthenticated">
                          <span class="mr-1">·</span>
                          <span class="mr-1">·</span>
                          <span class="mr-1">·</span>
                          <v-tooltip color="orange" top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn
                                :color="
                                  comment.comment_id == item.id ? 'warning' : ''
                                "
                                v-bind="attrs"
                                v-on="on"
                                icon
                                @click="reply(item.id)"
                              >
                                <v-icon class="mr-1"> mdi-reply </v-icon>
                              </v-btn>
                            </template>
                            <span>Cevap</span>
                          </v-tooltip>
                          <span class="mr-1">·</span>
                          <v-tooltip color="blue" top>
                            <template v-slot:activator="{ on, attrs }">
                              <v-btn icon v-bind="attrs" v-on="on">
                                <v-icon class="mr-1"> mdi-cogs </v-icon>
                              </v-btn>
                            </template>
                            <span>Seçenekler</span>
                          </v-tooltip>
                        </div>
                      </v-row>
                    </v-list-item>
                  </v-card-actions>
                  <v-card-text>
                    <v-card v-if="nested(item.comment_id)" outlined rounded>
                      <div class="nested">
                        <div
                          v-html="
                            nested(item.comment_id)
                              ? nested(item.comment_id).description
                              : ''
                          "
                        ></div>
                        <div class="email">
                          {{
                            nested(item.comment_id)
                              ? nested(item.comment_id).user_data.email
                              : ""
                          }}
                        </div>
                      </div>
                    </v-card>
                    <div v-html="item.description"></div>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
          <v-container class="max-width">
            <v-row>
              <v-col cols="2">
                <v-select
                  v-model="pagPage"
                  :items="[comments.length, 3, 5, 10, 15, 20, 50, 100]"
                ></v-select>
              </v-col>
              <v-col>
                <v-pagination
                  v-model="page"
                  color="secondary"
                  class="my-4"
                  :length="pages"
                ></v-pagination>
              </v-col>
            </v-row>
          </v-container>
          <v-card v-if="$store.getters.isAuthenticated">
            <v-container>
              <v-row>
                <v-col md="1">
                  <v-img
                    v-if="$store.getters.currentUser.image_path"
                    :src="$store.getters.currentUser.image_path"
                    width="100%"
                  ></v-img>
                  <v-img
                    v-else
                    width="100%"
                    src="@/assets/vendor/img/null_profile.png"
                  ></v-img>
                  <div class="w-100 text-center">
                    <p>{{ $store.getters.currentUser.first_name }}</p>
                  </div>
                </v-col>
                <v-col>
                  <div v-if="nested(comment.comment_id)" class="nested">
                    <div
                      v-html="
                        nested(comment.comment_id)
                          ? nested(comment.comment_id).description
                          : ''
                      "
                    ></div>
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
                  <v-btn color="success" @click="sendComment()">Gönder</v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {
  GET_API_FORUM,
  FORUM_SENT_COMMENT,
} from "@/core/services/store/forum.module";
import ObjectId from "bson-objectid";
export default {
  components: {
    /**
     * Rich textbox
     */
    Tiptap: () => import("@/components/Tiptap"),
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
        description: "",
      },
      page: 1,
      pages: 0,
      pagPage: 3,
    };
  },
  async created() {
    await this.getComment();
  },
  methods: {
    /** Get Comment */
    async getComment() {
      if (!this.$store.getters.getForum) {
        await this.$store.dispatch(GET_API_FORUM, this.$route.params.id);
      }
      this.data = this.$store.getters.getForum;
      if (this.data) this.loading = false;
      this.getComments(this.data);
    },
    /** Get Comments in Comment */
    getComments(data) {
      var arr = data.comments.map((el) => {
        return {
          ...el,
          user_data: data.comments_user_data.find((x) => x._id == el.user_id),
        };
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
      if (this.comment.comment_id == id) this.comment.comment_id = 0;
      else this.comment.comment_id = id;
    },
    /** Yorum gönder */
    async sendComment() {
      this.comment = {
        ...this.comment,
        user_id: ObjectId(this.$store.getters.currentUser._id),
      };
      var postData = await this.$store.dispatch(FORUM_SENT_COMMENT, {
        id: this.data._id,
        comment: this.comment,
      });
      if (postData.status === 201) {
        postData.data = {
          ...postData.data,
          user_data: this.$store.getters.currentUser,
        };
        this.comments.push(postData.data);
        this.comment.description = "";
      }
    },
    /** Saylafalama */
    pagination() {
      var arr = this.comments;
      this.pages = Math.ceil(arr.length / this.pagPage);
      var arrPages = [];
      let count = 0;
      for (let i = 0; i < this.pages; i++) {
        var a = [];
        for (let j = 0; j < this.pagPage; j++) {
          if (arr[count]) {
            a.push({ ...arr[count] });
            count++;
          }
        }
        arrPages.push(a);
      }
      return arrPages;
    },
    /** Seçilen Sayfalama */
    listPag() {
      return this.pagination()[this.page - 1];
    },
  },
};
</script>

<style lang="scss" scoped>
.nested {
  padding: 20px;
  margin-bottom: 10px;
  width: 100%;
}
.nested .email {
  text-align: right;
}
</style>
<template>
  <v-container v-if="content">
    <v-card color="v_card_background">
      <div v-for="(item, index) in content.descriptions" :key="index">
        <v-card-title v-if="item.type == 'title'">
          {{ item.val }}
        </v-card-title>
        <v-card-subtitle v-if="item.type == 'subtitle'">
          {{ item.val }}
        </v-card-subtitle>
        <v-card-text v-if="item.type == 'description'">
          <div v-html="item.val"></div>
        </v-card-text>
      </div>
      <v-row>
        <v-col cols="12" sm="6" md="4" lg="3" xl="2">
          <v-container>
            <div>
              <b>Address: </b> <span> {{ content.option.address }} </span>
            </div>
            <div v-if="content.option.ex_address">
              <b>Ex Address: </b> <span> {{ content.option.ex_address }} </span>
            </div>
            <div>
              <b>Phone: </b> <span> {{ content.option.phone }} </span>
            </div>
            <div>
              <b>Fax: </b> <span> {{ content.option.fax }} </span>
            </div>
            <div>
              <b>Email: </b> <span> {{ content.option.email }} </span>
            </div>
          </v-container>
        </v-col>
        <v-col cols="12" sm="6" md="8" lg="9" xl="10"> 
            
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      content: null,
    };
  },
  mounted() {
    this.content = this.$store.getters.getAbouts.find(
      (x) => x.type == "contact"
    );
  },
};
</script>

<style lang="">
</style>
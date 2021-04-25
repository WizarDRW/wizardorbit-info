<template>
  <div>
    <v-card>
      <v-card-title>
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Ara"
          single-line
          hide-details
          outlined
          dense
        ></v-text-field>
      </v-card-title>
      <v-data-table
        dense
        :headers="headers"
        :items="get()"
        :page.sync="page"
        :items-per-page="10"
        @page-count="pageCount = $event"
        hide-default-header
        hide-default-footer
        class="elevation-1"
        :search="search"
      >
        <template #[`item.create_date`]="{ item }">
          <div>
            {{ item.create_date | moment("DD-MM-YYYY HH:mm") }}
          </div>
        </template>
      </v-data-table>

      <v-pagination v-model="page" :length="pageCount"></v-pagination>
    </v-card>
  </div>
</template>

<script>
export default {
  props: {
    _forms: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      headers: [
        {
          text: "create_date",
          value: "create_date",
          width: "100px",
        },
        {
          text: "name",
          value: "name",
          width: "auto",
        },
        {
          text: "description",
          value: "description",
        },
      ],
      page: 1,
      pageCount: 0,
      search: "",
    };
  },
  methods: {
    get() {
      return JSON.parse(this._forms)
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
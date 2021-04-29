<template>
  <div></div>
</template>

<script>
import ApiService from "@/core/services/api.service";
export default {
    async created() {
        var data = await ApiService.get(`messages/userid/${this.$store.getters.currentUser()._id}`)
        console.log(data);
    },
};
</script>

<style lang="scss" scoped>
</style>
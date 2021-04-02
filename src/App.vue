<template>
  <div class="wrap" @click="$refs.clear.isVisibleList = false">
    <Search ref="clear" :data="data" />
  </div>
</template>

<script>
import Search from "./components/Search.vue";
import mock from "@/mock-data";

export default {
  name: "App",
  components: {
    Search,
  },
  data() {
    return {
      data: mock,
    };
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.wrap {
  min-height: 100vh;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

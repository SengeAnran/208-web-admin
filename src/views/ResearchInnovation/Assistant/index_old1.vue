<template>
  <i-frame :src="url" />
</template>
<script>
import iFrame from "@/components/iFrame/index.vue";
export default {
  name: "Swagger",
  components: { iFrame },
  data() {
    return {
      url: "http://192.168.6.100:8505 "
      // url: "http://60.205.140.21:8505 "
    };
  },
};
</script>

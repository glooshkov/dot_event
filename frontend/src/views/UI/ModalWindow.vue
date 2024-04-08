<template>
  <div class="vue-modal-stop" @click="$emit('close')" v-show="open">
    <div class="veu-modal-inner-stop" >
      <div class="vue-modal-content-stop">
        <div class="circle-icon-wind-stop">
          <ExclamationTriangleIcon class="icon-wind-stop" aria-hidden="true" />
        </div>
        <div class="header-text-stop">
          <slot name="modal-text" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ExclamationTriangleIcon} from "@heroicons/vue/24/outline/index.js";
import {DialogTitle} from "@headlessui/vue";

export default {
  components: {DialogTitle, ExclamationTriangleIcon},
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
};
</script>



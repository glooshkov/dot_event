<template>
  <div class="vue-modal-q" @click="$emit('close')" v-show="open">
    <div class="veu-modal-inner-q" >
      <div class="under-modal-content-q">
        <div class="circle-icon-wind-q">
          <QuestionMarkCircleIcon class="icon-wind-q" aria-hidden="true" />
        </div>
        <div class="vue-modal-content-q">
          <div class="header-text-q">
            <slot name="modal-text-q" />
          </div>
          <div class="button-container-q">
            <CheckIcon class="mod-yes" @click="$emit('sayYes')" name="mod-yes" />
            <XMarkIcon class="mod-no" name="mod-no" />
        </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { QuestionMarkCircleIcon, CheckIcon, XMarkIcon } from "@heroicons/vue/24/outline/index.js";

export default {
  components: { QuestionMarkCircleIcon, CheckIcon, XMarkIcon },
  props: {
    open: {
      type: Boolean,
      default: true,
    },
  },
};
</script>




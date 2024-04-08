<template>
  <Listbox as="div" class="list" v-model="selected" @click="switchParams">
    <div style="position: relative;" >
      <ListboxButton class="custom-input" style="background-color: #1d2432;" >
        <span class="flex-container">
          <!-- <img :src="selected.avatar" alt="" /> -->
          <span class="truncated-text">{{ selected.label }}</span>
        </span>
        <span  class="custom-class">
          <ChevronUpDownIcon class="icon1" aria-hidden="true" />
        </span>
      </ListboxButton>

      <transition class="transition-container">
        <ListboxOptions class="dropdown">
          <ListboxOption
            as="template"
            v-for="option in options"
            :key="option.value"
            :value="option"
            v-slot="{ active, selected }"
          >
            <li :class="[active ? 'active-first' : 'inactive-first', 'common-first']">
              <div class="custom-class2">
                <!-- <img :src="option.avatar" alt="" /> -->
                <span :class="[selected ? 'active-second' : 'inactive-second', 'common-second']">{{ option.label }}</span>
              </div>

              <span v-if="selected" :class="[active ? 'active-third' : 'inactive-third', 'common-third']">
                <CheckIcon class="icon1" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>

<script setup>
  import { ref } from 'vue'
  import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
  } from '@headlessui/vue'
  import {CheckIcon, ChevronUpDownIcon} from "@heroicons/vue/20/solid/index.js";
  import { defineProps } from 'vue'

  const props = defineProps({
    options: Array,
    initialSelected: Object,
  });
  const emit = defineEmits(['update'])

  function switchParams() {
    emit('update', selected)
  }
  const selected = ref(props.initialSelected);
</script>

<style scoped>
.custom-input {
  display: flex;
  width: 100%;
  cursor: default;
  border-radius: 0.375rem;
  background-color: #1d2432;
  padding: 0.46rem 0.375rem 0.46rem 0.75rem;
  text-align: left;
  color:var(--event-color-text-white);
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  outline: none;
  font-size: 0.875rem;
  line-height: 1.2;
  transition: box-shadow 0.3s, border-color 0.3s;
  font-family: Arial, sans-serif;
  justify-content: space-between;
  border: none;
}
.custom-input:hover  {
  outline: none;
  border-radius: 0.375rem;
  box-shadow: 0 0 0 2px rgba(66, 153, 225, 0.5);
}

@media (max-width: 640px) {
  .custom-input {
    font-size: 0.875rem;
    line-height: 1.5;
  }
}
.flex-container {
  display: flex;
  align-items: center;
  margin-left: -14px;
}
.truncated-text {
  margin-left: 0.75rem;
  display: block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.custom-class {
  align-items: center;
  pointer-events: none;
  margin-right: -5px;
  margin-left: 0.5rem;
  display: flex;
  padding-right: 0.5rem;
}
.icon1 {
  height: 1.25rem;
  width: 1.25rem;
  color: #D1D5DB;
}
.transition-container {
  transition: opacity 100ms ease-in;
}
.transition-container.leave-from-class {
  opacity: 1;
}
.transition-container.leave-to-class {
  opacity: 0;
}
.dropdown {
  position: absolute;
  z-index: 10;
  margin-top: 0.25rem;
  max-height: 10rem;
  width: 100%;
  overflow: auto;
  border-radius: 0.375rem;
  background-color: var(--event-color-pole);
  padding-top: 0.25rem;
  font-size: 0.875rem;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid rgba(0, 0, 0, 0.05);
  outline: none;
  font-family: "MS Sans Serif", sans-serif;
  color: var(--event-color-text-white);
}
.dropdown::-webkit-scrollbar-track {
    background-color: var(--event-color-pole);
}
.dropdown:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.12);
}
.dropdown:focus {
  outline: none;
  border-color: var(--event-color-border);
}
.common-first {
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
  user-select: none;
  padding: 0.5rem 1.125rem;
}
.active-first {
  background-color: var(--event-color-btn);
  color: var(--event-color-text-white);
}
.inactive-first {
  color: var(--event-color-text-gray);
}
.custom-class2 {
  display: flex;
  align-items: center;
  margin-left: -20px;
}
.common-second {
  display: block;
  margin-left: 0.75rem;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.active-second {
  font-weight: 600;
  color: var(--event-color-text-white);
}
.inactive-second {
  font-weight: 400;
}
.common-third {
  display: flex;
  align-items: center;
  margin-right: -10px;
}
.active-third {
  color:var(--event-color-text-white);
}
.inactive-third {
  color: #4f46e5;
}
</style>
<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import { PaginationEllipsis, type PaginationEllipsisProps } from 'radix-vue';
  import { MoreHorizontal } from 'lucide-vue-next';

  const props = defineProps<
    PaginationEllipsisProps & { class?: HTMLAttributes['class'] }
  >();

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <PaginationEllipsis
    v-bind="delegatedProps"
   >
    <slot>
      <MoreHorizontal />
    </slot>
  </PaginationEllipsis>
</template>

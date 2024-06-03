<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import { PaginationPrev, type PaginationPrevProps } from 'radix-vue';
  import { ChevronLeft } from 'lucide-vue-next';
  import { Button } from '@/shared//ui/button';

  const props = withDefaults(
    defineProps<PaginationPrevProps & { class?: HTMLAttributes['class'] }>(),
    {
      asChild: true,
    },
  );

  const delegatedProps = computed(() => {
    const { class: _, ...delegated } = props;

    return delegated;
  });
</script>

<template>
  <PaginationPrev v-bind="delegatedProps">
    <Button >
      <slot>
        <ChevronLeft class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationPrev>
</template>

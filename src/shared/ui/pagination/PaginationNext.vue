<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import { PaginationNext, type PaginationNextProps } from 'radix-vue';
  import { ChevronRight } from 'lucide-vue-next';
  import { Button } from '@/shared//ui/button';

  const props = withDefaults(
    defineProps<PaginationNextProps & { class?: HTMLAttributes['class'] }>(),
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
  <PaginationNext v-bind="delegatedProps">
    <Button>
      <slot>
        <ChevronRight class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationNext>
</template>

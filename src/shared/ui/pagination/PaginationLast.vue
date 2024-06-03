<script setup lang="ts">
  import { type HTMLAttributes, computed } from 'vue';
  import { PaginationLast, type PaginationLastProps } from 'radix-vue';
  import { ChevronsRight } from 'lucide-vue-next';
  import { Button } from '@/shared//ui/button';

  const props = withDefaults(
    defineProps<PaginationLastProps & { class?: HTMLAttributes['class'] }>(),
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
  <PaginationLast v-bind="delegatedProps">
    <Button >
      <slot>
        <ChevronsRight class="h-4 w-4" />
      </slot>
    </Button>
  </PaginationLast>
</template>

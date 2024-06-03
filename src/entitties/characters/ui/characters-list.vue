<script setup lang="ts">
  import { getStatusClass } from '@/entitties/characters/lib/status-mode';

  const props = defineProps({
    characters: {
      type: Array,
      required: true
    }
  });
</script>

<template>
  <div class="w-full bg-[rgb(39,43,51)] h-full justify-center p-4 flex flex-wrap">
    <article
      v-for="character in characters"
      :key="character.id"
      class="flex bg-[rgb(60,62,68)] rounded-xl h-[220px] w-[600px] m-3"
    >
      <div class="flex flex-row cursor-default">
        <div class="flex flex-grow-2 flex-shrink-1 flex-basis-[200px]">
          <img :src="character.image" class="rounded-l-xl" alt="character image" />
        </div>
        <div class="p-3 gap-y-2 flex flex-col">
          <div>
            <h2 class="font-bold text-[1.5rem] text-white">{{ character.name ?? 'unknown' }}</h2>
            <span class="text-white font-semibold flex flex-row items-center">
                <span
                  :class="getStatusClass(character?.status ?? 'unknown')"
                  class="inline-block rounded-full w-2.5 h-2.5 mr-2"
                ></span>
                {{ character.species }} - {{ character.status }}
              </span>
          </div>
          <div class="flex flex-col">
            <span class="text-[rgb(158,158,158)] font-semibold">Last know location</span>
            <span class="text-white">{{ character.location.name ?? 'unknown' }}</span>
          </div>
          <div class="flex flex-col">
            <span class="text-[rgb(158,158,158)] font-semibold">First seen in:</span>
            <span class="text-white">{{ character.episodeName ?? 'unknown' }}</span>
          </div>
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped lang="postcss">

</style>
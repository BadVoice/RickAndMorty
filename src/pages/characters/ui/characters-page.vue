<script setup lang="ts">
  import { formSubmitted, getCharacters, getCharactersByPage } from '@/entitties/characters/model/characters-model';
  import { useUnit } from 'effector-vue/composition';
  import { onMounted, watch, ref, computed } from 'vue';
  import {
    Pagination,
    PaginationEllipsis,
    PaginationList,
    PaginationListItem,
    PaginationNext,
    PaginationPrev,
  } from '@/shared/ui/pagination';

  import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from '@/shared/ui/form';

  import { useCharacterForm } from '@/pages/characters/lib/character-schema';
  import { CharactersList } from '@/entitties/characters';

  const pages = ref(1);
  const handleSubmit = useUnit(formSubmitted);
  const showFilteredData = ref(false);

  const {
    data: characters,
  } = useUnit(getCharacters);

  const {
    start: handleMount,
    data: charactersByPage,
  } = useUnit(getCharactersByPage);

  onMounted(() => {
    handleMount(pages.value || 1);
  });

  watch(characters, (newData) => {
    console.log('newData', newData);
  }, { deep: true });

  watch(charactersByPage, (newData) => {
    console.log('charactersByPage', newData);
  }, { deep: true })

  const showCharactersByPage = computed(() => {
    if (showFilteredData.value) {
      return false;
    }
    if (charactersByPage.value !== undefined) {
      return true;
    }
    return false;
  });

  function handlePageSelected(page: number) {
    pages.value = page;
    handleMount(pages.value);
    showFilteredData.value = false;
  }

  const { form } = useCharacterForm()

  const onSubmit = () => {
    form.validate();
    if (Object.keys(form.errors.value).length <= 0) {
      handleSubmit({
        ...form.values,
      });
      showFilteredData.value = true;
    }}
</script>

<template>
  <div class="w-full">

    <div class="flex flex-col justify-between">
      <div class="custom-scrollbar max-h-[calc(100vh-200px)] overflow-x-auto">
        <form @submit="onSubmit" class="mt-4 flex max-w-[300px] mx-auto  flex-col gap-y-4 px-5">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input
                  class="h-fit rounded-[8px] border border-[#D0D4DB] px-4 py-2 text-[16px] placeholder:text-[#858FA3]"
                  type="text"
                  placeholder="Название"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField  v-slot="{ componentField }" name="status">
            <FormItem>
              <FormLabel>По статусу</FormLabel>
              <FormControl>
                <Input
                  class="h-fit rounded-[8px] border border-[#D0D4DB] px-4 py-2 text-[16px] placeholder:text-[#858FA3]"
                  type="text"
                  placeholder="Статус"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="species">
            <FormItem>
              <FormLabel>По данному виду</FormLabel>
              <FormControl>
                <Input
                  class="h-fit rounded-[8px] border border-[#D0D4DB] px-4 py-2 text-[16px] placeholder:text-[#858FA3]"
                  type="text"
                  placeholder="Вид"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="type">
            <FormItem>
              <FormLabel>По данному типу</FormLabel>
              <FormControl>
                <Input
                  class="h-fit rounded-[8px] border border-[#D0D4DB] px-4 py-2 text-[16px] placeholder:text-[#858FA3]"
                  type="text"
                  placeholder="type"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField v-slot="{ componentField }" name="gender">
            <FormItem>
              <FormLabel>По данному полу</FormLabel>
              <FormControl>
                <Input
                  class="h-fit rounded-[8px] border border-[#D0D4DB] px-4 py-2 text-[16px] placeholder:text-[#858FA3]"
                  type="text"
                  placeholder="gender"
                  v-bind="componentField" />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>
      </div>
      <div
        class="mt-auto flex flex-col gap-y-2 w-full items-center justify-center border-t border-[#D0D4DB] p-4">
        <Button @click="onSubmit" class="w-full rounded-[9px] text-[16px]">
          Применить
        </Button>
      </div>
    </div>

    <CharactersList
      :characters="showCharactersByPage
        ? [...charactersByPage?.data?.results ?? []]
        : [...characters?.data?.results ?? []]"
    />

    <div class="mx-auto flex w-fit bg-[#F9FAFB] py-2">
      <Pagination
        v-slot="{ page }"
        :total="parseInt(charactersByPage?.data.info?.count || '0', 10)"
        @update:page="(value) => handlePageSelected(value)"
        :sibling-count="1"
        v-model:page="pages"
        class="mx-auto gap-1 sm:-translate-x-1 sm:gap-2"
      >
        <PaginationList v-slot="{ items }" class="flex items-center gap-1">
          <PaginationPrev />
          <template v-for="(item, index) in items" :key="index">
            <PaginationListItem
              v-if="item.type === 'page'"
              :value="item.value"
              as-child
            >
              <Button
                class="h-10 w-10 p-0"
                :variant="item.value === page ? 'default' : 'outline'"
              >
                {{ item.value }}
              </Button>
            </PaginationListItem>
            <PaginationEllipsis v-else :key="item.type" :index="index" />
          </template>
          <PaginationNext />
        </PaginationList>
      </Pagination>
    </div>

  </div>
</template>
<style scoped lang="postcss">

</style>
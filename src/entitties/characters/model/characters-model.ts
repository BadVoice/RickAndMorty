import { createQuery } from '@farfetched/core';
import { $api } from '@/shared/api';
import { createEvent, sample } from 'effector';

interface FormValues {
  name: string
  status: string
  species: string
  type: string
  gender: string
}
export const formSubmitted = createEvent<FormValues>();

export const getCharacters = createQuery({
  handler: async (query: FormValues) => {

    const characters = await ($api.character.getCharacters(query));

    if (characters.data.results) {
      const charactersWithEpisodeNames = characters.data.results.map(async (character: any) => {
        const episodeUrl = character.episode[0];
        const episodeId = parseInt(episodeUrl.split('/').pop(), 10);
        const episode = await $api.episode.getEpisodeById(episodeId);
        return {
          ...character,
          episodeName: episode.data.name
        };
      });

      const resolvedCharacters = await Promise.all(charactersWithEpisodeNames);

      return {
        data: {
          ...characters.data,
          results: resolvedCharacters
        }
      };
    } else {
      return characters;
    }
  }
});

export const getCharactersByPage = createQuery({
  handler: async (page: number) => {

    const characters = await ($api.character.getCharacters({ page }));

    if (characters.data.results) {
      const charactersWithEpisodeNames = characters.data.results.map(async (character: any) => {
        const episodeUrl = character.episode[0];
        const episodeId = parseInt(episodeUrl.split('/').pop(), 10);
        const episode = await $api.episode.getEpisodeById(episodeId);
        return {
          ...character,
          episodeName: episode.data.name
        };
      });

      const resolvedCharacters = await Promise.all(charactersWithEpisodeNames);

      return {
        data: {
          ...characters.data,
          results: resolvedCharacters
        }
      };
    } else {
      return characters;
    }
  }
});

sample({
  clock: formSubmitted,
  fn: (clk) =>
    ({
      name: clk.name,
      status: clk.status,
      species: clk.species,
      type: clk.type,
      gender: clk.gender
    }),
  target: [getCharacters.start],
});

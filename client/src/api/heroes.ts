// import { client } from '../utils/axiosClient';
import { client } from '../utils/axiosClient';
import { Hero } from '../types/hero';
import { ClientGet } from '../types/clientGet';

export const getHeroes = (page: number) => {
  return client.get<ClientGet>(`/superhero?page=${page}`);
};

export const getOneHero = (heroId: string) => {
  return client.get<Hero>(`/superhero/${heroId}`);
};

export const createHero = (data: FormData) => {
  return client.post<Hero>('/superhero', data);
};

export const deleteHero = (heroId: string) => {
  return client.delete(`/superhero/${heroId}`);
};

export const updateHero = (heroId: string, data: FormData) => {
  return client.put<Hero>(`/superhero/${heroId}`, data);
};

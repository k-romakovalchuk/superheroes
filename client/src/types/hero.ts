export interface Hero {
  id: string,
  nickname: string,
  realName: string,
  originDescription: string,
  superpowers: string,
  catchPhrase: string,
  images: string[],
}

export interface NewSuperHero {
  nickname: string,
  realName: string,
  originDescription: string,
  superpowers: string,
  catchPhrase: string,
  images: FileList | null,
}

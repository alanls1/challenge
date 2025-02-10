type RootStackParamList = {
  Home: undefined;
  Favorite: undefined;
  History: undefined;
  Word: { word: string };
};

type TypeWords = {
  license: { name: string; url: string };
  meanings: {
    antonyms: [];
    definitions: { definition: string }[];
    partOfSpeech: string;
    synonyms: string[];
  }[];
  phonetic: string;
  phonetics: { audio: string; text: string }[];
  sourceUrls: string[];
  word: string;
};

type PropsRenderWordList = {
  navigation: any;
  data: TypeWords[];
  handleLoadItens: () => void;
  isLoading: boolean;
};

type PropsRenderSavedWords = {
  navigation: any;
  words: string[];
};

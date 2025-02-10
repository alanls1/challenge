import { configureStore, createSlice } from "@reduxjs/toolkit";

const wordList = createSlice({
  name: "wordList",
  initialState: [] as TypeWords[],
  reducers: {
    addWords(state, action: { payload: TypeWords[] }) {
      // Filtrar itens e impedir que palavras duplicadas faça parte do initialState
      action.payload.forEach((newWord) => {
        const index = state.findIndex(
          (existingProduct) => existingProduct.word === newWord.word
        );

        if (index !== -1) {
          state[index] = { ...state[index], ...newWord };
        } else {
          state.push(newWord);
        }
      });
    },
  },
});

const historyWords = createSlice({
  name: "historyWord",
  initialState: [] as string[],
  reducers: {
    addWordsToHistory(state, action: { payload: string }) {
      // Filtrar itens e evitar que palavras duplicadas sejam incluídas no initialState.
      state.includes(action.payload) ? state : state.push(action.payload);
    },
  },
});

export const store = configureStore({
  reducer: {
    wordList: wordList.reducer,
    historyWord: historyWords.reducer,
  },
});

export const { addWords } = wordList.actions;
export const { addWordsToHistory } = historyWords.actions;

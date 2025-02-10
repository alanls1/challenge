import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { fetchWords, fetchWordsList } from "../../services";
import { useDispatch, useSelector } from "react-redux";
import { addWords } from "../../utils/redux";
import RenderWordList from "../RenderWordList/RenderWordList";

const WordList = ({ navigation }) => {
  const [page, setPage] = useState<{ currentPage: number; maxPage: number }>({
    currentPage: 1,
    maxPage: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [getWordList, setGetWordList] = useState<string[]>();

  const dispatch = useDispatch();
  const data = useSelector(
    (select: { wordList: TypeWords[] }) => select.wordList
  );

  useEffect(() => {
    // Carregar todas as palavras em bloco de 20 itens
    const handleFetchWords = async () => {
      try {
        const res = await fetchWords(page.currentPage);
        if (res.data) {
          const words = res.data
            .map((item: string) => {
              const match = item.match(/"\\?"?([a-zA-Z]+)"?:/);
              return match ? match[1] : null;
            })
            .filter(Boolean);
          setGetWordList(words);
          setPage((prev) => ({ ...prev, maxPage: res.totalPages }));
        }
      } catch (error) {}
    };
    handleFetchWords();
  }, [page.currentPage]);

  useEffect(() => {
    // Realizar requisições com as palavras já obtidas e armazenadas
    const handleFetchWordsList = async () => {
      try {
        const responses = await Promise.allSettled(
          getWordList.map(async (element) => {
            return fetchWordsList(element);
          })
        );

        // Filtrar respostas bem-sucedidas
        const successResponses = responses
          .filter((res) => res.status === "fulfilled")
          .map((res) => (res as PromiseFulfilledResult<any>).value);

        dispatch(addWords(successResponses?.map(([item]) => item)));
      } catch (error: any) {
      } finally {
        setIsLoading(false);
      }
    };

    handleFetchWordsList();
  }, [getWordList]);

  //Ao alcançar o final da lista, esta função fará uma nova requisição para carregar mais 20 itens
  const handleLoadItens = () => {
    const nextPage = Math.min(page.currentPage + 1, page.maxPage);

    setPage((prev) => ({
      ...prev,
      currentPage: nextPage,
    }));
    setIsLoading(true);
  };

  return (
    <View style={styles.container}>
      {data && (
        <RenderWordList
          navigation={navigation}
          data={data}
          handleLoadItens={handleLoadItens}
          isLoading={isLoading}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "black",
    overflow: "scroll",
  },
  loading: {
    marginBlockEnd: 10,
  },
  text: {
    textAlign: "center",
  },
});

export default WordList;

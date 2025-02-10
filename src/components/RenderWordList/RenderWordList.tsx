import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Card, IconButton } from "react-native-paper";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const RenderWordList = ({
  navigation,
  data,
  handleLoadItens,
  isLoading,
}: PropsRenderWordList) => {
  const [favorite, setFavorite] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem("favorites");
      if (savedFavorites) {
        setFavorite(JSON.parse(savedFavorites));
      }
    };
    loadFavorites();
  }, []);

  const handleFavorite = async (word: string) => {
    const newFavorites = favorite.includes(word)
      ? favorite.filter((fav) => fav !== word)
      : [...favorite, word];

    setFavorite(newFavorites);
    await AsyncStorage.setItem("favorites", JSON.stringify(newFavorites));
  };

  return (
    <View style={styles.container}>
      {data && (
        <FlatList
          scrollEnabled={true}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={data}
          keyExtractor={(item) => item?.word}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("Word", { word: item.word })}>
              <Card.Title
                style={{
                  borderBottomWidth: 2,
                  borderBlockEndColor: "#F2F2F2",
                }}
                title={item?.word}
                subtitle={`Fonema: ${
                  item?.phonetics.length > 0
                    ? item?.phonetics?.map((item) => item?.text)
                    : "null"
                }`}
                right={() => (
                  <IconButton
                    icon={
                      favorite.includes(item.word)
                        ? "cards-heart"
                        : "cards-heart-outline"
                    }
                    onPress={() => handleFavorite(item?.word)}
                  />
                )}
              />
            </TouchableOpacity>
          )}
          onEndReached={() => handleLoadItens()}
          onEndReachedThreshold={0.1}
        />
      )}
      {isLoading && (
        <View style={styles.loading}>
          <Text style={styles.text}>Carregando...</Text>
        </View>
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

export default RenderWordList;

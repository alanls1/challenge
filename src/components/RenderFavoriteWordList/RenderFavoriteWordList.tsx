import React, { useEffect, useState } from "react";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { Card, IconButton, Snackbar } from "react-native-paper";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import useFavorite from "../../hooks/useFavorite";

const RenderFavoriteWordList = ({ navigation }) => {
  const { favorite, setFavorite } = useFavorite();

  const data = useSelector((select: { wordList: TypeWords[] }) =>
    select.wordList.filter((item) => favorite.some((word) => item.word == word))
  );

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
                right={(props) => (
                  <IconButton
                    {...props}
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

export default RenderFavoriteWordList;

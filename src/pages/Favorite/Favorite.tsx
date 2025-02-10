import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { store } from "../../utils/redux";
import { Provider, useSelector } from "react-redux";
import RenderFavoriteWordList from "../../components/RenderFavoriteWordList/RenderFavoriteWordList";

const Favorite = ({ navigation }) => {
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Lista de Palavras salvas</Text>
          </View>
          <RenderFavoriteWordList navigation={navigation} />
          <View>
            <NavBar navigation={navigation} />
          </View>
        </View>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    marginBlockStart: 20,
    marginBlockEnd: 0,
    marginInlineStart: 20,
  },
  title: {
    fontSize: 22,
  },
});

export default Favorite;

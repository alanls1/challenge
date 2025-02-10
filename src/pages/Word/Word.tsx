import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { Provider } from "react-redux";
import { store } from "../../utils/redux";
import RenderWord from "../../components/RenderWord/RenderWord";

const Word = ({ navigation, route }) => {
  const { word } = route.params;
  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <RenderWord word={word} />
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

export default Word;

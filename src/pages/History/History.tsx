import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NavBar from "../../components/NavBar/NavBar";
import { store } from "../../utils/redux";
import { Provider, useSelector } from "react-redux";
import RenderHistoryWordList from "../../components/RenderHistoryWordList/RenderHistoryWordList ";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Button } from "react-native-paper";

const History = ({ navigation }) => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const loadFavorites = async () => {
      const savedFavorites = await AsyncStorage.getItem("history");
      if (savedFavorites) {
        setHistory(JSON.parse(savedFavorites));
      }
    };
    loadFavorites();
  }, []);

  const handleClick = async () => {
    await AsyncStorage.removeItem("history");
  };

  return (
    <Provider store={store}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Histórico</Text>
            <Button icon="broom" mode="text" onPress={handleClick}>
              Limpar histórico
            </Button>
          </View>
          <RenderHistoryWordList navigation={navigation} words={history} />
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

export default History;

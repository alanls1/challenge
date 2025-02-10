import React, { useEffect } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector } from "react-redux";
import { IconButton } from "react-native-paper";
import * as Speech from "expo-speech";

const RenderWord = ({ word }: { word: string }) => {
  const data = useSelector((select: { wordList: TypeWords[] }) =>
    select.wordList.filter((item) => item.word == word)
  );

  useEffect(() => {
    const saveHistory = async () => {
      const savedWords = await AsyncStorage.getItem("history");
      const parsedWords = savedWords ? JSON.parse(savedWords) : [];

      if (!parsedWords.includes(word)) {
        const updatedWords = [...parsedWords, word];
        await AsyncStorage.setItem("history", JSON.stringify(updatedWords));
      }
    };
    saveHistory();
  }, []);

  const readText = (wordToSpeech: string) => {
    Speech.speak(wordToSpeech, { language: "en-US" });
  };

  const renderPartOfSpeech = () => {
    return data.map((item) =>
      item.meanings.map((partOfSpeech) => (
        <Text key={partOfSpeech.partOfSpeech}>{partOfSpeech.partOfSpeech}</Text>
      ))
    );
  };

  // Mapeamento de fonética
  const renderPhonetics = () => {
    return data.map((item) =>
      item.phonetics.map((phonetics) =>
        phonetics.audio ? (
          <Text key={phonetics.text} style={styles.phonetics}>
            <IconButton
              icon={"volume-high"}
              onPress={() => readText(phonetics.text)}
            />
            {phonetics.text}
          </Text>
        ) : null
      )
    );
  };

  // Mapeamento de definições
  const renderDefinitions = () => {
    return data.map((item) =>
      item.meanings.map((meaning) =>
        meaning.definitions.map((definition, index) => (
          <Text key={index} style={styles.textFont}>
            {definition.definition}
          </Text>
        ))
      )
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <Text style={styles.title}>{word}</Text>
        <Text>{renderPartOfSpeech()}</Text>
      </View>

      <View styles={styles.containerPhonetics}>
        <Text style={styles.textFont}>Fonema:</Text>
        {renderPhonetics()}
      </View>

      <View style={styles.description}>
        <Text style={styles.textFont}>Definições:</Text>
        {renderDefinitions()}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    color: "black",
    paddingHorizontal: 10,
    paddingVertical: 20,
    gap: 50,
  },
  title: {
    fontSize: 60,
  },
  textFont: {
    fontSize: 30,
  },
  phonetics: {
    fontSize: 30,
    display: "flex",
    alignItems: "center",
  },
  description: {
    gap: 20,
    paddingBlockEnd: 30,
  },
  containerPhonetics: {
    display: "flex",
    alignItems: "center",
  },
});

export default RenderWord;

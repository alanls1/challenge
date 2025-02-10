import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import fs from "fs";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});
const base_url = axios.create({
  baseURL: process.env.EXPO_PUBLIC_BASE_URL,
});

export const fetchWords = async (page: number) => {
  try {
    const response = await base_url.get("/", {
      params: { page },
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchWordsList = async (word: string) => {
  try {
    const cachedData = await AsyncStorage.getItem(word);
    if (cachedData) {
      console.log("Using cached data");
      return JSON.parse(cachedData);
    }
    const response = await api.get(`/${word}`);
    await AsyncStorage.setItem(word, JSON.stringify(response.data));

    return response.data;
  } catch (error) {
    throw error;
  }
};

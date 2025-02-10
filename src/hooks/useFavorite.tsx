import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useFavorite = () => {
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

  return { favorite, setFavorite };
};

export default useFavorite;

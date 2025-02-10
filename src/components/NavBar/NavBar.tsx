import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { IconButton } from "react-native-paper";

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <View style={styles.navBarList}>
        <Text>
          <IconButton
            icon="view-list"
            size={40}
            onPress={() => navigation.navigate("Home")}
          />
        </Text>
        <Text>
          <IconButton
            icon="history"
            size={40}
            onPress={() => navigation.navigate("History")}
          />
        </Text>
        <Text>
          <IconButton
            icon="cards-heart-outline"
            size={40}
            onPress={() => navigation.navigate("Favorite")}
          />
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  navBar: {
    maxHeight: 70,
    maxWidth: "100%",
    backgroundColor: "white",
  },
  navBarList: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
});

export default NavBar;

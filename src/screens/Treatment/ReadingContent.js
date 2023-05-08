import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { Video } from "expo-av";
const ReadingContent = ({ listOfObjects }) => {
  const renderItem = ({ item }) => {
    switch (item.type) {
      case "topic":
        return (
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{item.body}</Text>
          </View>
        );
      case "paragraph":
        return (
          <View style={styles.paragraphContainer}>
            <Text style={styles.paragraph}>{item.body}</Text>
          </View>
        );
      case "bulletPoints":
        return (
          <View style={styles.bulletpointsContainer}>
            {item.body.map((point, index) => (
              <View key={index} style={styles.bulletpointContainer}>
                <Text style={styles.bulletpointText}>• {point}</Text>
              </View>
            ))}
          </View>
        );
      case "image":
        return (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.url }}
              style={styles.image}
              accessibilityLabel={item.description}
            />
            <Text style={styles.imageDescription}>{item.description}</Text>
          </View>
        );
      case "video":
        return (
          <View style={styles.videoContainer}>
            <Video
              source={{ uri: item.url }}
              style={styles.video}
              useNativeControls={true}
              resizeMode="contain"
            />
            <Text style={styles.videoDescription}>{item.description}</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <FlatList
      data={listOfObjects}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

const styles = StyleSheet.create({
  // titleContainer: {
  //   paddingHorizontal: 16,
  //   paddingVertical: 8,
  //   backgroundColor: "#F5F5F5",
  //   borderRadius: 10,
  //   opacity: 0.8,
  // },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  paragraphContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  paragraph: {
    fontSize: 16,
    color: "#333",
  },
  bulletpointsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  bulletpointContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bulletpointText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  imageContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  imageDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
  },
  videoContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  videoDescription: {
    marginTop: 8,
    fontSize: 14,
    color: "#777",
  },
});

export default ReadingContent;

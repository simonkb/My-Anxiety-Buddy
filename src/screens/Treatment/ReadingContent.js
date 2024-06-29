// import React from "react";
// import { View, Text, Image, FlatList, StyleSheet } from "react-native";
// import { Video } from "expo-av";
// import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons

// const ReadingContent = ({ listOfObjects }) => {
//   const renderItem = ({ item }) => {
//     switch (item.type) {
//       case "topic":
//         return (
//           <View style={styles.titleContainer}>
//             <Text style={styles.title}>{item.body}</Text>
//           </View>
//         );
//       case "paragraph":
//         return (
//           <View style={styles.paragraphContainer}>
//             <Text style={styles.paragraph}>{item.body}</Text>
//           </View>
//         );
//       case "bulletPoints":
//         return (
//           <View style={styles.bulletpointsContainer}>
//             {item.body.map((point, index) => (
//               <View key={index} style={styles.bulletpointContainer}>
//                 <Text style={styles.bulletpointText}>• {point}</Text>
//               </View>
//             ))}
//           </View>
//         );
//       case "image":
//         return (
//           <View style={styles.imageContainer}>
//             <Image
//               source={{ uri: item.url }}
//               style={styles.image}
//               accessibilityLabel={item.description}
//             />
//             <Text style={styles.imageDescription}>{item.description}</Text>
//           </View>
//         );
//       case "video":
//         return (
//           <View style={styles.videoContainer}>
//             <Video
//               source={{ uri: item.url }}
//               style={styles.video}
//               useNativeControls={true}
//               resizeMode="contain"
//             />
//             <Text style={styles.videoDescription}>{item.description}</Text>
//           </View>
//         );
//       case "link":
//         return (
//           <View style={styles.linkContainer}>
//             <FontAwesome name="link" size={20} color="#007AFF" />
//             <Text style={styles.linkText}>{item.body}</Text>
//           </View>
//         );
//       case "location":
//         return (
//           <View style={styles.locationContainer}>
//             <FontAwesome name="map-marker" size={20} color="#007AFF" />
//             <Text style={styles.locationText}>{item.body}</Text>
//           </View>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <FlatList
//       data={listOfObjects}
//       renderItem={renderItem}
//       keyExtractor={(item, index) => index.toString()}
//       keyboardShouldPersistTaps="handled"
//     />
//   );
// };
import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Linking,
} from "react-native";
import { Video } from "expo-av";
import { FontAwesome } from "@expo/vector-icons"; // Import FontAwesome for icons

const ReadingContent = ({ listOfObjects }) => {
  const renderItem = ({ item }) => {
    const handleLinkPress = () => {
      if (item.type === "link" || item.type === "location") {
        Linking.openURL(item.body);
      }
    };

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
      case "link":
        return (
          <TouchableOpacity onPress={handleLinkPress}>
            <View style={styles.linkContainer}>
              <FontAwesome name="link" size={20} color="#007AFF" />
              <Text style={styles.linkText}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        );
      case "location":
        return (
          <TouchableOpacity onPress={handleLinkPress}>
            <View style={styles.locationContainer}>
              <FontAwesome name="map-marker" size={20} color="#007AFF" />
              <Text style={styles.locationText}>{item.description}</Text>
            </View>
          </TouchableOpacity>
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
      keyboardShouldPersistTaps="handled"
    />
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  paragraphContainer: {
    paddingHorizontal: 5,
    paddingVertical: 5,
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
    //alignItems: "flex-start",
  },
  bulletpointText: {
    fontSize: 16,
    color: "black",
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
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  linkText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 8,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    paddingVertical: 8,
  },
  locationText: {
    fontSize: 16,
    color: "#007AFF",
    marginLeft: 8,
  },
});

export default ReadingContent;

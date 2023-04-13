import * as React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from "react-native";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";


const DetailDoor = ({ navigation, route }) => {
  const { lock } = route.params;
  const handleEditPress = () => {
    return navigation.navigate("Edit", { lock });
  };
  const handleOpen = () => {
    return navigation.navigate("Edit", { lock });
  };
  const handleClose = () => {
    return navigation.navigate("Edit", { lock });
  };
  return (
    <>
      <View style={styles.container}>
        <ScrollView style={styles.scrollViewContent}>
          <View style={{ alignItems: "center" }}>
            <Text style={styles.text}>{lock.ten}</Text>
          </View>

          <View style={styles.detailview}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  Name
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: "gray", paddingHorizontal: 10 }}>
                  {lock.ten}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  Location
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: "gray", paddingHorizontal: 10 }}>
                  {lock.viTri}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  Note
                </Text>
              </View>
              <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ color: "gray", paddingHorizontal: 10 }}></Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                paddingVertical: 5,
                backgroundColor: "#fff",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  padding: 5,
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "black",
                    fontSize: 20,
                    paddingHorizontal: 10,
                  }}
                >
                  Status
                </Text>
              </View>
              {lock.status ? 
                <View style={styles.box}>
                  <Text
                    style={{
                      color: "black",
                      paddingHorizontal: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Open
                  </Text>
                </View>
              :
                <View style={styles.box1}>
                  <Text
                    style={{
                      color: "#fff",
                      paddingHorizontal: 10,
                      fontWeight: "bold",
                    }}
                  >
                    Close
                  </Text>
                </View>
              }
            </View>

            {/* Button */}
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleOpen}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={"lock-open"} size={20}></Ionicons>
                  <Text style={styles.buttonText}> Open Door </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button1, styles.deleteButton]}>
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={"lock-closed"} size={20}></Ionicons>
                  <Text style={styles.buttonText}> Close Door </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button3, styles.editButton]}
              onPress={handleEditPress}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={"pencil-sharp"} size={20} color={"#007AFF"}></Ionicons>
                  <Text style={styles.buttonTextB}> Edit </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button1, styles.deleteButton]}
              onPress={() =>
                Alert.alert(
                  "Xác nhận xóa",
                  "Bạn có chắc chắn muốn xóa dữ liệu này?",
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: () => {
                        // Thêm xử lý xóa dữ liệu ở đây
                      },
                    },
                  ]
                )
              }
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Ionicons name={"trash-outline"} size={20} ></Ionicons>
                  <Text style={styles.buttonText}> Delete </Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  detailview: {
    width: 350,
    backgroundColor: "#fff",
    alignSelf: "center",
    padding: 6,
    margin: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  image1: {
    width: 200,
    height: 200,
    borderRadius: 32,
    alignItems: "center",
  },
  imageview: {
    alignItems: "center",
  },
  container: {
    flex: 1,
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  text: {
    paddingVertical: 10,
    paddingLeft: 20,
    fontSize: 30,
    textAlign: "left",
    fontWeight: "bold",
  },
  intext: {
    paddingVertical: 10,
    color: "red",
    fontSize: 30,
    textAlign: "center",
    paddingBottom: 20,
  },
  user: {
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
  },
  email: {
    fontSize: 18,
    color: "#666",
  },

  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "44%",
  },
  button1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "44%",
  },
  editButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 2,
    borderRadius: 15,
    borderColor: "#007AFF",
  },
  deleteButton: {
    backgroundColor: "#FFFFFF",
    borderColor: "gray",
    borderWidth: 2,
    borderRadius: 15,
  },
  buttonTextB: {
    color: "#007AFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  box: {
    backgroundColor: "green",
    borderColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 32,
  },
  box1: {
    backgroundColor: "#8a2be2",
    borderColor: "#000",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 32,
  },
  button2: {
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 92,
    justifyContent: "center",
    alignItems: "center",
    width: "45%",
  },

  button3: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginLeft: 15,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    width: "44%",
  },
});

export default DetailDoor;

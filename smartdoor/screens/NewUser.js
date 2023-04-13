import * as React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";

async function postUser(userData) {
  try {
    const response = await axios.post("https://dhabackend.onrender.com/user/", userData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const NewUser = () => {
  const [name, setName] = useState("");
  const [info, setInfo] = useState("");

  // const handleAdd = () => {
  //   axios.post("http://localhost:4000/user/login", request).then((respond) => {
  //   axios
  //     .post("https://dhabackend.onrender.com/user", { name, info, img })
  //     .then((res) => {
  //       console.log(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const [image, setImage] = useState(null);

  const handleAdd = async () => {
    try {
      let imageData = null;
  
      if (image !== null) {
        const response = await fetch(image);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onload = () => {
          
          imageData = reader.result;
          console.log(imageData)
        };
        reader.readAsDataURL(blob);
      }      
  
      const userData = {
        ten: name,
        thongTin: info,
        anhDaiDien: image,
        // other user data
      };    
      await postUser(userData);
      Alert.alert(
        "Congratulation !",
        "Reload App để xem chi tiết !!!",
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        });

        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
    };

  return (
    <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContent}>
            <Text style={styles.text}>New User</Text>
            <View style={styles.imageview}>
                <TouchableOpacity onPress={pickImage}>
                    {image ? (
                    <Image source={{ uri: image }} style={styles.image1} resizeMode="contain" />
                    ) : (
                    <Image
                        source={require("../assets/image.png")}
                        style={styles.image1}
                        resizeMode="contain"
                    />
                    )}
                </TouchableOpacity>
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
                      color: 'black',
                      fontSize: 18,
                      paddingHorizontal: 10,
                    }}
                  >
                    Name
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right"  }}
                    placeholder="Enter User Name"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setName(text)}
                    >
                  </TextInput>
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
                      color: 'black',
                      fontSize: 18,
                      paddingHorizontal: 10,
                    }}
                  >
                    Acess Permissions
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right"  }}
                    placeholder="Add Door"
                    placeholderTextColor="gray"

                    >
                  </TextInput>
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
                      color: 'black',
                      fontSize: 18,
                      paddingHorizontal: 10,
                    }}
                  >
                    Note
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right"  }}
                    placeholder="Nothing about user"
                    placeholderTextColor="gray"
                    onChangeText={(text) => setInfo(text)}
                    >
                  </TextInput>
                </View>
              </View>

              {/* Button */}
              </View>
                
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleAdd}>
                <View>
                  <View style={{
                      flexDirection: "row",
                      padding: 5,
                      alignItems: "center",
                    }}
                  >
                    <Ionicons name={"add-circle-outline"} size={20} ></Ionicons>
                    <Text style={styles.buttonText}> Add </Text>
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
  checkicon: {
    width: 26,
    height: 26,
  },
  checkicon1: {
    width: 23,
    height: 23,
  },
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
    width: 170,
    height: 170,
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
    fontWeight: 'bold',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 10,
  },
  button: {
    paddingVertical: 10,
    borderRadius: 5,
    marginLeft: 92,
    justifyContent: 'center',
    alignItems: 'center',
    width: '45%',
  },
  button1: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginRight: 15,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: '44%',
  },
  editButton: {
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 15, 

  },
  deleteButton: {
    backgroundColor: '#FFFFFF',
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 15, 

  },
  buttonTextB: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
  box: {
    borderColor: '#000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 32, 
    justifyContent: "space-between",
    flexDirection: "row",

  },  

});

export default NewUser;

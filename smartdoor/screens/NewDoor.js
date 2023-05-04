import * as React from "react";
import { useState } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import { Alert } from "react-native";


async function postDoor(doorData) {
  try {
    const response = await axios.post("https://dhabackend.onrender.com/lock/", doorData);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

const NewDoor = () => {
  const [name, setName] = useState("");
  const [viTri, setviTri] = useState("");
  const [status, setStatus] = useState("Close");
  const [backgroundColor, setBackgroundColor] = useState("#8a2be2");
  const [color, setColor] = useState("#FFF");

  const handleStatusChange = () => {
      setStatus(status === "Open" ? "Close" : "Open");
      setBackgroundColor(status === "Open" ? "#8a2be2" : "green");
      setColor(status === "Open" ? "#FFF" : "black");
  };

  const handleAdd = () => {
    const doorData = {
      ten: name,
      viTri: viTri,
      status: status == "Open" ? true : false
      // other user data
    };    
    postDoor(doorData);
    Alert.alert(
      "Congratulation !",
      "Thêm thành công !!!",
    )
  };

  return (
    <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContent}>
            <Text style={styles.text}>New Door</Text>
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
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    Name
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right"  }}
                    placeholder="..............................."
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
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    Location
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right" }}
                    placeholder="..............................."
                    placeholderTextColor="gray"
                    onChangeText={(text) => setviTri(text)}
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
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    Note
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                <TextInput style={{ color: "gray", paddingHorizontal: 10, textAlign: "right" }}
                    placeholder="..............................."
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
                      fontSize: 20,
                      paddingHorizontal: 10,
                    }}
                  >
                    Status
                  </Text>
                </View>
                <View style={[styles.box, {backgroundColor}]}>
                    <TouchableOpacity style={styles.box} onPress={handleStatusChange}>
                    <Text style={{ color: color, paddingHorizontal: 10, fontWeight: "bold" }}>
                        {status}
                    </Text>
                    </TouchableOpacity>
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
    width: 18,
    height: 18,
  },
  checkicon1: {
    width: 18,
    height: 18,
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

export default NewDoor;

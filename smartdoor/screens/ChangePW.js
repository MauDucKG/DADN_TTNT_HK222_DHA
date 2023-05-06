import * as React from "react";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, TextInput } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ChangePW = () => {
  const [currpass, setCurrpass] = useState("");
  const [newpass, setNewpass] = useState("");
  const [confirmpass, setConfirmpass] = useState("");

  return (
    <>
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContent}>
            <Text style={styles.text}>Change Password</Text>
            <View style={styles.imageview}>
              <Image
                  source={require("../assets/Duc.png")}
                  style={styles.image1}
                  resizeMode="contain"
              />
              <View style = {{flexDirection: "row", padding: 0, alignItems: "center", }}>
                <Text style={{color: 'black', fontSize: 18, paddingHorizontal: 5, fontWeight: 'bold'}}>
                    Nguyen Mau Duc
                </Text>
              </View>
              <View style = {{flexDirection: "row", padding: 0, alignItems: "center", }}>
                <Text style={{opacity: 0.5, fontSize: 14, paddingHorizontal: 0, fontWeight: 'bold'}}>
                    nguyenmauduc@gmail.com
                </Text>
              </View>
            </View>
            
            <View style={styles.content}>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Current password"
                  value={currpass}
                  onChangeText={setCurrpass}
                />
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="New password"
                  value={newpass}
                  onChangeText={setNewpass}
                />
              </View>
            </View>

            <View style={styles.content}>
              <View style={styles.form}>
                <TextInput
                  style={styles.input}
                  placeholder="Confirm password"
                  value={confirmpass}
                  onChangeText={setConfirmpass}
                />
              </View>
            </View>
                
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.editButton]}>
              <View>
                <View style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Text style={styles.buttonText}> Change </Text>
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
    width: 150,
    height: 150,
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
  content: {
    flexGrow: 1,
    paddingVertical: 6,
    justifyContent: "center", // can giua theo truc y
    alignItems: "center", // can giua theo truc x
  },
  form: {
    width: "100%",
    maxWidth: 300,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    
    
  },
  input: {
        alignItems: "center", // can giua theo truc x

    width: "100%",
    maxWidth: 300,
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 20,
    paddingHorizontal: 25,
  },

});

export default ChangePW;

import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { Image, StyleSheet, Text, View, ScrollView, } from "react-native";

async function getlock(id) {
  try {
    const response = await axios.get("https://dhabackend.onrender.com/lock/" + id);
    return response.data; 
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const DetailAccessHistory = ({ route }) => {
  const { valid, user, data } = route.params;
  const [lock, setLock] = useState({});

  useEffect(() => {
    async function fetchData() {
      const data1 = await getlock(data.lockID);
      setLock(data1);
    }
    fetchData();
  }, []);
  
  const handleAbout = () => {
    return navigation.navigate("Details", {user});
  };

  return (
    <>
      {valid && (
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContent}>
            <Text style={styles.text}>Valid User</Text>
            <View style={styles.imageview}>
              <View style={styles.user}>
                <Image
                  style={styles.image}
                  resizeMode="cover"
                  source={{uri: user.anhDaiDien}}
                />
                <View style={styles.textContainer}>
                  <Text style={styles.name}>{user.ten}</Text>
                  <Text style={styles.email}>{user.thongTin}</Text>
                </View>
              </View>
            </View>
            <View style={styles.imageview}>
              <Image
                source={require("../assets/midu.jpg")}
                style={styles.image1}
                resizeMode="contain"
              />
            </View>
            <View style={styles.detailview}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#efe",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/check.png")}
                    style={styles.checkicon}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "green",
                      fontSize: 22,
                      paddingHorizontal: 10,
                    }}
                  >
                    Time
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text>{data.time}</Text>
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
                  <Image
                    source={require("../assets/check.png")}
                    style={styles.checkicon}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "green",
                      fontSize: 22,
                      paddingHorizontal: 10,
                    }}
                  >
                    Location
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ color: "gray", paddingHorizontal: 10 }}>
                    Cabinet A
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
                <Text
                  style={{
                    color: "green",
                    fontSize: 15,
                    paddingHorizontal: 10,
                    paddingLeft: 51,
                  }}
                >
                  Has been closed again
                </Text>
              </View>
              <View
                style={{
                  borderBottomColor: "#666",
                  borderBottomWidth: 1,
                  width: 300,
                  paddingVertical: 5,
                  alignSelf: "center",
                }}
              />
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingVertical: 5,
                  backgroundColor: "#fff",
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    paddingHorizontal: 10,
                    paddingLeft: 51,
                  }}
                >
                  Details about this user
                </Text>
                <Image
                  source={require("../assets/group-9.png")}
                  style={{ height: 40, width: 40 }}
                  resizeMode="contain"
                />
              </View>
            </View>
          </ScrollView>
        </View>
      )}
      {valid || (
        <View style={styles.container}>
          <ScrollView style={styles.scrollViewContent}>
            <Text style={styles.intext}>Invalid</Text>
            <View style={styles.imageview}>
              <Image
                source={require("../assets/logo-placeholder.png")}
                style={styles.image1}
                resizeMode="contain"
              />
            </View>
            <View style={styles.detailview}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: "#efe",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    padding: 5,
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("../assets/check.png")}
                    style={styles.checkicon}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "green",
                      fontSize: 22,
                      paddingHorizontal: 10,
                    }}
                  >
                    Time
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text>{data.time}</Text>
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
                  <Image
                    source={require("../assets/check.png")}
                    style={styles.checkicon}
                    resizeMode="contain"
                  />
                  <Text
                    style={{
                      color: "green",
                      fontSize: 22,
                      paddingHorizontal: 10,
                    }}
                  >
                    Location
                  </Text>
                </View>
                <View style={{ paddingHorizontal: 10 }}>
                  <Text style={{ color: "gray", paddingHorizontal: 10 }}>
                    Cabinet A
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
                <Text
                  style={{
                    color: "green",
                    fontSize: 15,
                    paddingHorizontal: 10,
                    paddingLeft: 51,
                    paddingBottom: 5,
                  }}
                >
                  The door has not been opened yet
                </Text>
              </View>
              
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  checkicon: {
    width: 36,
    height: 36,
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
    color: "green",
    fontSize: 30,
    textAlign: "center",
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
});

export default DetailAccessHistory;

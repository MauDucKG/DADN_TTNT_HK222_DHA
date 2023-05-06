import * as React from "react";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { Image, StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const Home = ({navigation }) => {
  const onPressButton = () => {
    return navigation.navigate('Info')
  };
  const handleEdit = () => {
    return navigation.navigate('DetailAdmin')
  };
  const handleNotification = () => {
    return navigation.navigate('History')
  };
  const handleLogout = () => {
    return navigation.navigate('Login')
  };
  const onPressChangePW = () => {
    return navigation.navigate('Change')
  };
  
  return (
    <>
      <View style={styles.groupContainer}>
        <View style={styles.listConfirmGroup}>
          <View style={styles.listConfirm1}>
            <Image
              style={styles.iconL1}
              resizeMode="cover"
              source={require("../assets/Duc.png")}
            />
            <View style={[styles.masterList1, styles.ml12]}>
              <Text style={[styles.caption1, {fontWeight: 'bold'}]}>Nguyen Mau Duc</Text>
              <Text style={[styles.subcaption1, styles.mt2]}>nguyenmauduc@gmail.com</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.listConfirm2} onPress={handleEdit}>
                <View>
                  <View style={{
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
        </View>
      </View>

      <View style={styles.groupContainer1}>
        <View style={styles.listConfirmGroup}>
          <View style={styles.listConfirm1}>
            <View style={[styles.masterList1, styles.ml12]}>
              <Text style={[styles.caption1 ]}>Change password</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.listConfirm2} onPress={onPressChangePW}>
            <Image
              style={styles.iconL1}
              resizeMode="cover"
              source={require("../assets/group-9.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.groupContainer1}>
        <View style={styles.listConfirmGroup}>
          <View style={styles.listConfirm1}>
            <View style={[styles.masterList1, styles.ml12]}>
              <Text style={[styles.caption1 ]}>Notification</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.listConfirm2} onPress={handleNotification}>
            <Image
              style={styles.iconL1}
              resizeMode="cover"
              source={require("../assets/group-9.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.groupContainer1}>
        <View style={styles.listConfirmGroup}>
          <View style={styles.listConfirm1}>
            <View style={[styles.masterList1, styles.ml12]}>
              <Text style={[styles.caption1 ]}>Terms & Condition</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.listConfirm2} onPress={onPressButton}>
            <Image
              style={styles.iconL1}
              resizeMode="cover"
              source={require("../assets/group-9.png")}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* <View style={styles.groupContainer1}>
        <View style={styles.listConfirmGroup}>
            <TouchableOpacity style={styles.listConfirm1} onPress={handleLogout}>
            <View style={[styles.masterList1, styles.ml12]}>
              <Text style={[styles.caption2 ]}>Logout</Text>
            </View>
            </TouchableOpacity>
          </View>
          
          
      </View> */}

      
      


      
    </>
  );
};

const handleFilterPress = () => {
    console.log("Filter button pressed!");
};

const Doors = ({navigation}) => {
    return (            
            <View style={styles.accessHistory}>
                {<ScrollView style={styles.body}>
                    <Door navigation={navigation}/>
                </ScrollView>}            
            </View>
    
    );
  };
  

const styles = StyleSheet.create({
  ml12: {
    marginLeft: 16,
  },
  body: {
    paddingTop: 20,
  },
  caption1: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
  },
  caption2: {
    fontSize: 16,
    letterSpacing: 0.3,
    lineHeight: 24,
    color: "#000",
    textAlign: "left",
    color: "red",
  },
  subcaption1: {
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    textAlign: "left",
    opacity: 0.5,
  },
  accessHistory: {
    backgroundColor: "#fff",
    width: "100%",
  },
  ibmPlexHeadline4: {
    paddingTop: 70,
    paddingLeft: 16,
    width: "100%",
  },
  manropeHeadline: {
    width: "100%",
    top: "0%",
    left: "0%",
    fontSize: 34,
    lineHeight: 44,
    fontWeight: "600",
    color: "#000",
    textAlign: "left",
  },
  groupContainer: {
    paddingLeft: 24,
    width: "100%",
  },

  groupContainer1: {
    paddingLeft: 0,
    width: "100%",
  },
  listConfirmGroup: {
    width: "100%",
    paddingTop: 70,
    paddingRight: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  listConfirm2: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  listConfirm1: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    
  },
  iconL1: {
    position: "relative",
    width: 40,
    height: 40,
  },
  iconL2: {
    position: "relative",
    width: 25,
    height: 25,
  },
  masterList1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  searchInput: {    
    
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#000",
    alignItems: 'center',
  },

  searchfilter: {
    marginLeft: 10,
  },

  search: {
    // paddingLeft: 24,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 30, 
    width: "80%",
    alignItems: 'center',
    
  },

  searchIcon: {
    marginLeft: 6,
    width: 20,
    height: 20,
    marginRight: 0,
    tintColor: '#999',
  },
  filterButton: {
    position: 'absolute',
    right: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 8,
    
  },
  filterIcon: {
    width: 25,
    height: 25,
    alignItems: 'center',

  },
  redButtonContainer: {
    position: 'absolute',
    bottom: 50,
    right: 20,
  },
  redButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  redButtonIcon: {
    width: 60,
    height: 60,
  },
  buttonTextB: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});


export default Home;

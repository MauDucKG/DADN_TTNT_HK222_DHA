import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { Image, StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const DoorBlock = ({ navigation, lock }) => {
  const onPressButton = () => {
    return navigation.navigate("Details", {lock});
  };
  return (
    <View style={styles.groupContainer}>
      <View style={styles.listConfirmGroup}>
        <View style={styles.listConfirm1}>
          <View style={[styles.masterList1, styles.ml12]}>
            <Text style={[styles.caption1, { fontWeight: "bold" }]}>
              {lock.ten}
            </Text>
            <Text style={[styles.subcaption1, styles.mt2]}>{lock.viTri}</Text>
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
  ); 
};
async function getAlldoor() {
  try {
    const response = await axios.get("https://dhabackend.onrender.com/lock");
    return response.data.locks;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
const Door = ({ navigation }) => {
  const [locks, setLock] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await getAlldoor();
      setLock(data);
    }
    fetchData();
  }, []);

  return (
    <View>
      {locks.map((lock, index) => {
        return <DoorBlock navigation={navigation} lock={lock} key={index} />;
      })}
    </View>
  );
};

const handleFilterPress = () => {
  console.log("Filter button pressed!");
};

const Doors = ({ navigation }) => {
  const [searchText, setSearchText] = useState("");

  const handleRedButtonPress = () => {
    return navigation.navigate("Add");
  };

  const doors = [
    { name: "Door 1", direction: "North" },
    { name: "Door 2", direction: "South" },
    { name: "Smart Door", direction: "West" },
  ];

  const filteredDoors = doors.filter((door) => {
    return (
      door.name.toLowerCase().includes(searchText.toLowerCase()) ||
      door.direction.toLowerCase().includes(searchText.toLowerCase())
    );
  });

  return (
    <View style={styles.accessHistory}>
      <View style={styles.searchfilter}>
        <View style={styles.search}>
          <Ionicons name={"search-outline"} size={26} color={"gray"}></Ionicons>
          <TextInput
            style={styles.searchInput}
            placeholder="Search ..."
            value={searchText}
            onChangeText={(text) => setSearchText(text)}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={handleFilterPress}
        >
          <Ionicons name={"color-filter-outline"} size={26} ></Ionicons>
        </TouchableOpacity>
      </View>

      <View style={styles.accessHistory}>
        {
          <ScrollView style={styles.body}>
            <Door navigation={navigation} />
          </ScrollView>
        }
      </View>

      <View style={styles.redButtonContainer}>
        <TouchableOpacity onPress={handleRedButtonPress}>
          <View style={styles.redButton}>
            <Image
              source={require("../assets/Buttonred.png")}
              style={styles.redButtonIcon}
            />
          </View>
        </TouchableOpacity>
      </View>
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
  subcaption1: {
    fontSize: 14,
    letterSpacing: 0.2,
    lineHeight: 20,
    textAlign: "left",
    opacity: 0.5,
  },
  accessHistory: {
    flex: 1,
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
  masterList1: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },

  searchInput: {
    marginLeft: 10,
    fontSize: 16,
    flex: 1,
    color: "#000",
    alignItems: "center",
  },

  searchfilter: {
    marginLeft: 10,
  },

  search: {
    // paddingLeft: 24,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: "#E8E8E8",
    borderRadius: 30,
    width: "80%",
    alignItems: "center",
  },

  searchIcon: {
    marginLeft: 6,
    width: 20,
    height: 20,
    marginRight: 0,
    tintColor: "#999",
  },
  filterButton: {
    position: "absolute",
    right: 25,
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  filterIcon: {
    width: 25,
    height: 25,
    alignItems: "center",
  },
  redButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 20,
  },
  redButton: {
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  redButtonIcon: {
    width: 60,
    height: 60,
  },
});

export default Doors;

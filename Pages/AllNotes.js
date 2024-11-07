import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import React, { useState, useCallback } from "react";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const AllNotes = () => {
  const navigation = useNavigation();
  const [notes, setNotes] = useState([]);

  const getAllNotes = async () => {
    try {
      const storedNotes = await SecureStore.getItemAsync("notes");
      if (storedNotes) {
        const data = JSON.parse(storedNotes);
        setNotes(data);
        console.log("Fetched notes:", data);  // Log fetched notes
      } else {
        setNotes([]);  // Clear notes if none are stored
        console.log("No notes found.");
      }
    } catch (error) {
      console.error("Failed to load notes", error);
    }
  };

  const deleteAllNotes = async () => {
    Alert.alert(
      "Delete All Notes",
      "Are you sure you want to delete all notes?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await SecureStore.setItemAsync("notes", JSON.stringify([])); // Clear notes in SecureStore
              setNotes([]); // Update state
              console.log("All notes deleted.");
            } catch (error) {
              console.error("Failed to delete all notes", error);
            }
          },
        },
      ]
    );
  };

  useFocusEffect(
    useCallback(() => {
      getAllNotes();
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={notes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.noteContainer}>
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDesc}>{item.desc}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noNotesText}>No notes available.</Text>}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate("AddNotes");
        }}
      >
        <Text style={styles.buttontxt}>+</Text>
      </TouchableOpacity>

      {/* Delete All Button */}
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={deleteAllNotes}
      >
        <Text style={styles.deleteButtonText}>Delete All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AllNotes;const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  noteContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    minHeight: 100,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  noteDesc: {
    fontSize: 16,
    color: "#444",
    flexShrink: 1,
  },
  button: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#000",
    position: "absolute",
    right: 24,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  buttontxt: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#d32f2f",
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: "absolute",
    top: 72, // Moved the delete button down
    right: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  noNotesText: {
    fontSize: 16,
    color: "#666",
    marginTop: 24,
    textAlign: "center",
  },
});

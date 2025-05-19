import React, { useState, useCallback } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
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
        // Add unique ID to existing notes if missing
        const notesWithIds = data.map(note => ({
          ...note,
          id: note.id || Date.now().toString() + Math.random()
        }));
        setNotes(notesWithIds);
        console.log("Fetched notes:", notesWithIds);
      } else {
        setNotes([]);
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
              await SecureStore.setItemAsync("notes", JSON.stringify([]));
              setNotes([]);
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
        keyExtractor={(item) => item.id || Date.now().toString()}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.noteContainer}
            onPress={() => navigation.navigate("EditNotes", { note: item })}
          >
            <Text style={styles.noteTitle}>{item.title}</Text>
            <Text style={styles.noteDesc}>{item.desc}</Text>
          </TouchableOpacity>
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

      {notes.length > 0 && (
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={deleteAllNotes}
        >
          <Text style={styles.deleteButtonText}>Delete All</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

// AllNotes StyleSheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingHorizontal: 16,
  },
  noteContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 18,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.5,
    elevation: 3,
    minHeight: 110,
  },
  noteTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
    color: "#2c3e50",
  },
  noteDesc: {
    fontSize: 16,
    color: "#5d6d7e",
    flexShrink: 1,
    lineHeight: 22,
  },
  button: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#2980b9",
    position: "absolute",
    right: 24,
    bottom: 24,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttontxt: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "500",
    marginBottom: 2, // Visual adjustment for the + icon
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    borderRadius: 12,
    paddingVertical: 10,
    paddingHorizontal: 15,
    position: "absolute",
    right: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "600",
  },
  noNotesText: {
    fontSize: 17,
    color: "#7f8c8d",
    marginTop: 40,
    textAlign: "center",
    fontWeight: "500",
  },
});


export default AllNotes;
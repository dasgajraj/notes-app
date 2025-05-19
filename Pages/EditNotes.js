import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  Platform,
  Keyboard,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

const EditNotes = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { note } = route.params;

  const [title, setTitle] = useState(note.title);
  const [desc, setDesc] = useState(note.desc);

  const updateNote = async () => {
    if (!title.trim()) {
      Alert.alert("Error", "Title cannot be empty");
      return;
    }

    try {
      const storedNotes = await SecureStore.getItemAsync("notes");
      let notesArray = storedNotes ? JSON.parse(storedNotes) : [];

      // Find and update the specific note
      const updatedNotes = notesArray.map(n => 
        n.id === note.id 
          ? { 
              ...n, 
              title: title.trim(), 
              desc: desc.trim(),
              updatedAt: new Date().toISOString()
            } 
          : n
      );

      await SecureStore.setItemAsync("notes", JSON.stringify(updatedNotes));
      
      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to update note");
      console.error("Failed to update note", error);
    }
  };

  const deleteNote = () => {
    Alert.alert(
      "Delete Note",
      "Are you sure you want to delete this note?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              const storedNotes = await SecureStore.getItemAsync("notes");
              let notesArray = storedNotes ? JSON.parse(storedNotes) : [];

              const filteredNotes = notesArray.filter(n => n.id !== note.id);

              await SecureStore.setItemAsync("notes", JSON.stringify(filteredNotes));
              
              navigation.goBack();
            } catch (error) {
              Alert.alert("Error", "Failed to delete note");
              console.error("Failed to delete note", error);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Edit Note</Text>
        <TouchableOpacity 
          style={styles.deleteButton} 
          onPress={deleteNote}
        >
          <Ionicons name="trash" size={24} color="#d32f2f" />
        </TouchableOpacity>
      </View>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        maxLength={50}
      />
      <TextInput
        placeholder="Note Description"
        style={[styles.input, styles.descInput]}
        value={desc}
        onChangeText={setDesc}
        multiline
        maxLength={300}
      />
      
      <TouchableOpacity 
        style={[
          styles.updateButton, 
          { 
            opacity: (title.trim() !== note.title || desc.trim() !== note.desc) ? 1 : 0.5 
          }
        ]} 
        onPress={updateNote}
        disabled={title.trim() === note.title && desc.trim() === note.desc}
      >
        <Text style={styles.updateButtonText}>Update Note</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingTop: Platform.OS === 'ios' ? 50 : 30,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eeeeee',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#2c3e50',
    letterSpacing: 0.3,
  },
  deleteButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  input: {
    width: "90%",
    height: 55,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    paddingHorizontal: 16,
    alignSelf: "center",
    backgroundColor: 'white',
    fontSize: 16,
    color: '#333',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2.5,
    elevation: 2,
  },
  descInput: {
    height: 180,
    textAlignVertical: 'top',
    paddingTop: 16,
    marginTop: 24,
    lineHeight: 22,
  },
  updateButton: {
    width: "90%",
    height: 56,
    marginTop: 30,
    backgroundColor: "#2980b9",
    borderRadius: 12,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 3,
  },
  updateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
export default EditNotes;
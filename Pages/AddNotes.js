import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { Ionicons } from "@expo/vector-icons";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigation = useNavigation();

  const saveNote = async () => {
    // Validation
    if (!title.trim()) {
      Alert.alert("Error", "Please enter a title");
      return;
    }

    try {
      const storedNotes = await SecureStore.getItemAsync("notes");
      let notesArray = storedNotes ? JSON.parse(storedNotes) : [];
      
      const newNote = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        title: title.trim(),
        desc: desc.trim(),
        createdAt: new Date().toISOString()
      };

      notesArray.push(newNote);

      await SecureStore.setItemAsync("notes", JSON.stringify(notesArray));
      
      Keyboard.dismiss();
      navigation.goBack();
    } catch (error) {
      Alert.alert("Error", "Failed to save note");
      console.error("Failed to save note", error);
    }
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
        <Text style={styles.headerTitle}>Add New Note</Text>
      </View>

      <TextInput
        placeholder="Title"
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        maxLength={50}
        returnKeyType="next"
      />
      <TextInput
        placeholder="Note Description"
        style={[styles.input, styles.descInput]}
        value={desc}
        onChangeText={setDesc}
        multiline
        maxLength={300}
        returnKeyType="done"
      />
      
      <TouchableOpacity 
        style={[
          styles.addButton, 
          { opacity: title.trim() ? 1 : 0.5 }
        ]} 
        onPress={saveNote}
        disabled={!title.trim()}
      >
        <Text style={styles.addButtonText}>Save Note</Text>
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
    paddingHorizontal: 20,
    paddingBottom: 15,
    marginBottom: 15,
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
    marginLeft: 10,
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
  addButton: {
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
  addButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});

export default AddNotes;
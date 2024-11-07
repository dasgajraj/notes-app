import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const AddNotes = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const navigation = useNavigation();

  const saveNote = async () => {
    try {
      const storedNotes = await SecureStore.getItemAsync("notes");
      let notesArray = storedNotes ? JSON.parse(storedNotes) : [];
      notesArray.push({ title, desc });

      await SecureStore.setItemAsync("notes", JSON.stringify(notesArray));
      console.log("Note saved:", { title, desc });  // Log saved note
      console.log("All notes:", notesArray);  // Log all notes array

      navigation.goBack();
    } catch (error) {
      console.error("Failed to save note", error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Your Title"
        style={styles.input}
        value={title}
        onChangeText={(txt) => setTitle(txt)}
      />
      <TextInput
        placeholder="Enter Note"
        style={styles.input}
        value={desc}
        onChangeText={(txt) => setDesc(txt)}
      />
      <TouchableOpacity style={styles.addbutton} onPress={saveNote}>
        <Text style={styles.buttontxt}>Add Notes</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddNotes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  input: {
    width: "90%",
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft: 20,
    alignSelf: "center",
  },
  addbutton: {
    width: "90%",
    height: 50,
    marginTop: 20,
    borderWidth: 1,
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  buttontxt: {
    color: "#fff",
    fontSize: 20,
  },
});

import React, { useState, useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import AllNotes from "../Pages/AllNotes";
import AddNotes from "../Pages/AddNotes";
import LoadingScreen from "../Pages/Loading"; 

const Stack = createStackNavigator();

export default function Navigator() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
         {isLoading ? (
          <Stack.Screen
            name="Loading"
            component={LoadingScreen} 
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name="AllNotes"
              component={AllNotes}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AddNotes"
              component={AddNotes}
              options={{ headerShown: true }}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

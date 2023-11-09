import React, { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";

export type UserDetail = {
  id?: number,
  email: string,
  firstName?: string
  lastName?: string,
  age: number
}

function ProfilePage() {
  const [user, setUser] = useState<UserDetail | undefined>(undefined)

  useEffect(() => {
    SecureStore.getItemAsync("user_detail").then((result: string | null) => {
      if (result !== null) {
        setUser(JSON.parse(result))
      }
  })
  }, [])
  
  return <SafeAreaView>
    { user && (
    <Text>{user.email}</Text>
    ) }
  </SafeAreaView>;
}

export default ProfilePage;

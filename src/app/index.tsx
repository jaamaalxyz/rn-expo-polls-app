import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <FlatList
        data={[1, 2, 3, 4, 5]}
        renderItem={({ item }) => <Text>Item: {item}</Text>}
        contentContainerStyle={{
          flex: 1,
          padding: 20,
          backgroundColor: '#fafaaa',
        }}
      />
    </>
  );
}

const styles = StyleSheet.create({});

import { Link, Stack } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const polls = [
  {
    id: 1,
  },
  {
    id: 2,
  },
  {
    id: 3,
  },
  {
    id: 4,
  },
  {
    id: 5,
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Polls',
          headerRight: () => {
            return (
              <Link href="/new" style={{ padding: 10 }}>
                <Feather name="plus" size={24} color="black" />
              </Link>
            );
          },
        }}
      />
      <FlatList
        data={polls}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => (
          <Link href={`/polls/${item.id}`} style={styles.pollContainer}>
            <Text style={styles.pollTitle}>{item.id}: poll question</Text>
          </Link>
        )}
      />
      <StatusBar style="auto" />
      <Link href="/polls/new" style={{ padding: 10 }}>
        <Feather name="plus" size={24} color="black" />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    gap: 5,
  },
  pollContainer: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  pollTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

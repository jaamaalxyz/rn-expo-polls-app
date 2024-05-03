import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Link, Stack } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { supabase } from '@/lib/supabase';

export default function HomeScreen() {
  const [polls, setPolls] = useState<
    { id: number; question: string; options: string[] }[]
  >([]);

  async function fetchPolls() {
    const { data, error } = await supabase.from('polls').select('*');

    console.log({ data, error });

    if (error) {
      console.error(error);
    } else {
      setPolls(data);
    }
  }

  useEffect(() => {
    fetchPolls();
  }, []);

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
          <Link
            href={{ pathname: `/polls/${item.id}`, params: { poll: item } }}
            style={styles.pollContainer}
          >
            <Text style={styles.pollTitle}>
              {item.id}: {item.question}
            </Text>
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

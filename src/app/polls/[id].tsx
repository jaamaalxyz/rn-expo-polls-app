import React from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { Stack, router, useLocalSearchParams } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const poll = {
  question: 'What is your favorite color?',
  options: ['Red', 'Green', 'Blue'],
};

const PollsDetails = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selected, setSelected] = React.useState<string | null>(null);

  const handleVote = () => {
    if (selected) {
      console.warn(`Voted for ${selected}`);
    }
    setSelected(null);
    router.push('/');
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: `Poll: ${id}` }} />
      <Text style={styles.title}>{poll.question}</Text>
      <FlatList
        data={poll.options}
        renderItem={({ item }) => {
          return (
            <Pressable
              onPress={() => {
                setSelected(item);
              }}
              style={styles.item}
            >
              <Feather
                name={selected === item ? 'check-square' : 'square'}
                size={24}
                color={selected === item ? 'green' : 'black'}
              />
              <Text>{item}</Text>
            </Pressable>
          );
        }}
      />

      <Pressable onPress={handleVote} style={styles.button}>
        <Text style={styles.buttonText}>Submit Vote</Text>
      </Pressable>
    </View>
  );
};

export default PollsDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    paddingVertical: 10,
  },
  item: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

import React, { useState } from 'react';
import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { Stack, router } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

const CreatePoll = () => {
  const [title, setTitle] = useState<string>('');
  const [questions, setQuestions] = useState<string[]>(['', '']);

  const handleSave = () => {
    console.log(title, questions);
    router.push('/');
  };

  const handleChangeOption = (index: number, text: string) => {
    const newQuestions = [...questions];
    newQuestions[index] = text;
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (index: number) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Create Poll' }} />
      <View>
        <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Poll Title</Text>
        <TextInput
          placeholder="Enter poll title"
          value={title}
          onChangeText={setTitle}
          style={styles.input}
        />

        <View>
          <Text>Poll Options:</Text>
          <FlatList
            data={questions}
            renderItem={({ item, index }) => (
              <View>
                <TextInput
                  placeholder={`Option ${index + 1}`}
                  style={styles.input}
                  value={item}
                  onChangeText={(text) => handleChangeOption(index, text)}
                />
                <Pressable
                  onPress={() => handleDeleteOption(index)}
                  style={styles.deleteButton}
                >
                  <Entypo name="cross" size={20} color="black" />
                </Pressable>
              </View>
            )}
          />
          <Pressable
            onPress={() => {
              setQuestions([...questions, '']);
            }}
            style={styles.addButton}
          >
            <Feather name="plus" size={24} color="white" />
            <Text style={{ color: 'white' }}>Add Option</Text>
          </Pressable>
        </View>
      </View>
      <Pressable onPress={handleSave} style={styles.button}>
        <Text style={{ color: 'white' }}>Save</Text>
      </Pressable>
    </View>
  );
};

export default CreatePoll;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    margin: 10,
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#9a9a9a',
    borderWidth: 1,
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  deleteButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    paddingHorizontal: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  addButton: {
    padding: 10,
    backgroundColor: '#2196f3',
    borderRadius: 5,
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
});

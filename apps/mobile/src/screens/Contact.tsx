import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from 'react-native';
import styles from '../../styles';
import {
  getById,
  addTask,
  toggleTaskDone,
  updateTask,
  deleteTask,
  updateStatus,
  Contact,
  Task,
} from '../../storage';
import { useRoute } from '@react-navigation/native';
import theme from '../../theme';

export default function ContactScreen() {
  const route = useRoute();
  // @ts-ignore
  const { id } = route.params as { id: string };
  const [contact, setContact] = useState<Contact | undefined>();
  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await getById(id);
    setContact(data);
  }

  async function handleAdd() {
    if (!title) return;
    await addTask(id, { title, dueDate });
    setTitle('');
    setDueDate('');
    load();
  }

  async function handleToggle(task: Task) {
    await toggleTaskDone(id, task.id);
    load();
  }

  async function handleEdit(task: Task) {
    Alert.prompt('Edit title', task.title, async (text) => {
      if (text) {
        await updateTask(id, task.id, { title: text });
        load();
      }
    });
  }

  async function handleEditDate(task: Task) {
    Alert.prompt('Due date', task.dueDate || '', async (text) => {
      await updateTask(id, task.id, { dueDate: text || undefined });
      load();
    });
  }

  async function handleDelete(task: Task) {
    await deleteTask(id, task.id);
    load();
  }

  async function changeStatus() {
    const options = ['New', 'In Progress', 'Won', 'Lost'];
    Alert.alert('Change status', '', [
      ...options.map((s) => ({
        text: s,
        onPress: async () => {
          await updateStatus(id, s);
          load();
        },
      })),
      { text: 'Cancel', style: 'cancel' },
    ]);
  }

  if (!contact) return <View style={styles.container} />;

  const open = contact.tasks.filter((t) => !t.done).length;

  return (
    <View style={styles.container}>
      <Text style={{ color: theme.colors.text, fontSize: 22 }}>{contact.name}</Text>
      <Text style={{ color: '#aaa', marginBottom: 12 }}>{contact.phone}</Text>
      <TouchableOpacity style={styles.button} onPress={changeStatus}>
        <Text style={styles.buttonText}>Status: {contact.status}</Text>
      </TouchableOpacity>
      <Text style={{ color: theme.colors.text, marginVertical: 8 }}>
        Tasks {open}/{contact.tasks.length}
      </Text>
      <FlatList
        data={contact.tasks}
        keyExtractor={(t) => t.id}
        renderItem={({ item }) => (
          <View style={[styles.card, { flexDirection: 'row', alignItems: 'center' }]}> 
            <TouchableOpacity onPress={() => handleToggle(item)} style={{ marginRight: 8 }}>
              <Text style={{ color: theme.colors.accent }}>{item.done ? '☑' : '☐'}</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }}>
              <TouchableOpacity onPress={() => handleEdit(item)}>
                <Text style={{ color: theme.colors.text }}>{item.title}</Text>
              </TouchableOpacity>
              {item.dueDate ? (
                <TouchableOpacity onPress={() => handleEditDate(item)}>
                  <Text style={{ color: '#888', fontSize: 12 }}>{item.dueDate}</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={() => handleEditDate(item)}>
                  <Text style={{ color: '#888', fontSize: 12 }}>Set due date</Text>
                </TouchableOpacity>
              )}
            </View>
            <TouchableOpacity onPress={() => handleDelete(item)}>
              <Text style={{ color: '#f55' }}>Del</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={{ marginTop: 12 }}>
        <TextInput
          placeholder="Task title"
          placeholderTextColor="#888"
          style={[styles.input, { marginBottom: 8 }]}
          value={title}
          onChangeText={setTitle}
        />
        <TextInput
          placeholder="Due date"
          placeholderTextColor="#888"
          style={[styles.input, { marginBottom: 8 }]}
          value={dueDate}
          onChangeText={setDueDate}
        />
        <TouchableOpacity style={styles.button} onPress={handleAdd}>
          <Text style={styles.buttonText}>Add task</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

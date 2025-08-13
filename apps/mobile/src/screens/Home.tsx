import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity } from 'react-native';
import styles from '../../styles';
import Card from '../../components/Card';
import {
  loadContacts,
  clearAllContacts,
  resetDemo,
  Contact,
} from '../../storage';
import { useNavigation } from '@react-navigation/native';
import theme from '../../theme';

const statuses = ['All', 'New', 'In Progress', 'Won', 'Lost'];

export default function Home() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const navigation = useNavigation();

  useEffect(() => {
    load();
  }, []);

  async function load() {
    const data = await loadContacts();
    setContacts(data);
  }

  function handlePress(contact: Contact) {
    // @ts-ignore
    navigation.navigate('Contact', { id: contact.id });
  }

  function filtered() {
    return contacts.filter((c) => {
      const matchesSearch =
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.phone.toLowerCase().includes(search.toLowerCase());
      const matchesStatus = filter === 'All' || c.status === filter;
      return matchesSearch && matchesStatus;
    });
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        placeholderTextColor="#888"
        style={[styles.input, { marginBottom: 12 }]}
        value={search}
        onChangeText={setSearch}
      />
      <View style={{ flexDirection: 'row', marginBottom: 12 }}>
        {statuses.map((s) => (
          <TouchableOpacity
            key={s}
            onPress={() => setFilter(s)}
            style={{
              flex: 1,
              padding: 6,
              marginHorizontal: 2,
              backgroundColor: filter === s ? theme.colors.accent : theme.colors.glass,
              alignItems: 'center',
              borderRadius: 4,
            }}
          >
            <Text style={{ color: filter === s ? '#000' : theme.colors.text }}>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <FlatList
        data={filtered()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card contact={item} onPress={() => handlePress(item)} />
        )}
      />
      <TouchableOpacity style={styles.button} onPress={() => {}}>
        <Text style={styles.buttonText}>New contact</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={async () => { await clearAllContacts(); setContacts([]); }}>
        <Text style={styles.buttonText}>Clear all</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={async () => { const data = await resetDemo(); setContacts(data); }}>
        <Text style={styles.buttonText}>Reset demo</Text>
      </TouchableOpacity>
    </View>
  );
}

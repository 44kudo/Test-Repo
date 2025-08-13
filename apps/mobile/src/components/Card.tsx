import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../styles';
import { Contact } from '../storage';
import theme from '../theme';

interface Props {
  contact: Contact;
  onPress: () => void;
}

export default function Card({ contact, onPress }: Props) {
  const open = contact.tasks.filter((t) => !t.done).length;
  const total = contact.tasks.length;
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Text style={{ color: theme.colors.text, fontSize: 18 }}>{contact.name}</Text>
      <Text style={{ color: '#aaa' }}>{contact.phone}</Text>
      <Text style={{ color: theme.colors.text, marginTop: 4 }}>{contact.status}</Text>
      <Text style={{ color: theme.colors.accent }}>{open}/{total} tasks</Text>
    </TouchableOpacity>
  );
}

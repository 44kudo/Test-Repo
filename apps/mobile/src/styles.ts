import { StyleSheet } from 'react-native';
import theme from './theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: 16,
  },
  card: {
    backgroundColor: theme.colors.glass,
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: theme.colors.border,
    shadowColor: theme.colors.accent,
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  input: {
    borderColor: theme.colors.border,
    borderWidth: 1,
    padding: 8,
    borderRadius: 6,
    color: theme.colors.text,
  },
  button: {
    backgroundColor: theme.colors.accent,
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 4,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
  },
});

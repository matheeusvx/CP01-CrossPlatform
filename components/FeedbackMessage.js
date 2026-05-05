import { StyleSheet, Text, View } from 'react-native';
import colors from '../constants/colors';

export default function FeedbackMessage({ type = 'info', message }) {
  if (!message) {
    return null;
  }

  const stylesByType = {
    error: {
      container: styles.errorContainer,
      text: styles.errorText,
    },
    success: {
      container: styles.successContainer,
      text: styles.successText,
    },
    info: {
      container: styles.infoContainer,
      text: styles.infoText,
    },
  };

  const selectedStyle = stylesByType[type] || stylesByType.info;

  return (
    <View style={[styles.container, selectedStyle.container]}>
      <Text style={[styles.text, selectedStyle.text]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 14,
    padding: 12,
    marginBottom: 14,
    borderWidth: 1,
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
    fontWeight: '700',
  },
  errorContainer: {
    backgroundColor: '#fff2f1',
    borderColor: '#f3b8b3',
  },
  errorText: {
    color: colors.danger,
  },
  successContainer: {
    backgroundColor: '#eef8f1',
    borderColor: '#b8e0c2',
  },
  successText: {
    color: colors.success,
  },
  infoContainer: {
    backgroundColor: '#f2f4f8',
    borderColor: colors.border,
  },
  infoText: {
    color: colors.mutedText,
  },
});
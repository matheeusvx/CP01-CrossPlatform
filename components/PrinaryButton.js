import { ActivityIndicator, Pressable, StyleSheet, Text } from 'react-native';
import colors from '../constants/colors';

export default function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  variant = 'primary',
}) {
  const isOutline = variant === 'outline';

  return (
    <Pressable
      style={[
        styles.button,
        isOutline && styles.outlineButton,
        (disabled || loading) && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? colors.primary : colors.light} />
      ) : (
        <Text style={[styles.text, isOutline && styles.outlineText]}>{title}</Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  outlineButton: {
    backgroundColor: 'transparent',
  },
  disabledButton: {
    opacity: 0.65,
  },
  text: {
    color: colors.light,
    fontSize: 15,
    fontWeight: '900',
  },
  outlineText: {
    color: colors.primary,
  },
});
export function isEmpty(value) {
  return !value || value.trim().length === 0;
}

export function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email).toLowerCase());
}

export function validateRegisterForm({ name, email, password, confirmPassword }) {
  const errors = {};

  if (isEmpty(name)) {
    errors.name = 'O nome completo é obrigatório.';
  }

  if (isEmpty(email)) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (isEmpty(password)) {
    errors.password = 'A senha é obrigatória.';
  } else if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  if (isEmpty(confirmPassword)) {
    errors.confirmPassword = 'Confirme sua senha.';
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'As senhas não são iguais.';
  }

  return errors;
}

export function validateLoginForm({ email, password }) {
  const errors = {};

  if (isEmpty(email)) {
    errors.email = 'O e-mail é obrigatório.';
  } else if (!isValidEmail(email)) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (isEmpty(password)) {
    errors.password = 'A senha é obrigatória.';
  }

  return errors;
}

export function validateRequired(value, message) {
  if (isEmpty(value)) {
    return message;
  }

  return '';
}
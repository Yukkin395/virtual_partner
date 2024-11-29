export const useFormValidation = () => {
  const validateEmail = (email: string): string => {
    if (!email) {
      return "メールアドレスを入力してください";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "正しいメールアドレスの形式で入力してください";
    }
    return "";
  };

  const validatePassword = (password: string): string => {
    if (!password) {
      return "パスワードを入力してください";
    }
    if (password.length < 6) {
      return "パスワードは6文字以上で入力してください";
    }
    return "";
  };

  return { validateEmail, validatePassword };
};

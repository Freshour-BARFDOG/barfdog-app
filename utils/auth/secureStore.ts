import * as SecureStore from "expo-secure-store";

const setSecureStore = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getSecureStore = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

const deleteSecureStore = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export { deleteSecureStore, getSecureStore, setSecureStore };

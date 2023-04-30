import * as SecureStore from 'expo-secure-store';

export async function setValueFor(key: string, value: any) {
  try {
    await SecureStore.setItemAsync(key, value);
  } catch(e) {
    return false;
  }
}

export async function getValueFor(key: string) {
  try {
    let result = await SecureStore.getItemAsync(key);
    return result;
  } catch(e) {
    return null;
  }
}

export async function deleteValueFor(key: string) {
  try {
    await SecureStore.deleteItemAsync(key);
  } catch(e) {
    return false;
  }
}


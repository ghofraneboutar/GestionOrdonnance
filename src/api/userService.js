import { getItem, saveItem } from "./asyncStorage";

const USER_KEY = "users";

export const getUsers = async () => {
  return (await getItem(USER_KEY)) || [];
};

export const addUser = async (user) => {
  const users = await getUsers();
  const newList = [...users, user];
  await saveItem(USER_KEY, newList);
  return newList;
};

export const authenticateUser = async (email, password) => {
  const users = await getUsers();
  return users.find((u) => u.email === email && u.password === password);
};

export const initializeUsers = async () => {
  const existingUsers = await getUsers();
  if (existingUsers.length === 0) {
    const defaultUsers = [
      {
        id: "u222",
        role: "patient",
        name: "Jean Martin",
        email: "patient@dweya.com",
        password: "patient123",
      },
      {
        id: "u333",
        role: "pharmacien",
        name: "Dr. Sophie Dubois",
        email: "pharma@dweya.com",
        password: "pharma123",
      },
    ];
    await saveItem(USER_KEY, defaultUsers);
    return defaultUsers;
  }
  return existingUsers;
};

import axios from "axios";
import { doc, updateDoc } from "firebase/firestore";
import { FirebaseConn } from "../firebase/conection";
import { getFirestore, addDoc, collection } from "firebase/firestore";

const API_BASE_URL = "https://safety-street-api.vercel.app/users";

const createUser = async (data = {}) => {
  const response = await axios.post(API_BASE_URL, data);

  return response.data;
};

const loginUser = async (data = {}) => {
  const response = await axios.post(`${API_BASE_URL}/login`, data);

  return response.data;
};

const updateUser = async (datas = {}, id: string) => {
  const db = getFirestore(FirebaseConn);
  const userRef = doc(db, 'users', id);

  const response = await updateDoc(userRef, {...datas})
  
  return response;
};

export { createUser, loginUser, updateUser };

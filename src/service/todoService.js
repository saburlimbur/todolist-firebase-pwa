import { collection, getDocs } from 'firebase/firestore';
import { database } from '../config/firebase';
import Notiflix from 'notiflix';

const todoCollectionReference = collection(database, 'todo-list-pwa');

export async function allTodos() {
  try {
    const querySnapshot = await getDocs(todoCollectionReference);
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return todos;
  } catch (error) {
    console.log('Gagal mengambil semua data todo', error);
  }
}

export async function createTodos() {
  try {
    const result = await addDoc(todoCollectionReference, todo);

    Notiflix.Notify.success('Todo created successfully!');
    return result;
  } catch (error) {}
}

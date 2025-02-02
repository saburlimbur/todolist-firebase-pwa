import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
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

export async function createTodos(todo) {
  const user = auth.currentUser;

  if (!user) {
    throw new Error('User tidak ter-authentikasi');
  }
  try {
    const result = await addDoc(todoCollectionReference, {
      ...todo,
      userId: user.uid, // id yang sedang login (auto id)
      created_at: serverTimestamp(),
      author: todo.author,
      status: todo.status || 'pending', // pending fallback
    });

    Notiflix.Notify.success('Todo berhasil dibuat🎉!');
    return result;
  } catch (error) {
    throw error;
  }
}

import { addDoc, collection, getDocs, serverTimestamp } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import Notiflix from 'notiflix';

const todoCollectionReference = collection(database, 'todo-list-pwa');

export async function allTodos() {
  try {
    const querySnapshot = await getDocs(todoCollectionReference);
    const todos = querySnapshot.docs.map((doc) => {
      const todoData = doc.data();
      const userId = todoData.userId;

      const user = auth.currentUser?.uid === userId ? auth.currentUser : null;

      return {
        id: doc.id,
        ...todoData,
        user: user,
      };
    });

    return todos;
  } catch (error) {
    console.log('Gagal mengambil semua data todo', error);
    throw error;
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
      userId: user.uid, // id yang sedang login (auto id dari firestore)
      created_at: serverTimestamp(),
      status: todo.status || 'pending', // pending fallback
    });

    Notiflix.Notify.success('Todo berhasil dibuat🎉!');
    return result;
  } catch (error) {
    throw error;
  }
}

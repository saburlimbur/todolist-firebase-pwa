import { auth, database, googleProvider } from '../config/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, DocumentReference, getDocs, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import Notiflix from 'notiflix';

const usersCollectionReference = collection(database, 'todo-list-pwa');

export async function allUsers() {
  try {
    const querySnapshot = await getDocs(usersCollectionReference);
    const users = querySnapshot.docs.map((doc) => ({
      id: doc.id, // snap docoument id yang auto generate id
      ...doc.data(),
    }));

    return users;
  } catch (error) {
    console.log('Gagal mengambil semua data', error);
  }
}

export async function createUserWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log('User registered successfully: ', user);
    Notiflix.Notify.success('User registered successfully!');
    // window.location.href = '/todoboard';
  } catch (error) {
    console.error('Error signing up with Google: ', error.message);
    Notiflix.Notify.failure('Error signing up with Google: ' + error.message);
  }
}

export async function createUserWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);

    const user = result.user; // ke firestore
    Notiflix.Notify.success('User created successfully!');
    console.log('User created successfully: ', user);
    // window.location.href = '/login';
  } catch (error) {
    console.error('Error creating user: ', error.message);
    Notiflix.Notify.failure('Error creating user: ' + error.message);
  }
}

export async function loginUserWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    console.log('User logged-in successfully: ', user);
    Notiflix.Notify.success('User logged-in successfully!');
    window.location.href = '/todoboard';
  } catch (error) {
    console.error('Error signing with Google: ', error.message);
    Notiflix.Notify.failure('Error signing with Google: ' + error.message);
  }
}

export async function loginUserWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);

    Notiflix.Notify.success('User logged-in successfully!');
    console.log('User logged-in successfully: ', result.user);
    window.location.href = '/todoboard';
  } catch (error) {
    console.error('Error signing with Google: ', error.message);
    Notiflix.Notify.failure('Error signing with Google: ' + error.message);
  }
}

export async function updateUser() {}

export async function deleteUser() {}

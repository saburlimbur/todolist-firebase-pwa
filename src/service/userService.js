import { auth, database, googleProvider } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, sendEmailVerification } from 'firebase/auth';
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
    console.log('Gagal mengambil data user:', error);
  }
}

export async function createUserWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    localStorage.setItem('user', JSON.stringify(user));

    Notiflix.Notify.success('Yeay! Berhasil register pakai Google! 🎉');
    console.log('User berhasil register:', user);
  } catch (error) {
    console.error('Gagal register dengan Google:', error.message);
    Notiflix.Notify.failure('Ups! Gagal register pakai Google. Coba lagi ya! 🙏');
    throw error;
  }
}

export async function createUserWithEmail(email, password) {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    await sendEmailVerification(user);
    localStorage.setItem('user', JSON.stringify(user));

    Notiflix.Notify.success('Akun berhasil dibuat! Cek email buat verifikasi ya 📧');
    console.log('User berhasil dibuat:', user);
  } catch (error) {
    console.error('Gagal buat akun:', error.message);
    Notiflix.Notify.failure('Gagal buat akun! Pastikan email & password benar.');
    throw error;
  }
}

export async function loginUserWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    localStorage.setItem('user', JSON.stringify(user));

    Notiflix.Notify.success('Yeay! Berhasil login pakai Google! 🎉');
    console.log('User berhasil login:', user);
  } catch (error) {
    console.error('Gagal login dengan Google:', error.message);
    Notiflix.Notify.failure('Ups! Gagal login pakai Google. Coba lagi ya! 🙏');
  }
}

export async function loginUserWithEmail(email, password) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    const user = result.user;

    localStorage.setItem('user', JSON.stringify(user));

    Notiflix.Notify.success('Berhasil login! Selamat datang kembali! 🎉');
    console.log('User berhasil login:', user);
  } catch (error) {
    console.error('Gagal login dengan email:', error.message);
    // Notiflix.Notify.failure('Email atau password salah! Coba lagi ya.');
  }
}

export async function profileUser() {}
export async function updateUser() {}
export async function deleteUser() {}

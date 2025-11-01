import { db } from "./firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const postsCollection = collection(db, "posts");

export async function createPost(data: any) {
  return await addDoc(postsCollection, {
    ...data,
    createdAt: serverTimestamp(),
    views: 0,
  });
}

export async function getAllPosts() {
  const snap = await getDocs(postsCollection);
  return snap.docs.map((d) => ({ id: d.id, ...d.data() }));
}

export async function deletePostById(id: string) {
  return await deleteDoc(doc(db, "posts", id));
}

export async function updatePostById(id: string, data: any) {
  return await updateDoc(doc(db, "posts", id), data);
}

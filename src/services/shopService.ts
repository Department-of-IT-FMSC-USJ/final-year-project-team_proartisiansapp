import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";


export const saveShopProfile = async (
  userId: string,
  shopName: string,
  location: string,
  description: string,
  logoUrl: string = ""
) => {
  try {
    await setDoc(doc(db, "shops", userId), {
      shopName,
      location,
      description,
      logoUrl,
      createdAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error("Error saving shop profile:", error);
    throw error;
  }
};


export const getShopProfile = async (userId: string) => {
  try {
    const docRef = doc(db, "shops", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching shop profile:", error);
    throw error;
  }
};


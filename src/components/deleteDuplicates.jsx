import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase"; 
/**
 * Deletes duplicate documents in a Firestore collection.
 * @param {string} collectionName - The name of the Firestore collection to check.
 * @param {string[]} fieldsToCheck - Fields that determine duplicates.
 */
const deleteDuplicates = async (collectionName, fieldsToCheck) => {
  try {
    const querySnapshot = await getDocs(collection(db, "Doners"));

    const dataMap = new Map();
    const docsToDelete = [];

    querySnapshot.forEach((document) => {
      const data = document.data();
      const key = fieldsToCheck.map((field) => data[field]).join("_");
      if (dataMap.has(key)) {
        docsToDelete.push(document.ref);
      } else {
        dataMap.set(key, document.id);
      }
    });

    for (const docRef of docsToDelete) {
      await deleteDoc(docRef);
      console.log(`Deleted duplicate document: ${docRef.id}`);
    }

    console.log("Duplicate data deletion completed successfully.");
  } catch (error) {
    console.error("Error deleting duplicate data: ", error);
  }
};

export default deleteDuplicates;

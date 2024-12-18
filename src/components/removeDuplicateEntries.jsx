import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";

const removeDuplicateEntries = async (collectionName, uniqueField) => {
  try {
    // Step 1: Fetch all documents
    const querySnapshot = await getDocs(collection(db, "Doners"));
    const data = querySnapshot.docs.map((docSnapshot) => ({
      id: docSnapshot.id,
      ...docSnapshot.data(),
    }));

    // Step 2: Identify duplicates
    const seen = new Map();
    const duplicates = [];

    data.forEach((item) => {
      const fieldValue = item[uniqueField];
      if (seen.has(fieldValue)) {
        duplicates.push(item.id); // Mark duplicate
      } else {
        seen.set(fieldValue, true);
      }
    });

    // Step 3: Remove duplicates
    for (const duplicateId of duplicates) {
      await deleteDoc(doc(db, "Doners", duplicateId));
    }

    console.log(`Removed ${duplicates.length} duplicate entries.`);
    return { success: true, message: `Removed ${duplicates.length} duplicate entries.` };
  } catch (error) {
    console.error("Error removing duplicates:", error);
    return { success: false, message: "Error removing duplicates: " + error.message };
  }
};

export default removeDuplicateEntries;

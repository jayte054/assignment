import * as admin from "firebase-admin"
import { snapshotConstructor } from "firebase-functions/v1/firestore";
import { Data } from "../../model/data.model"
import { UserModel } from "../../model/userModel";
import { serviceAccount } from "../../serviceAccount";
import * as Busboy from 'busboy';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { bucket } from "../../app";
// import { bucket } from "firebase-functions/v1/storage";


export const saveData = async(data: Data): Promise<string> => {
    const db = admin.database();
    const ref = db.ref("data")

    try{
        const newRef = await ref.push(data)
        const id = newRef.key

        if(!id) {
            throw new Error("Failed to generate a unique key for data")
        }

        return id
    }catch(error:any){
        throw new Error("Error creating data" + error.message)
    }
}

export const getData = async(): Promise<string> => {
    const db = admin.database()
    const ref = db.ref("data")

    try{
        const snapShot = await ref.once("value")
        const data = snapShot.val()
        return data
    }catch(error: any){
        throw new Error("Error getting data" + error.message)
    }
}

export const getAllUsers = async(): Promise<{ id: string; email: string }[]> => {
    const db = admin.database()
    const ref = db.ref("users")

    try{
        const snapShot = await ref.once("value")
        const allUsers :  { id: string; email: string }[]  = []
        snapShot.forEach((childSnapShot) => {
            const user = childSnapShot.val() 
            if(user && user.email)
            allUsers.push({
                id: user.id, 
                email: user.email,
               
            })
        })
        console.log(allUsers)
        return allUsers
    }catch(error){
        throw new Error("failed to retrieve users from database")
    }
}

export const getEntriesByUserId = async (userId: string) => {
    try {
      const db = admin.firestore();
      const entriesRef = db.collection('entries'); // Replace 'entries' with your Firestore collection name
  
      // Query the entries collection to get documents where 'userId' field matches the provided userId
      const snapshot = await entriesRef.where('userId', '==', userId).get();
  
      // Extract and return the data from the snapshot
      const entries: admin.firestore.DocumentData[] = [];
      snapshot.forEach((doc) => {
        const entryData = doc.data();
        entries.push(entryData);
      });
  
      return entries;
    } catch (error) {
      console.error('Error getting entries:', error);
      throw new Error('Failed to fetch entries');
    }
  };

// export const updateImage = async (email: string, imageUrl: string) => {
//         const db = admin.firestore()
//     try {
//       // Find the data entry with the provided email in the database
//       const dataEntryRef = db.collection('data').doc(email);
//       const snapshot = await dataEntryRef.get();
  
//       // If the data entry exists, update the image URL
//       if (snapshot.exists) {
//         await dataEntryRef.update({ image: imageUrl });
//         return imageUrl;
//       } else {
//         throw new Error('Data entry not found');
//       }
//     } catch (error) {
//       throw new Error('Failed to update image in database');
//     }
//   };


// Function to upload an image to Firebase Storage
export const uploadImageToStorage = async (email: string, file: any) => {
    try {
      const imageFileName: any = Date.now() + '-' + file.originalname;
      const fileUpload: any = bucket.file(imageFileName) as any;
  
      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: file.mimetype,
        },
      });
  
      blobStream.on('error', (error: { message: string; }) => {
        throw new Error('Error uploading image to storage: ' + error.message);
      });
  
      blobStream.on('finish', () => {
        const imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        return imageUrl;
      });
  
      blobStream.end(file.buffer);
    } catch (error: any) {
      throw new Error('Failed to upload image to storage: ' + error.message);
    }
  };
  
// ...

export const updateImageUrlInFirestore = async (email: string, imageUrl: string): Promise<void> => {
    try {
      const userRef = admin.firestore().collection('users').where('email', '==', email);
      const userSnapshot = await userRef.get();
  
      if (userSnapshot.empty) {
        throw new Error('User not found with email: ' + email);
      }
  
      const userDoc = userSnapshot.docs[0];
      const userData = userDoc.data() as Data;
  
      await userDoc.ref.update({
        image: imageUrl,
      });
      
      // Return a resolved Promise to satisfy the Promise<void> return type
      return Promise.resolve();
    } catch (error: unknown) {
      throw new Error('Failed to update image URL in Firestore: ' + (error as Error).message);
    }
  };
  
  // ...
  
  

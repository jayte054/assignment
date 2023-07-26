import express, { Request, Response} from "express"
import { getAllUsers, getData, getEntriesByUserId, saveData,  } from "../config/services/dataService"
import { Data } from "../model/data.model"
import {v4 as uuid} from "uuid"
import * as dataServices from "../config/services/dataService"


export const getSavedData = async(req:Request, res: Response) => {
    console.log("get")
    const response = await getData()
    console.log(response + "lin1")
    try{
        console.log(res)
    return res.status(200).send({
        status: 200,
        data: [response]
    })

    }catch(error){
        res.status(500).send({
            status: 500,
            message: "failed to retrieve data"
        })
    }
}

export const createData = async(req: Request, res: Response) => {
    try{
        const dataArray: Data[] = req.body
        const newKeys: string[] = []

        for(const data of dataArray) {
            const newId = uuid()
            data.id = newId

        const percentage = (data.number_of_users/data.number_of_products) * 100
        data.percentage = parseInt(percentage.toFixed(2)) 
        const newKey = await saveData(data)
        newKeys.push(newKey);
        }
        res.status(201).send({
            status: 201,
            key: newKeys,
            data: dataArray
        })
        // return data
    }catch(error) {
        console.log(error)
        res.send({
            status: 500,
            message: "failed to save data"
        })
    }
}

//====== admin data retrieval from user =======

export const getUser = async(req: Request, res: Response) => {
    try{
    const allUsers = await getAllUsers()
    return  res.status(200).send({
            status: 200,
            message: "users fetched successfully",
            users: allUsers
        })
    }catch(error){
        res.status(404).send({
            status: 404,
            message: "unable to fetch users from database"
        })
    }
}


// const getEntryByUserId = async (req: Request, res: Response) => {
//     try{
//         const entries = await getEntriesByUserId(userId)
//         res.status(201).send({
//             status: 210,
//             message: "entries fetched successfully",
//             entries: entries
//         })
//     }catch(error) {
//         res.status(404).send({
//             status: 404,
//             message: "unable to fetch entries from database"
//         })
//     }
// }
//======admin upload image =========

// Controller function to handle image upload and update





export const handleImageUpload = async (req: Request, res: Response): Promise<any> => {
  try {
    // Check if a file is present in the request
    if (!req.file) {
      res.status(400).send({ error: 'No image file found in the request' });
      return;
    }

    // Get the user's email from the request body
    const email = req.body.email;

    // Upload the image to Firebase Storage and get the image URL
    const imageUrl: any = await dataServices.uploadImageToStorage(email, req.file);

    // Update the image URL in Firestore for the user
    await dataServices.updateImageUrlInFirestore(email, imageUrl);

    // Send a success response
    res.status(200).send({ imageUrl });
  } catch (error) {
    console.error('Error uploading image:', error);
    res.status(500).send({ error: 'Failed to upload image' });
  }
};









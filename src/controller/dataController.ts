import express, { Request, Response} from "express"
import { getAllUsers, getData, saveData } from "../config/services/dataService"
import { Data } from "../model/data.model"
import {v4 as uuid} from "uuid"


export const getSavedData = async(req:Request, res: Response) => {
    const response = await getData()
    try{
    return res.status(200).send({
        status: 200,
        data: response
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

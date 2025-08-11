import React, { useEffect } from 'react'
import axios from "axios"
import { serverUrl } from "../App"
import { useDispatch } from 'react-redux'
import { setUserdata } from '../redux/userSlice'

const getCurrentUser = () => {
    const dispatch = useDispatch()
    useEffect(()=> {
        const fetchUser = async () => {
            try {
                const result = await axios.get(serverUrl + "/api/user/getcurrentuser", {withCredentials:true})
                dispatch(setUserdata(result.data))
            }catch(error) {
                console.log(error)
                dispatch(setUserdata(null))
            }
        }
    },[])
}

export default getCurrentUser

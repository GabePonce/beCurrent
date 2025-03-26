import { create } from 'zustand'
import { db } from '../config/firebase'
import { doc, getDoc } from 'firebase/firestore'

/**
* userStore.js
* Date: 2025-03-24
* Description: 
* State management for the current active user
**/

export const useUserStore = create ((set)=>({
    currentUser: null,
    isLoading: true,
    fetchUserInfo: async (uId) => {
        if (!uId) return set({currentUser:null, isLoading:false})

        try {
            // grab the current user
            const docRef = doc(db, "users", uId)

            const docSnap = await getDoc(docRef)

            //set if a user is found
            if (docSnap.exists()){
                set({currentUser: docSnap.data(), isLoading: false})
            }else{
                set({currentUser:null, isLoading:false})
            }


        } catch (err) {
            // remove this later -- dev debugging
            console.log(err)
            return set({currentUser: null, isLoading:false})
        }
    }
}))
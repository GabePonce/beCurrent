/**
* hangoutStore.js
* Date: 2025-03-24
* Description: 
* State management for current selected hangout
**/

import { create } from 'zustand'
import { doc, getDoc} from "firebase/firestore"
import { db } from './firebase'
import { useUserStore } from './userStore'

export const useHangoutStore = create((set) => ({
    currentHangout: null,
    attendees: [],
    isOwner:false,
    fetchHangoutInfo: async (hId) => {

        const currentUser = useUserStore.getState().currentUser

        if (!hId) return set({currentHangout: null, attendees: [], isOwner:false,})
        
        try {
            const hangRef = doc(db,"hangouts", hId)

            const hangSnap = await getDoc(hangRef)
            
            const uArray = []

            if (hangSnap.exists()){

                // grabbing the current hangout
                const hangout = hangSnap.data()

                //grabbing the users attending each hagnout
                hangout.attendees.forEach(async (uId) => {
                    const uRef = doc(db,"users", uId)

                    const uSnap = await getDoc(uRef)

                    uArray.push(uSnap.data())
                });

                if (currentUser.id === hangout.ownerId){
                    set({currentHangout: hangout, attendees: uArray, isOwner: true})
                }else{
                    set({currentHangout: hangout, attendees: uArray, isOwner: false})
                }
            }else{
                return set({currentHangout: null, attendees: [], isOwner:false,})
            }
            
        } catch (err) {
            // remove this later -- dev debugging
            console.log(err)
            return set({currentHangout: null, attendees: [], isOwner:false,})
        }
        
    }

}))
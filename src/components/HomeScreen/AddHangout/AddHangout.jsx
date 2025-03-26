import { useState } from "react"
import db from '../../../config/firebase'
import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore"
import { nanoid } from "nanoid"
import { useUserStore } from "../../../stores/userStore"

const AddHangout = () => {

    // const [hangout, setHangout] = useState(null)
    const [creating, setCreating] = useState(false)

    const { currentUser } = useUserStore()

    const handleCreate = async (e) => {

        e.preventDefault()

        const formData = new FormData(e.target)

        try {

            let code = nanoid(6);

            const hangRef = collection(db, "hangouts")

            const q = query(hangRef, where("code", "==", code))

            let qSnap = await getDocs(q)


            while (!qSnap.empty){
                code = nanoid(6)

                qSnap = await getDocs(q)
            } 

            let image = ""

            switch (formData.imageChoice) {
                case 1:
                    image = "../../../assets/"
                    break;
                case 2:
                    image = "../../../assets/"
                    break
                case 3:
                    image = "../../../assets/"
                    break
                case 4:
                    image = "../../../assets/"
                    break
                case 5:
                    image = "../../../assets/"
                    break
                case 6:
                    image = "../../../assets/"
                    break
                default:
                    image = "../../../assets/bubAndNans.JPG"
                    break;
            }

            const newHangRef = doc(hangRef)

            const userHangRef = collection(db, "userHangouts")

            await setDoc(newHangRef, {
                name: formData.name,
                ownerId: currentUser.id,
                attendees: [currentUser.id],
                code: code,
                description: formData.description,
                address: formData.address,
                createdAt: Date.getDate(),
                expiresAt: Date.getDate() + formData.expires,
                items: [],
                image: image
            })

            await updateDoc(doc(userHangRef, currentUser.id),{
                hangouts: arrayUnion(
                    {
                        hangId: newHangRef.id
                    }
                )
            })
            

            
        }catch(err) {
            console.log(err)
        }
    }

    const handleAdd = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const hCode = formData.get("hCode")

        try {
            const hangRef = collection(db, "hangouts")

            const q = query(hangRef, where("code", "==", hCode))

            const qSnap = await getDocs(q)

            if (!qSnap.empty){
                const hangout = qSnap.docs[0].data()
                
                const userHangRef = collection(db, "userHangouts")

                try {
                    
                    await updateDoc(doc(userHangRef, currentUser.id), {
                        hangouts: arrayUnion({
                            hangId: hangout.id
                        })
                    })

                    await updateDoc(doc(hangRef, hangout.id), {
                        attendees: arrayUnion(currentUser.id)
                    })

                } catch (err) {
                    console.log(err)
                }
            }
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className="addHangout">
            <button onClick={setCreating(!creating)}>{ creating ? "Join Hangout" : "New Hangout"}</button>
            {creating ?
            <form onSubmit={handleAdd}>
                <input type="text" placeholder="Hangout Code" name="hCode" />
                <button> Add </button>
            </form> :
            <form onSubmit={handleCreate}>

            </form>
            }
        </div>
    )
}

export default AddHangout
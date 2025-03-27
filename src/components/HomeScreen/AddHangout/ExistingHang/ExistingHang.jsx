import { arrayUnion, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import './ExistingHang.css'
import { db } from '../../../../config/firebase'
import { useUserStore } from '../../../../stores/userStore'

const ExistingHang = () => {

    const { currentUser } = useUserStore()

    const handleAdd = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.target)

        const hCode = formData.get("hCode")

        try {
            const hangRef = collection(db, "hangouts")

            const q = query(hangRef, where("code", "==", hCode))

            const qSnap = await getDocs(q)

            
            
            if (!qSnap.empty){
                const hangout = qSnap.docs[0]

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
        <div>
        <form onSubmit={handleAdd}>
                    <input type="text" placeholder="Hangout Code" name="hCode" />
                    <button> Add </button>
            </form>
        </div>
    )
}

export default ExistingHang

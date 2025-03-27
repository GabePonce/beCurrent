import { nanoid } from 'nanoid'
import './NewHang.css'
import { arrayUnion, collection, doc, getDocs, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../../config/firebase'
import { useUserStore } from '../../../../stores/userStore'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

const NewHang = () => {

    const { currentUser } = useUserStore()
    const [date, setDate] = useState(new Date())

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

            const newHangRef = doc(hangRef)

            const userHangRef = collection(db, "userHangouts")

            console.log(formData.name)

            await setDoc(newHangRef, {
                name: formData.get("name"),
                ownerId: currentUser.id,
                attendees: [currentUser.id],
                code: code,
                description: formData.get("description") ,
                address: formData.get("address"),
                eventAt: date,
                expiresAt: date +7,
                items: [],
                image: formData.get("image")
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

    return (
        <div>
        <form onSubmit={handleCreate}>
                <label htmlFor='name'>Hangout Name:</label>
                <input id="name" type="text" name="name" required/>

                <label htmlFor="address">Address:</label>
                <input id='address' type="text" name="address" required/>

                <label htmlFor="description"></label>
                <textarea id="description" name="description">Description</textarea>

                <DatePicker selected={date} onChange={(date)=>{setDate(date)}}></DatePicker>
                <fieldset>
                    <label htmlFor="i1"><input type="radio" name="image" id="i1" value={"/src/assets/sumacs.jpg"}/><img className='bgImgChoice' src="/src/assets/sumacs.jpg"/></label>
                    <label htmlFor="i2"><input type="radio" name="image" id="i2" value={"/src/assets/sky.jpg"}/><img className='bgImgChoice' src="/src/assets/sky.jpg"/></label>
                    <label htmlFor="i3"><input type="radio" name="image" id="i3" value={"/src/assets/lake.jpg"}/><img  className='bgImgChoice'src="/src/assets/lake.jpg"/></label>
                    <label htmlFor="i4"><input type="radio" name="image" id="i4" value={"/src/assets/bubAndNans.JPG"}/><img className='bgImgChoice' src="/src/assets/bubAndNans.JPG"/></label>
                    <label htmlFor="i5"><input type="radio" name="image" id="i5" value={"/src/assets/fog.jpg"}/><img className='bgImgChoice' src="/src/assets/fog.jpg"/></label>
                    <label htmlFor="i6"><input type="radio" name="image" id="i6" value={"/src/assets/highway.PNG"}/><img className='bgImgChoice' src="/src/assets/highway.PNG"/></label>
                </fieldset>
                <button>Create Hangout</button>
            </form>
        </div>
    )
}

export default NewHang

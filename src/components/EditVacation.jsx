import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function EditVacation({ match, history }) {

    const user = useSelector(state => state.user)

    const [descrip, setdescrip] = useState("")
    const [dest, setdest] = useState("")
    const [pictureFile, setPictureFile] = useState()
    const [picture, setpicture] = useState("")
    const [dept, setdept] = useState("")
    const [arv, setarv] = useState("")
    const [price, setprice] = useState("")



    const handleSubmit = async e => {
        e.preventDefault()
        if (!descrip || !dest || !dept || !arv || !price) {
            alert("you left empty feilds , please fill them up")
        } else {
            try {
                if (pictureFile) {
                    const formData = new FormData()
                    formData.append("descrip", descrip)
                    formData.append("dest", dest)
                    formData.append("dept", dept)
                    formData.append("arv", arv)
                    formData.append("price", price)
                    formData.append("newpicture", pictureFile)
                    formData.append("oldpicture", picture)
                    const url = "/vacations/" + match.params.id;
                    let res = await fetch(url, {
                        method: "PUT",
                        headers: { "Authorization": localStorage.token },
                        body: formData
                    })
                    let data = await res.json()
                    console.log(data)
                    history.push("/")
                } else {
                    let res = await fetch("/vacations/" + match.params.id, {
                        method: "PUT",
                        headers: { "content-type": "application/json", "Authorization": localStorage.token },
                        body: JSON.stringify({ descrip, dest, dept, arv, price })
                    })
                    let data = await res.json()
                    console.log(data[0])
                    history.push("/")
                }
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        if (!user.login || user.role !== "admin") {
            history.push("/")
        }
        (async () => {
            let res = await fetch("/vacations/" + match.params.id)
            let data = await res.json()
            console.log(data[0])
            setdescrip(data[0].descrip)
            setdest(data[0].dest)
            setdept(data[0].dept)
            setarv(data[0].arv)
            setpicture(data[0].picture)
            setprice(data[0].price)
        })()
    }, [])

    return (
        <div className="container">
            <h1 className="header">Edit</h1>
            <Link className="btn btn-primary" to="/">back</Link>
            <form onSubmit={handleSubmit} >
                <div className="input-group container">
                    <input required className="form-control" value={dest} onChange={e => setdest(e.target.value)} type="text" placeholder="destination" />
                    <input required className="form-control" value={descrip} onChange={e => setdescrip(e.target.value)} type="text" placeholder="description" />
                    <input className="form-control" onChange={e => setPictureFile(e.target.files[0])} accept="image/*" type="file" />
                    <input required className="form-control" value={dept} onChange={e => setdept(e.target.value)} type="date" placeholder="departure" />
                    <input required className="form-control" value={arv} onChange={e => setarv(e.target.value)} type="date" placeholder="Return" />
                    <input required className="form-control" value={price} onChange={e => setprice(e.target.value)} type="number" placeholder="price" />
                    <button className="btn btn-primary">Edit vacation</button>
                </div>
            </form>
        </div>
    )
}

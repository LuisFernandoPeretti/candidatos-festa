import React, { Fragment, useState } from "react"

const EntradaCadastro = () => {

    const [ email, setEmail ] = useState("")
    const [ users, setUsers ] = useState([])

    const onSubmitForm = async (e) => {
        e.preventDefault();
        const res = await fetch(`http://localhost:5000/candidatos/?email=${email}`)
        const parseRes = await res.json()

        const body = { email }
        const response = fetch("http://localhost:5000/candidatos", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        console.log(body.email)
       
        try {
        
            if ( parseRes[0].email == body.email ){
                setUsers(parseRes)
            }else{
                
                //open modal
                setUsers(body.email)
            }
            
        } catch (error) {
            
        }
        
{/*}
            const body = { email }
            const response = await fetch("http://localhost:5000/candidatos", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            })
        console.log(response) */}

        
    }
    

    return (
        <Fragment>
            <div>
            <h1 className="text-center mt-5">
                Cadastro de Candidatos
            </h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="test"
                    placeholder="Email"
                    className="form-control"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                />
                <button
                    className="btn btn-success"
                >
                    Pesquisar
                </button>
            </form>
            <table className="table my-5">
                <thead>
                    <tr>
                        <th>
                            Email
                        </th>
                        <th>
                            Editar
                        </th>
                        <th>
                            Excluir
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map(user => (
                            <tr>
                                <td>
                                    {user.email}
                                </td>
                                <td>
                                    <button>Editar</button>
                                </td>
                                <td>
                                    <button>Excluir</button>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
            </div>
        </Fragment>
    )
}

export default EntradaCadastro
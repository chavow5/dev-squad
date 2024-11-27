export const getAllUsers = async () => {
    try {
        const res = await fetch ("http://localhost:3000/usuarios")
        if (res.ok) {
            const data = await res.json ()
            return data
        }
    }catch(error) {
        console.log(error)
    }
}
e
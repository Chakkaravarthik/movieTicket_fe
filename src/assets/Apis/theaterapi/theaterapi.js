const URL = import.meta.env.VITE_LOCAL_URI


const theaterget = async()=>{

    try{
        const res = await fetch(`${URL}/theater`)
        return await res.json();
    }catch(e){
        console.log(e);
    }
}


const theaterCreation = async(formdata) =>{

    console.log(`${URL}/theater`)

    try{
        const res = await fetch(`${URL}/theater`,{
            method:"post",
            body: JSON.stringify(formdata),
            headers: {
                "Content-Type": "application/json;charset=utf-8",
            }
        })
        return await res.json();
    }catch(e){
        console.log(e);
    }
}


export { theaterget, theaterCreation };
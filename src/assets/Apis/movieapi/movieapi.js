const URL = import.meta.env.VITE_LOCAL_URI


const movieget = async()=>{

    try{
        const res = await fetch(`${URL}/movie`)
        return await res.json();
    }catch(e){
        console.log(e);
    }
}

export {movieget};
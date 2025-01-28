const URL ='http://localhost:8000'


const movieget = async()=>{

    try{
        const res = await fetch(`${URL}/movie`)
        return await res.json();
    }catch(e){
        console.log(e);
    }
}

export {movieget};
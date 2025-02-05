const URL = import.meta.env.VITE_LOCAL_URI

const usersignup= async(userdata) =>{
    console.log(userdata);
   try{

    const res = await fetch(`${URL}/register`,{
        method:"post",
        body: JSON.stringify(userdata),
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        }
    })
    return await res.json();
   }catch(e){
    console.log(e);
   }
}

export default usersignup;
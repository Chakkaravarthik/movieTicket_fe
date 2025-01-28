const URL ='http://localhost:8000'

const userlogin= async(userdata) =>{
    console.log(userdata);
   try{

    const res = await fetch(`${URL}/login`,{
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

export default userlogin;
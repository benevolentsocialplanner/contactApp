
const login = async (email,password)=>{
    try{
        const res = await axios({
            method :'POST',
            url:'http://localhost:8000/api/signin',
            data: {
                email,
                encry_password: password
            },
            withCredentials: true
        });

        console.log(res);
    }catch(err){
        console.log(err.response.data)
    }
    
}

document.querySelector('.form').addEventListener('submit', e => {
    
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log(email,password)
    login(email,password)
})

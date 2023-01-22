
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

        if(res.data.status === 'success') {
            alert('logged in successfully');
            window.setTimeout(()=>{
                location.assign('/')
            },1500) // one and a half second
        }

        console.log(res);
    }catch(err){
        alert(err.response.data.message)
    }
    
}

document.querySelector('.form').addEventListener('submit', e => {
    
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email,password)
})

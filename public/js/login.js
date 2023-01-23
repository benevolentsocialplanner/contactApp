
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
const form = document.querySelector('.form');
if(form){
    form.addEventListener('submit', e => {
    
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
    
        login(email,password)
    })
}


const logout = async () => {
    try {
      const res = await axios({
        method: 'GET',
        url: 'http://localhost:8000/api/signout'
      });
      if(res.data.status === 'success') {
        location.reload(true);
        }
    } catch (err) {
      console.log(err.response);
      showAlert('error', 'Error logging out! Try again.');
    }
  };
const signOutElement = document.querySelector('#sign-out-btn');
if(signOutElement) signOutElement.addEventListener('click', logout);

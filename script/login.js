const signInBtn = document.getElementById("sign-in-btn");

const logIn = () => {
  const userName = document.getElementById("user-name").value;
  const password = document.getElementById("password").value;
  
    if(userName!=="admin" && password!=="admin123"){
    alert("Wrong Username and password");
    return;
  }
  if(userName==="admin" && password==="admin123"){
    window.location.assign('/home.html')
  }else{
    if(userName!=="admin"){
        alert("Wrong Username")
    }
    if(password!=="admin123"){
        alert("Wrong Password")
    }
    return;
  }
};

signinForm.addEventListener('submit', function (e) {
    e.preventDefault();
  
    const username = document.getElementById('signin-username').value;
    const password = document.getElementById('signin-password').value;
  
    const storedUser = JSON.parse(localStorage.getItem('fixhubUser'));
  
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      
      localStorage.setItem('loggedInUser', username); // ✅ Store username to show on homepage
      window.location.href = 'mainpage.html';           // ✅ Redirect to main page
    } else {
      alert('Invalid username or password');
    }
    
  });
  
{/* <script> */ }
// JavaScript to add 'active' class to the clicked link
document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav-link');
    links.forEach(link => {
        link.addEventListener('click', function () {
            links.forEach(lnk => lnk.classList.remove('active')); // Remove 'active' class from all links
            this.classList.add('active'); // Add 'active' class to the clicked link
        });
    });
});
// Flash messages for 5 seconds to display
document.addEventListener('DOMContentLoaded', function () {
    // Handle flush errors
    var flashErrors = document.getElementById('flashErrors');
    if (flashErrors) {
        setTimeout(function () {
            flashErrors.style.display = 'none';
        }, 5000);
    }

    // Handle flash success messages
    var flashSuccess = document.getElementById('flashSuccess');
    if (flashSuccess) {
        setTimeout(function () {
            flashSuccess.style.display = 'none';
        }, 5000);
    }
});

document.addEventListener('DOMContentLoaded', function () {
    var fullName = '{{session.user.name}}';
    var firstName = fullName.split(' ')[0]; // Split the name by space and take the first part
    document.getElementById('logoutLink').innerHTML = 'Logout (' + firstName + ')';
});
{/* </script> */ }

document.getElementById("appointform").addEventListener("submit",(e)=>{
    e.preventDefault()

  const firstName =  document.getElementById("name").value
  const lastName =  document.getElementById("last-name").value
  const email =  document.getElementById("email").value
  const phnumber =  document.getElementById("number").value
  const messege =  document.getElementById("messege").value
        axios.post("/appoint",{

            firstName:firstName,
            lastName:lastName,
            email:email,
            phnumber:phnumber,
            messege:messege
        })
.then((res)=>{console.log(res)})
.catch((e)=>{console.log(e)})



    
})

document.addEventListener("DOMContentLoaded",async(e)=>{

     axios.get("/appoitments")
    .then((res)=>{console.log(res)})
.catch((e)=>{console.log(e)})
})


// ScrollReveal({ 
//     reset: true,
//     distance: '80px',
//     duration: 2000,
//     delay: 200
//  });

//  ScrollReveal().reveal('.home-text h3, .slide-up', { origin: 'top' });
//  ScrollReveal().reveal(' .home-text h1, .slide-left', { origin: 'left' });

// const homeSection = document.getElementById("home");
// const homeText = document.querySelector(".home-text");
// const h3Element = document.querySelector(".home-text h3");
// const h1Element = document.querySelector(".home-text h1");
// const pElement = document.querySelector(".home-text p");
// const btnElement = document.querySelector(".home-text .btn");

// const scrollRevealOptions = {
//   reset: true,
//   distance: '80px',
//   duration: 3000,
//   delay: 200
// };

// ScrollReveal().reveal(homeText, scrollRevealOptions);
// ScrollReveal().reveal(h3Element, { origin: 'top', ...scrollRevealOptions });
// ScrollReveal().reveal(h1Element, { origin: 'left', ...scrollRevealOptions });
// ScrollReveal().reveal(pElement, { origin: 'bottom', ...scrollRevealOptions });
// ScrollReveal().reveal(btnElement, { origin: 'bottom', ...scrollRevealOptions });
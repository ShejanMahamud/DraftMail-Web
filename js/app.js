const displayedEmails = [];

const getEmail = async () => {
    const response = await fetch('https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=1');
    const data = await response.json();
    document.getElementById("mail").value = data[0];
    let emailCount = parseInt(document.getElementById("email-count").innerText);
    emailCount++;
    document.getElementById("email-count").innerText = emailCount;
   
}

const getMailBox = async (userId, domain) => {
    const res = await fetch(`https://www.1secmail.com/api/v1/?action=getMessages&login=${userId}&domain=${domain}`);
    const data = await res.json();

    data.forEach((mail)=>{
        if(data.length > 0){
            if(!displayedEmails.includes(mail.id)){
                const sender = mail.from.split("@");
                const mailSub = document.getElementById("mail-box") ;
                const div = document.createElement("div");
                div.setAttribute("id","mail-heading");
                div.innerHTML = `
                 <div
                 class="w-full flex items-center justify-between px-5 bg-[#f6f7f9] py-5"
               >
                 <div class="flex items-start flex-col">
                   <span class="text-xs">${sender[1]}</span>
                   <span class="font-normal text-[10px]">${mail.from}</span>
                 </div>
                 <span
                   >${mail.subject}</span
                 >
                 <button onclick="mailDetails(${mail.id})">
                   <i class="las la-angle-right text-2xl font-bold text-[#00c497]"></i>
                 </button>
               </div>
         
                 `
                 mailSub.appendChild(div);
                 document.getElementById("loading").classList.add("hidden");
                 displayedEmails.push(mail.id);
            }
            // clearInterval(intervalId);
        }else{
            console.log("No messages");
            
        }
    })
    
}
const reLoad = () => {
    window.location.reload();
}

function copyText() {
    let copyText = document.getElementById("mail");
    copyText.select();
    copyText.setSelectionRange(0, 99999); 
    navigator.clipboard.writeText(copyText.value);
}

const intervalId = setInterval(()=>{
    const mailSliced = document.getElementById("mail").value.split('@');
   getMailBox(mailSliced[0],mailSliced[1]);
},10000);



const mailDetails = async (id) => {

    const mailSliced = document.getElementById("mail").value.split('@');
    const res = await fetch (`https://www.1secmail.com/api/v1/?action=readMessage&login=${mailSliced[0]}&domain=${mailSliced[1]}&id=${id}`);
    const data = await res.json();
    const sender = data.from.split("@");
    document.getElementById("mail-heading").classList.add("hidden");
document.getElementById("first-head").classList.add("hidden");
document.getElementById("second-head").classList.remove("hidden");
    document.getElementById("mail-body").innerHTML = `
    <div class="w-full flex items-center justify-between py-1 px-5">
    <div class="flex flex-col gap-1">
      <h1 class="text-sm">${sender[1]}</h1>
      <span class="text-xs">${data.from}</span>
    </div>
    <div class="flex flex-col gap-1">
      <h1 class="text-sm">Date:</h1>
      <span class="text-xs">${data.date}</span>
    </div>
  </div>
  <hr
    class="border border-[#191919] border-opacity-5 w-[80%] mx-auto my-5"
  />
  <div class="flex items-center gap-2 px-2">
    <span class="font-medium text-sm">Subject: </span>
    <p class="text-xs px-2">${data.subject}</p>
  </div>
  <hr
    class="border border-[#191919] border-opacity-5 w-[80%] mx-auto my-5"
  />

  <div class="flex justify-center items-center">
    ${data.htmlBody}
  </div>
    `
}

const backBtn = () => {
    document.getElementById("mail-heading").classList.remove("hidden");
    document.getElementById("first-head").classList.remove("hidden");
    document.getElementById("second-head").classList.add("hidden");
    document.getElementById("mail-body").innerHTML = "";
}

const deleteBtn = () => {
    document.getElementById("mail-heading").classList.add("hidden");
    document.getElementById("first-head").classList.remove("hidden");
    document.getElementById("second-head").classList.add("hidden");
    document.getElementById("mail-body").innerHTML = "";
    document.getElementById("loading").classList.remove("hidden");
}

getEmail()


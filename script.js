if(!localStorage.getItem("users")){
let defaultUsers=[{username:"admin",password:"1234"}];
localStorage.setItem("users",JSON.stringify(defaultUsers));
}

let currentFine=0;
let returnRecord=null;


function login(){

let u=document.getElementById("username").value;
let p=document.getElementById("password").value;

let users=JSON.parse(localStorage.getItem("users"))||[];

let user=users.find(x=>x.username===u && x.password===p);

if(user){

document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="block";

}else{

document.getElementById("loginMsg").innerText="Invalid Login";

}

}


function showSection(id){

let sections=document.querySelectorAll(".section");

sections.forEach(s=>s.style.display="none");

document.getElementById(id).style.display="block";

}


function addUser(){

let u=document.getElementById("newUser").value;
let p=document.getElementById("newPass").value;

let users=JSON.parse(localStorage.getItem("users"))||[];

users.push({username:u,password:p});

localStorage.setItem("users",JSON.stringify(users));

alert("User Added");

}


function addBook(){

let name=document.getElementById("bookName").value;
let author=document.getElementById("authorName").value;

let books=JSON.parse(localStorage.getItem("books"))||[];

books.push({name:name,author:author,available:true});

localStorage.setItem("books",JSON.stringify(books));

document.getElementById("addBookMsg").innerText="Book Added";

}


function addStudent(){

let name=document.getElementById("studentName").value;
let membership=document.getElementById("membershipType").value;

let students=JSON.parse(localStorage.getItem("students"))||[];

students.push({name:name,membership:membership});

localStorage.setItem("students",JSON.stringify(students));

document.getElementById("studentMsg").innerText="Student Added";

}


function updateMembership(){

let name=document.getElementById("updateStudentName").value;
let newM=document.getElementById("newMembership").value;

let students=JSON.parse(localStorage.getItem("students"))||[];

let s=students.find(x=>x.name===name);

if(!s){

document.getElementById("updateMsg").innerText="Student not found";
return;

}

s.membership=newM;

localStorage.setItem("students",JSON.stringify(students));

document.getElementById("updateMsg").innerText="Membership Updated";

}


function searchBook(){

let search=document.getElementById("searchInput").value.toLowerCase();

let books=JSON.parse(localStorage.getItem("books"))||[];

let table=document.getElementById("bookResults");

table.innerHTML="";

books.forEach(b=>{

if(b.name.toLowerCase().includes(search)){

table.innerHTML+=`
<tr>
<td>${b.name}</td>
<td>${b.author}</td>
<td>${b.available?"Yes":"No"}</td>
</tr>
`;

}

});

}


function issueBook(){

let bookName=document.getElementById("issueBookName").value;
let student=document.getElementById("issueStudentName").value;

let books=JSON.parse(localStorage.getItem("books"))||[];

let book=books.find(b=>b.name===bookName);

if(!book){
alert("Book not found");
return;
}

if(!book.available){
alert("Book not available");
return;
}

book.available=false;

localStorage.setItem("books",JSON.stringify(books));

let issueDate=new Date();
let returnDate=new Date();

returnDate.setDate(issueDate.getDate()+15);

let issued=JSON.parse(localStorage.getItem("issued"))||[];

issued.push({book:bookName,student:student,returnDate:returnDate});

localStorage.setItem("issued",JSON.stringify(issued));

document.getElementById("issueMsg").innerText=
"Book issued. Return before "+returnDate.toDateString();

}


function checkFine(){

let bookName=document.getElementById("returnBookName").value;

let issued=JSON.parse(localStorage.getItem("issued"))||[];

let record=issued.find(b=>b.book===bookName);

if(!record){
document.getElementById("returnMsg").innerText="Book not found";
return;
}

returnRecord=record;

let dueDate=new Date(record.returnDate);
let today=new Date();

currentFine=0;

if(today>dueDate){

let days=Math.floor((today-dueDate)/(1000*60*60*24));

currentFine=days*10;

}

if(currentFine>0){

document.getElementById("returnMsg").innerText="Fine ₹"+currentFine;

}else{

document.getElementById("returnMsg").innerText="No Fine";

}

}


function confirmReturn(){

if(currentFine>0){

let paid=document.getElementById("finePaid").checked;

if(!paid){
alert("Please pay fine first");
return;
}

}

let issued=JSON.parse(localStorage.getItem("issued"))||[];

issued=issued.filter(b=>b.book!==returnRecord.book);

localStorage.setItem("issued",JSON.stringify(issued));

let books=JSON.parse(localStorage.getItem("books"))||[];

let book=books.find(b=>b.name===returnRecord.book);

if(book){
book.available=true;
}

localStorage.setItem("books",JSON.stringify(books));

document.getElementById("returnMsg").innerText="Book Returned";

}

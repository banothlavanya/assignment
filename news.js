const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);
function myFunction(category) {
 // alert("I am an alert box!");
var request1 = new XMLHttpRequest();
request1.open('GET', 'data1.json', true);
request1.onload = function  () {

  // Begin accessing JSON data here
  var Courses = JSON.parse(this.response);
  if (request1.status >= 200 && request1.status < 400){
   container.querySelectorAll('*').forEach(n => n.remove());
    
      Courses.data.forEach(course => {
       if(category == "All" || course.category == category) {
      
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      
      const dot = document.createElement('span');
      dot.setAttribute('class', 'dot');
     

      const h1 = document.createElement('h1');
      h1.textContent = course.title
;

      const h6 = document.createElement('h6');
      course.textContent = course.instructor_name.substring(0, 300);
      h6.textContent = `${course.instructor_name}`;

      const p = document.createElement('p');
      course.description = course.description.substring(1, 300);
      p.textContent = `${course.description}`;
      
      const calendar = document.createElement('img');
      calendar.src = 'calendar.png';
      
      container.appendChild(card);
      card.appendChild(dot);
      card.appendChild(h1);
      card.appendChild(h6);
      card.appendChild(p);
      card.appendChild(calendar);

   }
 });

  }
 else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
};
request1.send();
}
var request = new XMLHttpRequest();
request.open('GET', 'newdata.json', true);
request.onload = function Retrive () {

  // Begin accessing JSON data here
  var myObj = JSON.parse(this.response);
  var x=' ';
  if (request.status >= 200 && request.status < 400) {
     for (i in myObj.Radio){
         x += '<br>'+'<label><input type="radio" name="Category" onclick="myFunction(\'' + myObj.Radio[i].category+'\')" value="' + myObj.Radio[i].category +' "/>'+ myObj.Radio[i].category +'</label> '+ "<br>";
      }


document.getElementById("demo").innerHTML = x;
}
};
request.send();
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function accesingValues() {
  if (this.readyState == 4 && this.status == 200) {
    var courses = JSON.parse(this.responseText);
    var y=' ';
    for (i in courses.data){
         
        
          y += "<h6>"+ courses.data[i].category +"</h6>";
         
  }
  document.getElementById("clk").innerHTML = y;
   
  } 

};
xmlhttp.open("GET", "data1.json", true);
xmlhttp.send();






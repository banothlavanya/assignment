const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(logo);
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
     
     // const card1 = document.getElementById('circle');
      
      const dot = document.createElement('span');
      dot.setAttribute('class', 'dot');
       
     

      const h1 = document.createElement('h1');
      h1.textContent = course.title
;

      const h6 = document.createElement('h6');
      course.textContent = course.instructor_name.substring(0, 300);
      h6.textContent = `${course.instructor_name}`;
      
      const info = document.createElement('img');
      info.src = 'info.svg'; 

      const p = document.createElement('p');
      course.description = course.description.substring(1, 300);
      p.textContent = `${course.description}`;
      
      const calendar = document.createElement('img');
      calendar.src = 'calendar.png';
      
      const h5 = document.createElement('h5');
      course.textContent = course.title1.substring(2, 300);
      h5.textContent = `${course.title1}`;

      const h51 = document.createElement('h51');
      course.textContent = course.start_date.substring(3, 300);
      h51.textContent = `${course.start_date}`;

      const h52 = document.createElement('h52');
      course.textContent = course.end_date.substring(4, 300);
      h52.textContent = `${course.end_date}`;

      const h53 = document.createElement('h53');
      course.textContent = course.course_duration.substring(5, 300);
      h53.textContent = `${course.course_duration}`;
    
      const h54 = document.createElement('h54');
      course.textContent = course.estimated_workload.substring(6, 300);
      h54.textContent = `${course.estimated_workload}`;
      
      container.appendChild(card);
      card.appendChild(dot);
      card.appendChild(h1);
      card.appendChild(h6);
      card.appendChild(info);
      card.appendChild(p);
      card.appendChild(calendar);
      card.appendChild(h5);
      card.appendChild(h51);
      card.appendChild(h52);
      card.appendChild(h53);
      card.appendChild(h54);

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
 // document.getElementById("clk").innerHTML = y;
   
  } 

};
xmlhttp.open("GET", "data1.json", true);
xmlhttp.send();






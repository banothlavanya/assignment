const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(logo);
app.appendChild(container);
var totalCategories = 0;
var request = new XMLHttpRequest();
request.open('GET', 'newdata.json', true);
request.onload = function Retrive () {
  // Begin accessing JSON data here
  var myObj = JSON.parse(this.response);
  var x=' ';
  if (request.status >= 200 && request.status < 400) {
    for (i in myObj.Radio){
      x += '<br>'+'<label><input type="radio" name="Category" id = "cat'+ totalCategories +'" onclick="searchbar()" value="' + myObj.Radio[i].category +'"/>'+ myObj.Radio[i].category +'</label> '+ "<br>";
      totalCategories++;
    }
    document.getElementById("demo").innerHTML = x;
  }
};
request.send();

function searchbar() {
  var searchQuery = document.getElementById("myInput").value;
  var category = "All";
  for(var i = 0; i < totalCategories; i++)
    if(document.getElementById("cat"+i).checked) {
      category = document.getElementById("cat"+i).value;
    }

  console.log("searchQuery = " + searchQuery);
  console.log("category is = " + category);

  var request1 = new XMLHttpRequest();
  request1.open('GET', 'data1.json', true);
  request1.onload = function  () {
    // Begin accessing JSON data here
    var Courses = JSON.parse(this.response);
    if (request1.status >= 200 && request1.status < 400){
      container.querySelectorAll('*').forEach(n => n.remove());
      Courses.data.forEach(course => {
        var instructor_name_array = course.instructor_name.split(" ");
        var title_array = course.title.split(" ");
        if((instructor_name_array.includes(searchQuery) || title_array.includes(searchQuery) || searchQuery == "")
        && (category == "All" || course.category == category)) {
          const card = document.createElement('div');
          card.setAttribute('class', 'card');
         
          const dot = document.createElement('span');
          dot.setAttribute('class', 'dot');

          const h1 = document.createElement('h1');
          h1.textContent = course.title;

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
      errorMessage.textContent = "Gah, it's not working!";
      app.appendChild(errorMessage);
    }
  };
  request1.send();
}

// var xmlhttp = new XMLHttpRequest();
// xmlhttp.onreadystatechange = function accesingValues() {
//   if (this.readyState == 4 && this.status == 200) {
//     var courses = JSON.parse(this.responseText);
//     var y=' ';
//     var z=' ';
//     for (i in courses.data){
//       y +=  courses.data[i].title ;  
//     }
//     document.getElementById("clk").innerHTML = y;
//     z+='<input type="search" name="Category" onkeyup="searchbar(\'' + y+'\')" value="' + y + '"placeholder="filter "/>'+ "<br>";
//     document.getElementById("clk").innerHTML = z;
//   }
// };
// xmlhttp.open("GET", "u1.json", true);
// xmlhttp.send();

/*function searchbar(title)
{
var xmlht = new XMLHttpRequest();
xmlht.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    var courses = JSON.parse(this.responseText);

       var results = [];
     //  var searchField = "title";
      /// var searchVal = y;
       for (var i=0 ; i < courses.data.length ; i++)
       {
          if (title==courses.data[i].title) {
              results.push(courses.data[i]);
               
         }
}

}
};
xmlht.open("GET", "u1.json", true);
xmlht.send();
}*/

function weeksBetween(d1, d2) {
    return Math.round((d2 - d1) / (7 * 24 * 60 * 60 * 1000));
}
const app = document.getElementById('root');

const container = document.createElement('div');
container.setAttribute('class', 'container');

//app.appendChild(logo);
app.appendChild(container);
var totalCategories = 0;

var request = new XMLHttpRequest();
request.open('GET', 'all_categories.json', true);
request.onload = function Retrive () {
  // Begin accessing JSON data here
  var myObj = JSON.parse(this.response);
 
  var x=' ';
  if (request.status >= 200 && request.status < 400) {
   
    var a= eval(myObj.payload);
    a.unshift("All");
    console.log(a);
    for (i in a){
     console.log(a[i]);
      x += '<br>'+'<label><input type="radio" name="Category" id = "cat'+ totalCategories +'" onclick="searchbar()" value="' + a[i]+'"/>'+ a[i]+'</label> '+ "<br>";
      totalCategories++;
    }
    console.log(myObj.payload);
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
  request1.open('GET', 'all_courses.json', true);
  request1.onload = function  () {
    var openCourses = 0;  
    // Begin accessing JSON data here
    var Courses = JSON.parse(this.response);
    if (request1.status >= 200 && request1.status < 400){
      container.querySelectorAll('*').forEach(n => n.remove());
      Courses.payload = eval(Courses.payload);
      Courses.payload.forEach(course => {
        if((course.description.toLowerCase().includes(searchQuery.toLowerCase())||
          course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.instructor_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.start_date.toLowerCase().includes(searchQuery.toLowerCase())||
          course.end_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
          course.estimated_workload.toLowerCase().includes(searchQuery.toLowerCase()) ||
          searchQuery == "")
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
         
          var today = new Date();
          var dd = String(today.getDate()).padStart(2, '0');
          var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
          var yyyy = today.getFullYear();

          //today = dd + '/' + mm + '/' + yyyy;
          //console.log(String(today))

          var startdate=course.start_date.split("-");
          var enddate=course.end_date.split("-");
          console.log(parseInt(startdate[2]))
          console.log(parseInt(enddate[2]))
         
          var start_date = new Date(parseInt(startdate[0]),(parseInt(startdate[1]))-1,parseInt(startdate[2]));
          var end_date = new Date(parseInt(enddate[0]),(parseInt(enddate[1]))-1,parseInt(enddate[2]));
          console.log(String(end_date))
          console.log(String(start_date))
          //console.log(String(today))
         
          const h5 = document.createElement('h5');
          //course.textContent = course.title1.substring(2, 300);
          console.log(today.getTime() > end_date.getTime())
          if(today.getTime() < start_date.getTime())
          {
            h5.textContent = 'Pre-registration';
            openCourses++;
          }

          else if(today.getTime()>start_date.getTime() && today.getTime()< end_date.getTime())
          {
            h5.textContent = 'Course Ongoing';
         
          }

          else if(today.getTime() > end_date.getTime())
          {
            h5.textContent = 'Course completed';
         
          }
         
         
          const h51 = document.createElement('h51');
          course.textContent = course.start_date.substring(3, 300);
          h51.textContent = `${course.start_date}`;

          const h52 = document.createElement('h52');
          course.textContent = course.end_date.substring(4, 300);
          h52.textContent = `${course.end_date}`;

          const h53 = document.createElement('h53');
          //course.textContent = course.course_duration.substring(5, 300);
          h53.textContent = weeksBetween(start_date, end_date).toString() + " weeks, ";
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
      document.getElementById("app").innerHTML = openCourses.toString() + " courses open for registration";
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



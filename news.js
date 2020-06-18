const app = document.getElementById('root');

const logo = document.createElement('img');
logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'newsample.json', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(course => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');
      
      const dot = document.createElement('span');
      dot.setAttribute('class', 'dot');
     

      const h1 = document.createElement('h1');
      h1.textContent = course.title;

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

    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = `Gah, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

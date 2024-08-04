let membersDiv = document.getElementById("members");

let row = true;
fetch('/assets/members.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    const members = data.members;
    let html = '';

    // Iterate over each member
    for(let i = 0; i < members.length; i++){
      // Generate HTML for each member 
      if(i % 4 === 0) {
        html += `
    <div class="row">`;
        row=true
      }

      html += `

        <div class="col-lg-3 col-md-6 col-sm-12">
          <div class="member-card">
            <div class="member-image">`;
              // <img src="${members[i].image}" alt="${members[i].name}">
              // <div class="icons">`;
      if (members[i].image) { // Check if the image URL exists
          html += `<img src="${members[i].image}" alt="${members[i].name}">
          <div class="icons">`;
      } else {
          html += `<img src="images/headshots/empty_headshot.webp" alt="${members[i].name}">
          <div class="icons">`;
      }

             
      if (members[i].github) { // Check if the Github URL exists
          html += `<a href="${members[i].github}"><i class="bi bi-github"></i></a>`;
      }
      
      html += `
      <a href="${members[i].linkedin}"><i class="bi bi-linkedin"></i></a>
              </div>
            </div>
            <div class="member-info">
              <h4 class="member-name">${members[i].name}</h4>
              <p class="member-title">${members[i].title}</p>
            </div>
          </div>
        </div>`;

        if((i+1) % 4 == 0 && i != 0 && row) {
            html += '</div>';
            row = false;
        }
    }


    html += '</div>';

    // Add the generated HTML to the document
    document.getElementById('members').innerHTML = html;
  });





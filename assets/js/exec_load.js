let execDiv = document.getElementById('execDiv');

fetch('/assets/members.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const execMembers = data.members;
        let html = '';

        for (let i = 0; i < execMembers.length; i++){
            if (execMembers[i].exec == true) {
                linkedin_link = execMembers[i].linkedin;
                title = execMembers[i].title;
                headshot = execMembers[i].image ? execMembers[i].image : "images/Headshots/placeholder.png";
                exec_name = execMembers[i].name;

                html += `
                <div class="container profile">
                    <div class="to-linkedin">
                        <a href="${linkedin_link}" target="_blank"><img class="profile"
                            src="${headshot}" alt="${exec_name}" height="100px"></a>
                        <a href="${linkedin_link}" target="_blank"><ion-icon name="logo-linkedin"
                            class="linkedin-icon" style="font-size: 30px; color: var(--primary-dark)"></ion-icon></a>
                    </div>
                    <div class="headshot-text">${exec_name}</div>
                    <div class="role">${title}<br><br></div>
                </div>
                `
            }

        }

        execDiv.innerHTML = html;
    })
document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('pointsChart').getContext('2d');
    var pointsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Alumni Tailgate', 
          'Assisting with interviews', 
          'Big Brother Mentor', 
          'Brother Interviews', 
          'BUSIK Letters', 
          'Chapter Attendance', 
          'Domingos', 
          'Exec Member', 
          'Family Hangouts', 
          'Family Head', 
          'Form Completions', 
          'Forms', 
          'Hosting Family Initiation', 
          'Hosting Official Initiation', 
          'Initiation So-Bro', 
          'Perfect Attendance', 
          'Professional Headshot', 
          'Recruitment Tabling', 
          'Rush Attendance', 
          'Service Event Attendance', 
          'Sobro', 
          'So-Bro Driving', 
          'Wellness Week', 
          'Zeta Chats'
          
        ],
        datasets: [{
          label: 'Points Distribution',
          data: [
            1, // Alumni Tailgate
            1, // Assiting with interviews
            1, // Big Brother Mentor
            1, // Brother Interviews
            1, // BUSIK Letters
            1, // Chapter Attendance
            1, // Domingos
            5, // Exec Member
            3, // Family Hangouts
            3, // Family Head
            1, // Form Completions
            1, // Forms
            1, // Hosting Family Initiation
            1, // Hosting Official Initiation
            1, // Initiation So-Bro
            1, // Perfect Attendance
            1, // Professional Headshot
            2, // Recruitment Tabling
            2, // Rush Attendance
            1, // Service Event Attendance
            1, // Sobro
            4, // So-Bro Driving
            1, // Wellness Week
            2  // Zeta Chats
          ],
          backgroundColor: [
            '#FF6384', // Alumni Tailgate
            '#36A2EB', // Assiting with interviews
            '#FFCE56', // Big Brother Mentor
            '#4BC0C0', // Brother Interviews
            '#9966FF', // BUSIK Letters
            '#FF9F40', // Chapter Attendance
            '#C9CBCF', // Domingos
            '#E7E9ED', // Exec Member
            '#B3B3CC', // Family Hangouts
            '#8AD7E4', // Family Head
            '#FFA07A', // Form Completions
            '#D2B48C', // Forms
            '#98FB98', // Hosting Family Initiation
            '#AFEEEE', // Hosting Official Initiation
            '#9370DB', // Initiation So-Bro
            '#FFD700', // Perfect Attendance
            '#FF6347', // Professional Headshot
            '#6B8E23', // Recruitment Tabling
            '#D2691E', // Rush Attendance
            '#BC8F8F', // Service Event Attendance
            '#66CDAA', // Sobro
            '#8FBC8F', // So-Bro Driving
            '#48D1CC', // Wellness Week
            '#C71585'  // Zeta Chats
          ]
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  
    // Fetch and populate user data (mock data for now)
    var mockData = {
      firstname: 'Ali',
      lastname: 'Haroon',
      username: 'alha3308',
      major: 'Business',
      year: 'Junior',
      total_points: 50,
      needed_points: 52,
      points: {
        alumniTailgate: 10,
        assistingWithInterviews: 5,
        bigBrotherMentor: 10,
        brotherInterviews: 5,
        busikLetters: 5,
        chapterAttendance: 3,
        domingos: 3,
        execMember: 4,
        familyHangouts: 2,
        familyHead: 1,
        formCompletions: 1,
        forms: 1,
        hostingFamilyInitiation: 1,
        hostingOfficialInitiation: 1,
        initiationSoBro: 0,
        perfectAttendance: 3,
        professionalHeadshot: 2,
        recruitmentTabling: 1,
        rushAttendance: 1,
        serviceEventAttendance: 1,
        sobro: 1,
        soBroDriving: 0,
        wellnessWeek: 1,
        zetaChats: 1
      }
    };
    
  
    // Update profile information
    document.getElementById('ffirstname').value = mockData.firstname;
    document.getElementById('flastname').value = mockData.lastname;
    document.getElementById('fusername').value = mockData.username;
    document.getElementById('fmajor').value = mockData.major;
    document.getElementById('fyear').value = mockData.year;
    document.getElementById('profile-fullname').textContent = mockData.firstname + ' ' + mockData.lastname;
    document.getElementById('profile-year').textContent = mockData.year;
  
    // Update points
    document.getElementById('total-points').textContent = mockData.total_points;
    document.getElementById('needed-points').textContent = mockData.needed_points;
    document.getElementById('bi-points').textContent = mockData.points.bi;
    document.getElementById('ra-points').textContent = mockData.points.ra;
    document.getElementById('ca-points').textContent = mockData.points.ca;
    document.getElementById('da-points').textContent = mockData.points.da;
    document.getElementById('ip-points').textContent = mockData.points.ip;
    document.getElementById('bl-points').textContent = mockData.points.bl;
    document.getElementById('s-points').textContent = mockData.points.s;
    document.getElementById('fc-points').textContent = mockData.points.fc;
    document.getElementById('ec1-points').textContent = mockData.points.ec1;
    document.getElementById('ec2-points').textContent = mockData.points.ec2;
    document.getElementById('ec3-points').textContent = mockData.points.ec3;
    document.getElementById('ec4-points').textContent = mockData.points.ec4;
    document.getElementById('ec5-points').textContent = mockData.points.ec5;
  
    // Update chart data
    pointsChart.data.datasets[0].data = [
      mockData.points.alumniTailgate,
      mockData.points.assistingWithInterviews,
      mockData.points.bigBrotherMentor,
      mockData.points.brotherInterviews,
      mockData.points.busikLetters,
      mockData.points.chapterAttendance,
      mockData.points.domingos,
      mockData.points.execMember,
      mockData.points.familyHangouts,
      mockData.points.familyHead,
      mockData.points.formCompletions,
      mockData.points.forms,
      mockData.points.hostingFamilyInitiation,
      mockData.points.hostingOfficialInitiation,
      mockData.points.initiationSoBro,
      mockData.points.perfectAttendance,
      mockData.points.professionalHeadshot,
      mockData.points.recruitmentTabling,
      mockData.points.rushAttendance,
      mockData.points.serviceEventAttendance,
      mockData.points.sobro,
      mockData.points.soBroDriving,
      mockData.points.wellnessWeek,
      mockData.points.zetaChats
    ];
    pointsChart.update();
    
  });
  
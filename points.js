document.addEventListener('DOMContentLoaded', function() {
    var ctx = document.getElementById('pointsChart').getContext('2d');
    var pointsChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: [
          'Brother Interviews', 
          'Rush Attendance', 
          'Chapter Attendance', 
          'Domingo Attendance', 
          'Interview Participation', 
          'BUSIK Letters', 
          'Sobro', 
          'Form Completions', 
          'Extra Category 1', 
          'Extra Category 2', 
          'Extra Category 3', 
          'Extra Category 4', 
          'Extra Category 5'
        ],
        datasets: [{
          label: 'Points Distribution',
          data: [
            0, // Brother Interviews
            0, // Rush Attendance
            0, // Chapter Attendance
            0, // Domingo Attendance
            0, // Interview Participation
            0, // BUSIK Letters
            0, // Sobro
            0, // Form Completions
            0, // Extra Category 1
            0, // Extra Category 2
            0, // Extra Category 3
            0, // Extra Category 4
            0  // Extra Category 5
          ],
          backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384',
            '#36A2EB',
            '#FFCE56',
            '#FF6384'
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
        bi: 10,
        ra: 5,
        ca: 10,
        da: 5,
        ip: 5,
        bl: 3,
        s: 3,
        fc: 4,
        ec1: 2,
        ec2: 1,
        ec3: 1,
        ec4: 1,
        ec5: 0
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
      mockData.points.bi,
      mockData.points.ra,
      mockData.points.ca,
      mockData.points.da,
      mockData.points.ip,
      mockData.points.bl,
      mockData.points.s,
      mockData.points.fc,
      mockData.points.ec1,
      mockData.points.ec2,
      mockData.points.ec3,
      mockData.points.ec4,
      mockData.points.ec5
    ];
    pointsChart.update();
  });
  
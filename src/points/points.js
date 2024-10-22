// document.addEventListener('DOMContentLoaded', function() {
//     fetch('/auth/user', {
//         method: 'GET',
//         headers: { 'Content-Type': 'application/json' },
//         credentials: 'include'
//     })
//     .then(response => response.json())
//     .then(user => {
//         document.getElementById('profile-fullname').textContent = `${user.firstname} ${user.lastname}`;
//         document.getElementById('profile-year').textContent = user.year || 'N/A';
//         document.getElementById('total-points').textContent = user.total_points;
//         document.getElementById('needed-points').textContent = user.needed_points;

//         const pointsChartData = Object.values(user.points_json || {});
//         pointsChart.data.datasets[0].data = pointsChartData;
//         pointsChart.update();
//     })
//     .catch(error => console.error('Error fetching user data:', error));
// });
const apiUrl = 'https://akpsi-portal.herokuapp.com';

document.addEventListener('DOMContentLoaded', function() {
    fetch(`${apiUrl}/auth/user`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
    })
    .then(response => response.json())
    .then(user => {
        document.getElementById('profile-fullname').textContent = `${user.firstname} ${user.lastname}`;
        document.getElementById('profile-year').textContent = user.year || 'N/A';
        document.getElementById('total-points').textContent = user.totalPoints;
        document.getElementById('needed-points').textContent = user.needed_points;
    })
    .catch(error => console.error('Error fetching user data:', error));
});

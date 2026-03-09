const baseUrl = 'http://localhost:3000';

async function getRooms() {
    const response = await fetch(`${baseUrl}/api/rooms`);
    const rooms = await response.json();
    return rooms;
}

console.log('Fetching rooms...');
const rooms = await getRooms();

rooms.forEach(element => {
    const roomDiv = document.createElement('div');
    roomDiv.classList.add('room');
    roomDiv.innerHTML = `
        <h2>${element.roomNumber}</h2>
        <p>Capacity: ${element.capacity}</p>
        <p>Type: ${element.type}</p>
    `;
    document.getElementById('data').appendChild(roomDiv);
});
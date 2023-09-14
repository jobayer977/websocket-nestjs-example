const socket = io('http://localhost:3000');
const container = document.getElementById('messagesContainer');
const messageInput = document.getElementById('messageInput');
const nameInput = document.getElementById('nameInput');

socket.on('connect', function () {
	console.log('Connected');
});

socket.on('disconnect', function () {
	console.log('Disconnected');
});

socket.on('receiveMessage', function (data) {
	const newMessage = document.createElement('div');
	newMessage.innerHTML = `<span class="sender">${data?.name}:</span> <span class="timestamp">[${data?.time}]</span> <p>${data.message}</p>`;
	container.appendChild(newMessage);
	container.scrollTop = container.scrollHeight;
});

function sendMessage() {
	const message = messageInput.value;
	const name = nameInput.value;
	container.scrollTop = container.scrollHeight;

	socket.emit('sendMessage', {
		message,
		time: getTime(),
		name,
	});
}

function getTime() {
	const date = new Date();
	return date.toLocaleTimeString([], {
		hour: 'numeric',
		minute: '2-digit',
		hour12: true,
	});
}

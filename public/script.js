const socket = io('http://localhost:3000')
const messageContainer = document.getElementById('message-container')
const roomContainer = document.getElementById('room-container')
const messageForm = document.getElementById('send-container')
const messageInput = document.getElementById('message-input')

if ( messageForm != null ) {
    const name = prompt('What is your name?')
    appendMessage('You joined')
    socket.emit('new-user', roomName, name)

    messageForm.addEventListener('submit', e => {
        e.preventDefault()
        const message = messageInput.value
        appendMessage(`You: ${message}`)
        socket.emit('(send-chat-message', roomName, message)
        messageInput.value = ''
    })
}

socket.on('room-created', room => {
    const roomElement = document.getElementById('div')
    roomElement.listentext = room
    const roomLink = document.getElement('a')
    roomLink.href = `/${room}`
    roomLink.innerText = 'join'
    roomContainer.append(roomElement)
    roomContainer.append(roomLink)

})

socket.on('chat-message', data => {
   appendMessage(`${data.name}: ${data.message}`)
}) 

socket.on('user-connected', name => {
   appendMessage(`${name} connected`)
}) 

socket.on('user-disconnected', name => {
    appendMessage(`${name} disconnected`)
 }) 
 
function appendMessage(message) {
    const messageElemnet = document.createElement('div')
    messageElemnet.innerText = message
    messageContainer.append(messageElemnet)
}
var socket = io.connect('http://localhost:4000')

var handle = document.getElementById('handle')
var message = document.getElementById('message')
var btn = document.getElementById('send')
var output = document.getElementById('output')
var feedback = document.getElementById('feedback')


btn.addEventListener('click', function() {
    socket.emit('chat', {
        handle: handle.value,
        message: message.value
    })
    message.value = ""
})


socket.on('chat', function(data) {
    feedback.innerHTML = ""
    output.innerHTML += '<p><strong>' + data.handle + ':</strong>' + data.message + '</p>'
})

socket.on('typing', function(data) {
    feedback.innerHTML = '<p><em>' + data + ' is typing a message' + '</em></p>'
})

message.addEventListener('keypress', function() {
    socket.emit('typing', handle.value)
})

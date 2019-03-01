/* importar as configuracoes do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
var port = process.env.PORT || 3000;
var server = app.listen(port, function() {
  console.log('Servidor ON em ' + port);
});

var io = require('socket.io').listen(server);
app.set('io', io);
/* criar conexao com Websockets */
io.on('connection', function(socket) {
  console.log('user connected');
  socket.on('disconnect', function() {
    console.log('user disconnect');
  });
  socket.on('msgParaServidor', function(data) {
    /* dialogo */
    socket.emit(
      'msgParaCliente',
      {apelido : data.apelido, mensagem : data.mensagem}
    );
    socket.broadcast.emit(
      'msgParaCliente',
      {apelido : data.apelido, mensagem : data.mensagem}
    );

    /* atualizar participantes */
    if(parseInt(data.apelido_atualizado) == 0) {
      socket.emit(
        'participantesParaCliente',
        {apelido : data.apelido}
      );
      socket.broadcast.emit(
        'participantesParaCliente',
        {apelido : data.apelido}
      );
    }
  });
});

const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();

 bands.addBand( new Band( 'Rage Against The Machine' ) );
 bands.addBand( new Band( 'Korn' ) );
 bands.addBand( new Band( 'Limp Bizkit' ) );
 bands.addBand( new Band( 'Mudvayne' ) );

console.log(bands);


//Mensajes de Sockets

io.on('connection', client => { 
    console.log('Cliente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', ( payload ) => {
        console.log('Mensaje', payload);

    io.emit('mensaje', {admin: 'Nuevo Mensaje'});     
    });

    client.on('vote-band', (payload) => {
      bands.voteBand( payload.id );
      io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
      bands.deleteBand( payload.id );
      io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
      const newBand = new Band( payload.name );
      bands.addBand( newBand );
      io.emit('active-bands', bands.getBands());
    });

    // client.on('emitir-mensaje', ( payload ) => {
    //   //console.log(payload);
    //  //io.emit('nuevo-mensaje', payload); //Emite a Todos!
    //   client.broadcast.emit('nuevo-mensaje', payload);
    // });

  });
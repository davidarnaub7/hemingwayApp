//@TODO: NORMALIZAR TODO A MAYÚSUCULAS.

const getErrorMsg = (err) => {
  console.log(err);
  switch (err) {
    //CREDS ERRORS
    case 'Next time machine':
    case 'Invalid Creds':
      return 'No podemos validar tu identidad. Por favor, sal de la aplicación y vuelve a loggearte.';
    //LOGGIN ERRORS
    case 'User not found':
      return 'El usuario no existe';
    case 'Password is incorrect!':
    case 'User does not exist!':
      return 'El usuario o la contraseña no son válidos';
    //PROFILE DATA ERRORS
    case 'Invalid Login data':
    case 'INVALID PROFILE DATA':
      return 'Los datos introducidos no son válidos';
    case 'Username exists already':
      return 'El nombre de usuario ya está cogido. Prueba con otro distinto';
    case 'Invalid Auth Data':
      return 'Hemos detectado un petición inusual que entendemos como un ataque. Si se vuelve a detectar procederemos con las medidas de seguridad';
    case 'INVALID USER':
      return 'El usuario no es válido. Esto es una petición inisual que entendemos como un ataque. Si se vuelve a detectar procederemos con las medidas de seguridad';
    //ROOM ERRORS
    case 'Invalid Room Data':
    case 'Room does not exists':
      return 'La zona no existe';
    case 'User is already on the room':
      return 'Ya estás dentro de la sala. Sino eres tú ponte en contacto con nosotros.';
    case "YOU'RE OUT":
      return 'No estás cerca de la zona a la que quieres entrar.';
    //CHANGE PASSWD:
    case 'Contraseña incorrecta':
      return 'Contraseña incorrecta';
    case 'REQUEST NOT PERMITTED':
      return 'Se ha detectado unos datos insuales en la solicitud que entendemos como un ataque. Si se vuelve a detectar procederemos con las medidas de seguridad';
    //EMAIL
    case 'Invalid Email Data':
      return 'Email no válido';
    case 'EMAIL FOUND':
      return 'El email ya existe. Prueba con otro.';
    case 'EMAIL NOT FOUND':
      return 'El email introducido no existe. Asegúrate de introducirlo correctamente.';
    case 'NOT VALID CODE':
      return 'Código no válido';
    //DEFAULT ERRORS
    case 'NEXT TIME':
    case 'Something went wrong':
    default:
      return 'Algo ha ido mal. Inténtalo otra vez.';
  }
};

export default getErrorMsg;

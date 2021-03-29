/**
 * @file: termsAndConditions.js
 *
 * @description It displays the terms and conditions of the app.
 */
import React from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';

//NAV-THEME
import {useNavigation, useTheme} from '@react-navigation/native';

const TermsAndConditions = (props) => {
  const theme = useTheme();
  const terms = [
    {
      title: '1. Términos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          1. Estos Términos y Condiciones de Uso regulan las reglas a que se
          sujeta la utilización de la APP Beyu que puede descargarse desde el
          dominio beyu.io La descarga o utilización de la APP atribuye la
          condición de Usuario a quien lo haga e implica la aceptación de todas
          las condiciones incluidas en este documento y en la Política de
          Privacidad y el Aviso Legal de dicha página Web. El Usuario debería
          leer estas condiciones cada vez que utilice la APP, ya que podrían ser
          modificadas en lo sucesivo.
        </Text>
      ),
    },
    {
      title: '2. ¿Quién puede hacer uso del servicio?',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Puede hacer uso de los Servicios solo si accede a firmar un contrato
          vinculante con Beyu y no es usted una persona vetada para hacer uso
          de los servicios de conformidad con la legislación de su jurisdicción
          aplicable. En cualquier caso, usted deberá tener al menos 16 años,
          para hacer uso de los Servicios. Si acepta estos Términos y usa los
          Servicios en nombre de una empresa, organización, gobierno u otra
          entidad jurídica, afirma y garantiza que está autorizado a hacerlo y
          cuenta con los poderes necesarios para obligarla al cumplimiento de
          estos Términos, en cuyo caso el uso de las palabras "usted", "su" y
          "sus" en estos Términos hará referencia a dicha entidad jurídica.
        </Text>
      ),
    },
    {
      title: '3. Cargos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Cargos: eres responsable del pago de todos los costes o gastos en los
          que incurras como resultado de descargar y usar la Aplicación de
          Beyu, incluido cualquier cargo de red de operador o itinerancia.
          Consulta con tu proveedor de servicios los detalles al respecto.
        </Text>
      ),
    },
    {
      title: '4. Estadísticas anónimas:',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Beyu se reserva el derecho a realizar un seguimiento de tu actividad
          en la Aplicación de y a informar de ello a nuestros proveedores de
          servicios estadísticos de terceros. Todo ello de forma anónima.
        </Text>
      ),
    },
    {
      title: '5. Protección de tu información personal:',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Queremos ayudarte a llevar a cabo todos los pasos necesarios para
          proteger tu privacidad e información. Consulta la Política de
          privacidad de Beyu y los avisos sobre privacidad de la Aplicación
          para conocer qué tipo de información recopilamos y las medidas que
          tomamos para proteger tu información personal.
        </Text>
      ),
    },
    {
      title: '6. Copyright',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Queda prohibido alterar o modificar ninguna parte de la APP a de los
          contenidas de la misma, eludir, desactivar o manipular de cualquier
          otra forma (o tratar de eludir, desactivar o manipular) las funciones
          de seguridad u otras funciones del programa y utilizar la APP o sus
          contenidos para un fin comercial o publicitario. Queda prohibido el
          uso de la APP con la finalidad de lesionar bienes, derechos o
          intereses de Beyu o de terceros. Queda igualmente prohibido realizar
          cualquier otro uso que altere, dañe o inutilice las redes, servidores,
          equipos, productos y programas informáticos de Beyu o de terceros.
        </Text>
      ),
    },
    {
      title: '7. Contenidos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          La APP y sus contenidos (textos, fotografías, gráficos, imágenes,
          tecnología, software, links, contenidos, diseño gráfico, código
          fuente, etc.), así como las marcas y demás signos distintivos son
          propiedad de Beyu o de terceros, no adquiriendo el Usuario ningún
          derecho sobre ellos por el mero uso de la APP. El Usuario, deberá
          abstenerse de:
          <View style={styles.itemize}>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Reproducir, copiar, distribuir, poner a disposición de
              terceros, comunicar públicamente, transformar o modificar la APP o
              sus contenidos, salvo en los casos contemplados en la ley o
              expresamente autorizados por Beyu o por el titular de dichos
              derechos.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Reproducir o copiar para uso privado la APP o sus
              contenidos, así como comunicarlos públicamente o ponerlos a
              disposición de terceros cuando ello conlleve su reproducción.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}
              Extraer o reutilizar todo o parte sustancial de los contenidos
              integrantes de la APP.
            </Text>
          </View>
          Nos reservamos el derecho a retirar Contenido que incumpla el Acuerdo
          de usuario, como por ejemplo, violaciones de derechos de autor o de
          marcas comerciales o cualesquiera otros usos indebidos de propiedad
          intelectual, suplantación de identidad, conducta ilícita o acoso.
          Encontrará a información relativa a políticas específicas y al proceso
          para notificar o impugnar incumplimientos en nuestro {'\n'} Si cree
          que su Contenido ha sido copiado de forma que constituya una
          infracción de los derechos de autor, notifíquenoslo poniéndose en
          contacto con nuestro agente de derechos de autor en la dirección
          siguiente:
          <View style={styles.itemize}>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Beyu, Inc.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Valencia, VA 46001
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Correo electrónico: contact@beyu.com
            </Text>
          </View>
        </Text>
      ),
    },

    {
      title: '8. Derechos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Usted conserva sus derechos sobre cualquier Contenido que envíe,
          publique o muestre a través de nuestros Servicios. Lo que es suyo, es
          suyo: usted es el dueño de su Contenido (las fotos que se consideren
          parte del Contenido). {'\n'} {'\n'} Al publicar o mostrar Contenido a
          través de los Servicios, nos otorga una licencia mundial, no no
          exclusiva, libre del pago de derechos (con derecho a sublicencia) para
          usar, copiar, reproducir, procesar, adaptar, modificar, publicar,
          transmitir, mostrar y distribuir dicho Contenido en todos y cada uno
          de los medios de comunicación o métodos de distribución posibles,
          conocidos ahora o desarrollados con posterioridad (a efectos
          aclaratorios, estos derechos incluyen, por ejemplo, los de
          organización, transformación y traducción). Esta licencia nos autoriza
          a poner su Contenido a disposición del resto del mundo y a permitir
          que otros hagan lo mismo. Usted acepta que esta licencia incluye el
          derecho de Beyu a proporcionar, promover y mejorar los Servicios y a
          poner el contenido enviado a o a través de los Servicios a disposición
          de otras empresas, organizaciones o personas para la sindicación,
          emisión, distribución, promoción o publicación de dicho contenido en
          otros medios y servicios, sujeto a nuestros términos y condiciones
          para el uso de dicho Contenido. Dichos usos adicionales por parte de
          Beyu u otras empresas, organizaciones o personas se realizarán sin
          abonarle a usted una compensación con respecto al Contenido que haya
          enviado, publicado, transmitido o puesto a disposición pública de
          cualquier otra forma a través de los Servicios, ya que usted acepta
          que el uso de los Servicios por su parte constituye una compensación
          suficiente por el Contenido y la cesión de derechos aquí contemplados.
          {'\n'} {'\n'} {'\n'} Usted declara y garantiza que tiene, o ha
          obtenido, todos los derechos, licencias, consentimientos, permisos,
          facultades y/o autorizaciones necesarias para otorgar los derechos
          aquí conferidos para cualquier Contenido que usted envíe, publique o
          muestre en los Servicios o a través de estos. Usted acepta que dicho
          Contenido no contendrá materiales sujetos a derechos de autor u otros
          derechos de propiedad, salvo que usted cuente con el permiso necesario
          o esté legalmente facultado para publicar tales materiales y para
          conceder a Beyu la licencia anteriormente descrita.
        </Text>
      ),
    },
    {
      title: '9. Cuenta ',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Puede necesitar crear una cuenta para usar alguno de nuestros
          Servicios. Usted es responsable de la seguridad de su cuenta, por lo
          que debe usar una contraseña fuerte y limitar su uso a esta cuenta. No
          podemos ser considerados responsables, ni lo seremos, de ninguna
          pérdida o daño derivado de su incumplimiento de las anteriores
          condiciones. {'\n'} {'\n'} Usted puede controlar la mayoría de las
          comunicaciones de los Servicios. Puede que debamos proporcionarle
          ciertas comunicaciones, como anuncios del servicio y mensajes
          administrativos. Dichas comunicaciones se consideran parte de los
          Servicios y no podrá optar por no recibirlos ni usted ni en su cuenta.
          Si añadió su número de teléfono o correo eléctronico a su cuenta, y
          después, lo cambió o desactivó dicho número de teléfono o correo, debe
          actualizar la información de su cuenta para evitar que nos
          comuniquemos con cualquiera que asuma su antiguo número o correo.
        </Text>
      ),
    },
    {
      title: '10.Licencias',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Con sujeción a las condiciones establecidas en el apartado anterior,
          Beyu concede al Usuario una licencia de uso de la APP, no exclusiva,
          gratuita, para uso personal, circunscrita al territorio nacional y con
          carácter indefinido. Dicha licencia se concede también en los mismos
          términos con respecto a las actualizaciones y mejoras que se
          realizasen en la aplicación. Dichas licencias de uso podrán ser
          revocadas por Beyu unilateralmente en cualquier momento, mediante la
          mera notificación al Usuario.
        </Text>
      ),
    },
    {
      title: '11. Daños',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Corresponde al Usuario, en todo caso, disponer de herramientas
          adecuadas para la detección y desinfección de programas maliciosos o
          cualquier otro elemento informático dañino. Beyu no se responsabiliza
          de los daños producidos a equipos informáticos durante el uso de la
          APP. Igualmente, Beyu no será responsable de los daños producidos a
          los Usuarios cuando dichos daños tengan su origen en fallos o
          desconexiones en las redes de telecomunicaciones que interrumpan el
          servicio.
        </Text>
      ),
    },
    {
      title: '12. General',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Podemos, sin que esto suponga ninguna obligación contigo, modificar
          estas Términos y condiciones de uso sin avisar en cualquier momento.
          Si continúas utilizando la aplicación una vez realizada cualquier
          modificación en estas Términos y condiciones de uso, esa utilización
          continuada constituirá la aceptación por tu parte de tales
          modificaciones. Si no aceptas estos Términos y condiciones de uso ni
          aceptas quedar sujeto a ellas, no debes utilizar la aplicación ni
          descargar o utilizar cualquier software relacionado. El uso que hagas
          de la aplicación queda bajo tu única responsabilidad. No tenemos
          responsabilidad alguna por la eliminación o la incapacidad de
          almacenar o trasmitir cualquier contenido u otra información mantenida
          o trasmitida por la aplicación. No somos responsables de la precisión
          o la fiabilidad de cualquier información o consejo trasmitidos a
          través de la aplicación. Podemos, en cualquier momento, limitar o
          interrumpir tu uso a nuestra única discreción. Hasta el máximo que
          permite la ley, en ningún caso seremos responsables por cualquier
          pérdida o daño relacionados. {'\n'} {'\n'} Estos Términos y
          Condiciones de Uso se rigen íntegramente por la legislación española.
          Para la resolución de cualquier conflicto relativo a su interpretación
          o aplicación, el Usuario se somete expresamente a la jurisdicción de
          los tribunales de Valencia(España)
        </Text>
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <ScrollView style={styles.tcContainer}>
        {terms.map((section) => {
          return (
            <View style={styles.section}>
              <Text style={[styles.title, {color: theme.colors.text}]}>
                {section.title}
              </Text>
              {section.contents}
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = {
  container: {
    flex: 0.6,
    width: Dimensions.get('window').width,
    alignSelf: 'center',
  },
  section: {
    justifyContent: 'flex-start',
    marginVertical: 10,
  },

  title: {
    fontSize: 22,
    fontFamily: 'System',
    fontWeight: '700',
  },
  tcP: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '700',
  },
  itemize: {
    justifyContent: 'center',
  },
  tcL: {
    marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '700',
  },
  tcContainer: {
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
};

export default TermsAndConditions;

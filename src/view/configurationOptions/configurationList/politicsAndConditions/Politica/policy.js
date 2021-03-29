/**
 * @file: termsAndConditions.js
 *
 * @description It displays the terms and conditions of the app.
 */
import React, {useEffect} from 'react';
import {View, Text, ScrollView, Dimensions} from 'react-native';

// import {logScreenView} from '../../../../../analytics/analytics'; //ANALYTICS
//NAV-THEME
import {useNavigation, useTheme} from '@react-navigation/native';
//ICONS
import Entypo from 'react-native-vector-icons/Entypo';

const Policy = () => {
  const theme = useTheme();
  const nav = useNavigation();

  useEffect(() => {
    // logScreenView('privacy');
  }, []);

  const terms = [
    {
      title: '1. Información que recopilamos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Beyu te informa sobre su Política de Privacidad respecto del
          tratamiento y protección de los datos de carácter personal de los
          usuarios y clientes que puedan ser recabados por la navegación o
          contratación de servicios a través de la app Beyu APP. En este
          sentido, el Titular garantiza el cumplimiento de la normativa vigente
          en materia de protección de datos personales, reflejada en la Ley
          Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales
          y de Garantía de Derechos Digitales (LOPD GDD). Cumple también con el
          Reglamento (UE) 2016/679 del Parlamento Europeo y del Consejo de 27 de
          abril de 2016 relativo a la protección de las personas físicas (RGPD).
          El uso de sitio Web implica la aceptación de esta Política de
          Privacidad así como las condiciones incluidas en el Aviso Legal.
        </Text>
      ),
    },
    {
      title: '2. Contacto',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
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
      title: '3. Principios Clave',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Siempre hemos estado comprometidos con prestar nuestros servicios con
          el más alto grado de calidad, lo que incluye tratar sus datos con
          seguridad y transparencia. Nuestros principios son:
          <View style={styles.itemize}>
            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.1 Legalidad
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Solo recopilaremos sus Datos personales para fines específicos,
                explícitos y legítimos. Minimización de datos: Limitamos la
                recogida de datos de carácter personal a lo que es estrictamente
                relevante y necesario para los fines para los que se han
                recopilado.
              </Text>
            </View>
            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.2 Limitación de la Finalidad
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Solo recogeremos sus datos personales para los fines declarados
                y solo según sus deseos.
              </Text>
            </View>
            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.3 Precisión
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Mantendremos sus datos personales exactos y actualizados.
              </Text>
            </View>

            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.4 Seguridad de los Datos
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Aplicamos las medidas técnicas y organizativas adecuadas y
                proporcionales a los riesgos para garantizar que sus datos no
                sufran daños, tales como divulgación o acceso no autorizado, la
                destrucción accidental o ilícita o su pérdida accidental o
                alteración y cualquier otra forma de tratamiento ilícito.
              </Text>
            </View>
            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.5 Conservación
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Conservamos sus datos personales de manera legal y apropiada y
                solo mientras es necesario para los fines para los que se han
                recopilado.
              </Text>
            </View>

            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.6 Terceros
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                El acceso y transferencia de datos personales a terceros se
                llevan a cabo de acuerdo con las leyes y reglamentos aplicables
                y con las garantías contractuales adecuadas.
              </Text>
            </View>
            <View style={styles.subItem}>
              <Text style={[styles.subItemTitle, {color: theme.colors.text}]}>
                3.7 Marketing Directo y cookies
              </Text>
              <Text style={[styles.tcLItem, {color: theme.colors.text}]}>
                Cumplimos con la legislación aplicable en materia de publicidad
                y cookies.
              </Text>
            </View>
          </View>
        </Text>
      ),
    },
    {
      title: '4. Recogida y tratamiento de sus datos personales',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Las tipos de datos que se pueden solicitar y tratar son: Datos de
          carácter identificativo. Siempre que solicitemos sus Datos personales,
          le informaremos con claridad de qué datos personales recogemos y con
          qué fin. En general, todos los datos que recogemos son para el
          correcto funcionamiento de la app. NO se realiza, en ningún caso el
          tratamiento con fines comerciales directos, pudiendo ser estos datos
          como objeto estudio siempre de una manera anónima. Podemos afirmas que
          tratamos sus datos personales con el propósito de:
          <View style={styles.itemize}>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Proporcionar información, servicios, productos,
              información relevante y novedades en el sector.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Envío de comunicaciones.
            </Text>
          </View>
        </Text>
      ),
    },
    {
      title: '5. Legitimidad',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          De acuerdo con la normativa de protección de datos aplicable, sus
          datos personales podrán tratarse siempre que:
          <View style={styles.itemize}>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Nos ha dado su consentimiento a los efectos del
              tratamiento. Por supuesto podrá retirar su consentimiento en
              cualquier momento.
            </Text>

            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Por requerimiento legal.
            </Text>

            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Por exisitr un interés legítimo que no se vea
              menoscabado por sus derechos de privacidad, como por ejemplo el
              envío de información comercial bien por suscripción a nuestra
              newsletter o por su condición de cliente.
            </Text>

            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Por se necesaria para la prestación de alguno de
              nuestros servicios mediante relación contractual entre usted y
              nosotros.
            </Text>
          </View>
        </Text>
      ),
    },
    {
      title: '6. Petición de datos',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          En relación con la recogida y tratamiento de sus datos personales,
          puede ponerse en contacto con nosotros en cualquier momento para:
          <View style={styles.itemize}>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Acceder a sus datos personales y a cualquier otra
              información indicada en el Artículo 15.1 del RGPD.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Rectificar sus datos personales que sean inexactos o
              estén incompletos de acuerdo con el Artículo 16 del RGPD.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Suprimir sus datos personales de acuerdo con el
              Artículo 17 del RGPD.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Limitar el tratamiento de sus datos personales de
              acuerdo con el Artículo 18 del RGPD.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '}Solicitar la portabilidad de sus datos de acuerdo con
              el Artículo 20 del RGPD.
            </Text>
            <Text style={[styles.tcL, {color: theme.colors.text}]}>
              {'\u2022 '} Oponerse al tratamiento de sus datos personales de
              acuerdo con el artículo 21 del RGPD.
            </Text>
          </View>
          Si ha otorgado su consentimiento para alguna finalidad concreta, tiene
          derecho a retirar el consentimiento otorgado en cualquier momento, sin
          que ello afecte a la licitud del tratamiento basado en el
          consentimiento previo a su retirada rrhh. Puede ejercer estos derechos
          enviando comunicación, motivada y acreditada, a contact@beyu.com .com
          También tiene derecho a presentar una reclamación ante la Autoridad de
          control competente (www.aepd.es) si considera que el tratamiento no se
          ajusta a la normativa vigente.
        </Text>
      ),
    },
    {
      title: '7. General',
      contents: (
        <Text style={[styles.tcP, {color: theme.colors.text}]}>
          Los requisitos de esta Política complementan, y no reemplazan,
          cualquier otro requisito existente bajo la ley de protección de datos
          aplicable, que será la que prevalezca en cualquier caso.
          {'\n\n'}
          Esta Política está sujeta a revisiones periódicas y la empresa puede
          modificarla en cualquier momento. Cuando esto ocurra, le avisaremos de
          cualquier cambio y le pediremos que vuelva a leer la versión más
          reciente de nuestra Política y que confirme su aceptación.
        </Text>
      ),
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.row}>
          <Entypo
            name={'chevron-left'}
            size={30}
            color={theme.colors.text}
            style={{alignSelf: 'center'}}
            onPress={() => nav.goBack()}
          />
          <Text style={[styles.title, {color: theme.colors.text}]}>
            Política de privacidad
          </Text>
        </View>
      </View>
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
    flex: 1,
    justifyContent: 'space-around',
  },
  header: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 9,
    justifyContent: 'flex-end',
  },
  row: {
    flexDirection: 'row',
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
    justifyContent: 'flex-start',
  },
  subItem: {
    width: Dimensions.get('window').width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    marginLeft: 10,
  },
  subItemTitle: {
    fontSize: 18,
    fontFamily: 'System',
    fontWeight: 'bold',
  },
  tcLItem: {
    // marginHorizontal: 10,
    marginTop: 10,
    marginBottom: 10,
    fontSize: 12,
    fontFamily: 'System',
    fontWeight: '700',
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

export default Policy;

const botAvatar: string = 'https://i.ytimg.com/vi/Erqi5ckVoEo/hqdefault.jpg';

export const gifsLinks: string[] = [
  'https://media.tenor.com/images/ac287fd06319e47b1533737662d5bfe8/tenor.gif',
  'https://i.gifer.com/no.gif',
  'https://techcrunch.com/wp-content/uploads/2015/08/safe_image.gif',
  'http://www.reactiongifs.com/r/wnd1.gif',
];
export const imageLinks: string[] = [
  'https://picsum.photos/320/240/?image=357',
  'https://picsum.photos/320/240/?image=556',
  'https://picsum.photos/320/240/?image=339',
  'https://picsum.photos/320/240/?image=387',
  'https://picsum.photos/320/240/?image=30',
  'https://picsum.photos/320/240/?image=271',
];
const fileLink: string = 'http://google.com';

export const botReplies = [
  {
    regExp: /([H,h]ola)|([H,h]i)/g,
    answerArray: ['Hola!', 'si?', 'Señor?', 'Que puedo hacer por ti?','¿Como estas?'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([A,a]yuda)|([A,a]yudame)/g,
    answerArray: [`!No hay problema! intente enviar un mensaje que contenga su tipo de novedad, Ejem. "aplazamiento"
    `],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([A,a]dios)/g,
    answerArray: [`¡Hasta luego!`,`Hasta la vista, baby`],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(retirovoluntario)|(retiro voluntario)|(retiro Voluntario)|([r]eintegro)|(aplazamiento)/g,
    answerArray: [`
    1. Buscar en la parte superior izquierda de su pantalla un icono con tres rayas
    2. Dar click a la seccion de novedades
    3. Buscar su novedad  y llenar el formulario para crear tu novedad
    4. En caso de no aparecer nada notifica a su instructor  lider de ficha
    `
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(Retiro Voluntario)|(Retiro voluntario)/g,
    answerArray: [`
    La sancion por  retiro voluntario, Si es virtual la sanción es de 8 meses.
    Si es una carrera presencial es de 1 hasta 3 años de sanción.
    La mejor opción es que aproveche esa oportunidad porque esos cupos no son nada sencillos de conseguirlos.
    `
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },

  {
    regExp: /(Reintegro)/g,
    answerArray: [`La fecha límite para que el Aprendiz reingrese al SENA debe quedar
    consignada en el acto académico que concede la suspensión, pero el Aprendiz podrá solicitar
    su reingreso antes de esa fecha por escrito.

    En caso de no existir disponibilidad de cupo en la fecha de la solicitud de reintegro, el mismo
podrá hacerse efectivo por parte del Centro de Formación en el momento en que exista esa
disponibilidad
    `
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  
  {
    regExp: /(Aplazamiento)/g,
    answerArray: [`Es la solicitud que el Aprendiz puede realizar por escrito para retirarse
    temporalmente del programa de formación en el que se encuentra matriculado, por un tiempo
    máximo de seis (6) meses calendario continuos o discontinuos, por alguno de los siguiente
    motivos debidamente comprobados: enfermedad, maternidad, servicio militar, problemas de
    seguridad o calamidad doméstica.
    `
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([c,C]ancelacion)|([c,C]onvivecia)|([a,A]cademico)/g,
    answerArray: [`El aprendiz por fuerza mayor cancela su proceso o por una infracción de las reglas establecidas en la institución que lleva a su debida cancelación .`
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([d,D]esercion)/g,
    answerArray: [`Es cuando el aprendiz no termina su proceso de formación`,`
    Se considera deserción cuando:

• Cuando el Aprendiz injustificadamente no se presenta a las actividades de su programa de formación durante un mes continuo
• Cuando al terminar el periodo de aplazamiento aprobado por el SENA el Aprendiz no reingresa al programa de formación
• Cuando transcurridos dos años contados a partir de la fecha de terminación de la etapa lectiva, el Aprendiz no ha presentado la evidencia de la realización de la etapa práctica.
`
    
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([q,Q]uien eres)/g,
    answerArray: [`Yo soy un bot creado para apoyarte en tu proceso`
    
  ],
    type: 'quote',  
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([C,c]reador)|([c,C]reo)/g,
    answerArray: [`Mi creador es akveo, pero fui adaptado por el grupo novost ❤️`
    
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /([e,E]res malo)/g,
    answerArray: [`si`
    
  ],
    type: 'quote',
    reply: {
      text: '',
      reply: false,
      type: 'quote',
      date: new Date(),
      quote: '',
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
  {
    regExp: /(.*)/g,
    answerArray: ['Hola! intente de nuevo con "ayuda"'],
    type: 'text',
    reply: {
      text: '',
      reply: false,
      date: new Date(),
      user: {
        name: 'Bot',
        avatar: botAvatar,
      },
    },
  },
];

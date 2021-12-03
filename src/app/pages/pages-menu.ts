import { NbMenuItem } from '@nebular/theme';
export const MENU_ITEMS:any[]= [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
    home: true,
  },
  {
    title:'Novedades',
    group:true,
    hidden:false
  },
  {
    title:'Novedades',
    icon:'archive-outline',
    hidden:false,
    children: [
      {
        title: 'Lista Novedades',
        link: '/pages/novedades/novedades',
        hidden:false
      },
      { 
        title: 'Retiro Voluntario',
        link: '/pages/novedades/retiro_voluntario',
      },
      {
        title: 'Reintegro',
        link: '/pages/novedades/reintegro',
        hidden:false
      },
      {
        title: 'Cancelacion por Convivencia',
        link: '/pages/novedades/cancelacion',
        hidden:false
      },  
      {
        title: 'Aplazamiento',
        link: '/pages/novedades/aplazamiento',
        hidden:false
      },
      {
        title: 'Traslado',
        link: '/pages/novedades/traslado',
        hidden:false
      },
      {
        title: 'Desercion',
        link: '/pages/novedades/desercion',
        hidden:false
      },
    ],
  },

  {
    title: 'Fichas',
    icon: 'clipboard-outline',
    link: '/pages/novedades/ficha',
    home: true,
    hidden:false
  },
  
  {
    title: 'Usuario',
    icon: 'people-outline',
    link: '/pages/user/usuario',
    home: true,
    hidden:false
  },
  {
    title: 'Solicitudes',
    icon: 'inbox-outline',
    link: '/pages/novedades/solicitudes',
    home: true,
    hidden:true
  },
  {
    title: 'Cargar Lista',
    icon: 'cloud-upload-outline',
    link: '/pages/user/CargarLista',
    home: true,
    hidden:true
  },
  {
    title:'Reportes',
    group:true,
    hidden:false
  },
  {
    title:'Reporte de Novedades',
    icon:'bar-chart-outline',
    link: '/pages/reporte/reportes_generales',
    hidden:false,
  },
];

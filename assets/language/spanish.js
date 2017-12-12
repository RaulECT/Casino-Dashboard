(function () {
  angular.module('app')
    .factory('languageFactory', spanish)

  spanish.$inject = [];

  function spanish() {
    var label, error, button;
    var text = {
      login: login,
      home: home,
      config: config,
      configChips: configChips,
      configFastAmounts: configFastAmounts,
      configLevel: configLevel,
      configLevelManager: configLevelManager,
      configMembership: configMembership,
      configChange: configChange,
      configCasino: configCasino,
      configLevelManager: configLevelManager,
      configSchedule: configSchedule,
      roleManager: roleManager,
      roleManagerNewRole: roleManagerNewRole,
      editRole: editRole,
      employeeManager: employeeManager,
      clientManager: clientManager,
      sales: sales,
      statistics: statistics,
      statisticsEmailManager: statisticsEmailManager,
      history: history,
      historyTill:historyTill
    };

    return text;

  };

  function login() {
    label = {
      toolbar: "¡Bienvenido!",
      insertData: "Por favor ingresa tus datos:",
      insertFinger: "Por favor ponga su dedo en el sensor de huella:",
      userInput: "Usuario",
      passInput: "Contraseña"
    };
    error = {
      userInput: "Ingrese el nombre de usuario",
      passInput: "Ingrese su contraseña."
    };
    button = {
      submit: "Continuar",
      finger: "Iniciar sesión con huella",
      password: "Ingresar con password"
    }
    return { label: label, error: error, button: button };
  };

  function home() {
    label = {
      title: "Por favor elija la opción deseada:",
      config: "Configuración",
      roleManager: "Gestión de roles",
      employeeManager: "Administración de usuarios",
      clientManager: "Administración de clientes",
      sales: "Promociones",
      stadistics: "Estadísticas",
      history: "Historial",
      logout: "Cerrar sesión"

    };
    return { label: label };
  };

  function config() {
    label = {
      title: "Configuración general",
      chips: "Fichas",
      fastAmounts: "Montos rápidos",
      denominations: "Denominaciones",
      level: "Niveles",
      levelManager: "Gestión de Niveles",
      change: "Tipo de cambio",
      memberships: "Precio de membresía",
      casino: "Casino",
      schedule: "Horarios",
      others: "Otras entradas"
    };
    button = { back: "Atrás" };
    return { label: label, button: button };
  };

  function configChips() {
    label = {
      title: "Fichas",
    };
    return { label: label };
  };

  function configFastAmounts() {
    label = {
      title: "Montos rápidos",
      legend: "Por favor asigne los valores deseados:",
      col1: "Monto",
      col2: "Eliminar"
    };
    button = {
      new: "Agregar monto",
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function configLevel() {
    label = {
      title: "Niveles",
      gold: "ORO",
      silver: "PLATA",
      bronze: "BRONCE",
      legend: "Crédito aprobado."
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function configMembership() {
    label = {
      title: "Precio membresía",
      gold: "ORO",
      silver: "PLATA",
      bronze: "BRONCE",
      legend1: "El costo de la membresía es de:",
      legend2: "Reposición de tarjeta:"
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function configChange() {
    label = {
      title: "Tipo de cambio",
      dollar: "Valor del Dolar",
      chips: "Valor de Ficha"
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function configCasino() {
    label = {
      title: "Casino",
      legend: "Por favor adjunta una imagen del logotipo:",
    };
    button = {
      search: "Examinar",
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function configLevelManager() {
    label = {
      title: "Gestión de Niveles",
      legend: "Por favor asigne los valores deseados:",
      filter: "Filtro por nombre",
      all: "Todos",
      debt: "Deuda",
      credit: "Crédito autorizado",
      level: "Por nivel",
      gold: "Oro",
      silver: "Plata",
      bronze: "Bronce",
      col1: "Selc.",
      col2: "Nombre",
      col3: "Deuda",
      col4: "Crédito autorizado",
      col5: "Nivel",
      maxtomin: "De mayor a menor",
      mintomax: "De menor a mayor"
    };
    button = {
      all: "Aplicar a todos",
      add: "Agregar",
      back: "Atrás"
    };
    return { label: label, button: button };
  };

  function configSchedule() {
    label = {
      title: "Horarios",
      legend1: "Hora de apertura (HH:MM):",
      legend2: "Hora de cierre (HH:MM):",
      legend3: "Repetir rota cada (minutos):",
      legend4: "Repetir score cada (minutos):",
      minutes: "minutos"
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    return { label: label, button: button };
  };

  function roleManager() {
    label = {
      title: " Gestión de Roles",
      legend: "Elija el role que desea editar o agregue uno nuevo.",
      colum1: "Role"
    };
    button = {
      add: "Agregar",
      save: "Guardar",
      cancel: "Cancelar"
    };

    role = {
      cashier: "Cajero",
      admin: "Administrador",
      hostess: "Hostess",
      pitboss: "Pitboss",
      dealer: "Dealer",
      role1: "hola"
    };

    permissions = {
      adminModule: "Acceso a la app de administración.",
      consultCustomers: "Ver miembros.",
      createCustomers: "Crear miembros.",
      editCustomers: "Editar miembros",
      pitbossModule: "Acceso a la app de pitboss.",
      tableGame: "Acceso a la app de juegos.",
      till: "Acceso a la app de caja.",
      reception: "Acceso a la app de recepción.",
      editCardId: "Reponer membresia",
      beAssignedToTableGame: "Atender mesa de juego",
      consultCustomerBalance: "Consular saldo de miembros"
    };
    return { label: label, button: button, role: role, permissions: permissions };
  };

  function roleManagerNewRole() {
    label = {
      title: "Nuevo role",
      legend: "Ingrese un nombre para el role:",
      legend2: "Eilja los permisos para el role:"
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    permissions = {
      adminModule: "Acceso a la app de administración.",
      consultCustomers: "Ver miembros.",
      createCustomers: "Crear miembros.",
      editCustomers: "Editar miembros",
      pitbossModule: "Acceso a la app de pitboss.",
      tableGame: "Acceso a la app de juegos.",
      till: "Acceso a la app de caja.",
      reception: "Acceso a la app de recepción.",
      editCardId: "Reponer membresia",
      beAssignedToTableGame: "Atender mesa de juego",
      consultCustomerBalance: "Consular saldo de miembros"
    };
    return { label: label, button: button, permissions: permissions };
  };

  function editRole() {
    label = {
      title: "Nuevo role",
      legend: "Ingrese un nombre para el role:",
      legend2: "Eilja los permisos para el role:"
    };
    button = {
      save: "Guardar",
      cancel: "Cancelar"
    };
    permissions = {
      adminModule: "Acceso a la app de administración.",
      consultCustomers: "Ver miembros.",
      createCustomers: "Crear miembros.",
      editCustomers: "Editar miembros",
      pitbossModule: "Acceso a la app de pitboss.",
      tableGame: "Acceso a la app de juegos.",
      till: "Acceso a la app de caja.",
      reception: "Acceso a la app de recepción.",
      editCardId: "Reponer membresia",
      beAssignedToTableGame: "Atender mesa de juego",
      consultCustomerBalance: "Consular saldo de miembros"
    };
    return { label: label, button: button, permissions: permissions };
  };

  function employeeManager() {
    label = {
      title: "Administración de usuarios",
      legend: "Por favor asigne los valores deseados:",
      col1: "Seleccionar",
      col2: "Usuario",
      col3: "Role",
      col4: "Editar",
      col5: "Eliminar"
    };
    button = {
      add: "Agregar",
      back: "Atrás",
      deleteSelected: "Eliminar selecionados"
    };
    return { label: label, button: button };
  };

  function clientManager() {
    label = {
      title: "Administración de clientes",
      legend: "Por favor asigne los valores deseados:",
      col1: "Seleccionar",
      col2: "Nombre y apellido",
      col3: "Nivel",
      col4: "Fecha de Nacimiento",
      col5: "Registro",
      col6: "Editar",
      col7: "Eliminar"
    };
    button = {
      add: "Agregar",
      back: "Atrás",
      deleteSelected: "Eliminar selecionados"
    };
    return { label: label, button: button };
  };

  function sales() {
    label = {
      title: "Promociones",
      legend: "Por favor asigne los valores deseados:",
      col1: "Seleccionar",
      col2: "Nombre Promoción",
      col3: "Activa",
      col4: "Monto máx.",
      col5: "Monto min.",
      col6: "Vigencia",
      col7: "Editar",
      col8: "Desactivar"
    };
    button = {
      birthday: "Administrar Promo Cumpleaños",
      add: "Nueva Promo",
      back: "Atrás",
      deleteSelected: "Desactivar selecionados"
    };
    return { label: label, button: button };
  };
  function statistics() {
    label = {
      title: "Estadísticas",
      menu1: "Configurar envìo automàtico",
      menu2: "Visualizar Estadísticas"
    };

    return { label: label };
  };

  function statisticsEmailManager() {
    label = {
      title: "Configurar envío automático",
      legend: "Configura los envios que desees:",
      col1: "Seleccionar",
      col2: "Nombre de Lista",
      col3: "Editar",
      col4: "Eliminar"
    };
    button = {
      newList: "Nuevo envio",
      back: "Atrás",
      deleteSelected: "Eliminar selecionados"
    };
    return { label: label, button: button };
  };

  function history() {
    label = {
      title: "Historial",
      menu1: "Caja",
      menu2: "Score",
      menu3: "Hoy"
    };

    return { label: label };
  };

  function historyTill() {
    label = {
      title: "Historial caja",
      filter: "Filtro:",
      show: "Mostrar:",
      col1: "Operación",
      col2: "Denominación",
      col3: "Monto",
      col4: "Caja",
      col5: "Origen",
      col6: "Cajero",
      col7: "Creado",
    };
    button = {

      back: "Atrás",
    };
    return { label: label, button: button };
  }

})();
import { DEFAULTS } from './defaults';

const SUPER = 'SUPER';
const ADMIN = 'ADMIN';
const USER = 'USER';

export const USERS = {
  status: DEFAULTS.status,
  statusList: DEFAULTS.statusList,
  roles: {
    SUPER,
    ADMIN,
    USER
  },
  rolesList: [
    {
      value: SUPER,
      label: 'Súper'
    },
    {
      value: ADMIN,
      label: 'Administrador'
    },
    {
      value: USER,
      label: 'Usuario'
    }
  ]
};

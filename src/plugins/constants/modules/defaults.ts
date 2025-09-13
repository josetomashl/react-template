const PUBLISHED = 'PUBLISHED';
const UNPUBLISHED = 'UNPUBLISHED';

export const DEFAULTS = {
  status: {
    PUBLISHED,
    UNPUBLISHED
  },
  statusList: [
    {
      value: PUBLISHED,
      label: 'Publicado'
    },
    {
      value: UNPUBLISHED,
      label: 'No publicado'
    }
  ]
};

const DRAFT = 'DRAFT';
const PUBLISHED = 'PUBLISHED';

export const POSTS = {
  status: {
    DRAFT,
    PUBLISHED
  },
  statusList: [
    {
      value: DRAFT,
      label: 'Borrador'
    },
    {
      value: PUBLISHED,
      label: 'Publicado'
    }
  ]
};

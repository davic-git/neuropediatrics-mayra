export const CONTACT = {
  phone: {
    href: 'tel:+5524999459027',
    label: '(24) 99945-9027',
  },
  email: {
    href: 'mailto:dra.mayramartinsneuro@gmail.com',
    label: 'dra.mayramartinsneuro@gmail.com',
  },
  hours: 'Segunda a Sexta de 8h às 18h',
  locations: [
    {
      id: 'center-kids',
      name: 'Center Kids',
      city: 'Volta Redonda',
      region: 'RJ',
      address:
        'Shopping 33/Torre I, Rua 40, 20 - Salas 401 a 407 - Vila Santa Cecília, Volta Redonda - RJ, 27260-200',
    },
    {
      id: 'colo-de-mae',
      name: 'Colo de Mãe',
      city: 'Volta Redonda',
      region: 'RJ',
      address: 'R. Vinte e Um, 87 - Vila Santa Cecília, Volta Redonda - RJ, 27261-610',
    },
  ],
} as const;

export const APPOINTMENT_WHATSAPP_TEXT =
  'Olá! Gostaria de agendar uma consulta com a Dra. Mayra Martins.';

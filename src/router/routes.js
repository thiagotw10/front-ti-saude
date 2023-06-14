
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/IndexPage.vue') },
      { path: '/medicos', component: () => import('src/pages/medicos/Medicos.vue') },
      { path: '/medicos/create', component: () => import('src/pages/medicos/createMedicos.vue') },
      { path: '/pacientes', component: () => import('src/pages/pacientes/Pacientes.vue') },
      { path: '/pacientes/create', component: () => import('src/pages/pacientes/createPaciente.vue') },
      { path: '/planosSaude', component: () => import('src/pages/planosaude/Planos.vue') },
      { path: '/planosSaude/create', component: () => import('src/pages/planosaude/createPlano.vue') },
      { path: '/especialidades', component: () => import('src/pages/especialidades/Especialidades.vue') },
      { path: '/especialidades/create', component: () => import('src/pages/especialidades/createEspecialidade.vue') },
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes

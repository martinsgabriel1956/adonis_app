import Route from '@ioc:Adonis/Core/Route'

Route.get('/profile', 'UsersController.index')
Route.post('/register', 'UsersController.store');
Route.post('/login', 'UsersController.login');

Route.post('/forgot_password', 'ForgotPasswordController.store')
Route.put('/reset_password', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FilesController.show')

Route.group(() => {
  Route.post('/files', 'FilesController.store')
  Route.resource('projects', 'ProjectsController').apiOnly()
  Route.resource('projects.tasks', 'TasksController').apiOnly();
}).middleware('auth')

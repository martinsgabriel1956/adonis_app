/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/profile', 'UsersController.index')
Route.post('/register', 'UsersController.create');
Route.post('/login', 'UsersController.login');

Route.post('/forgot_password', 'ForgotPasswordController.store')
Route.put('/reset_password', 'ForgotPasswordController.update')

Route.get('/files/:id', 'FilesController.show')

Route.group(() => {
  Route.post('/files', 'FilesController.store')
  Route.resource('projects', 'ProjectsController').apiOnly();
  Route.resource('projects.tasks', 'TasksController').apiOnly();
}).middleware('auth')

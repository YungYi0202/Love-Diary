import calendarRoute from './calendar'
import loginRoute from './login'
import homeRoute from './home'
import diaryRoute from './diary'
const wrap = fn => (...args) => fn(...args).catch(args[2])

function routes(app) {
  app.get('/api/getEvents', wrap(calendarRoute.GetEvents))
  app.post('/api/addEvent', wrap(calendarRoute.AddEvent))
  app.post('/api/removeEvent', wrap(calendarRoute.RemoveEvent))
  app.post('/api/dropEvent', wrap(calendarRoute.DropEvent))
  app.get('/api/getDayEvents', wrap(calendarRoute.GetDayEvents))
  app.post('/api/receiveEvent', wrap(calendarRoute.ReceiveEvent))
  
  app.post('/api/addAccount', wrap(loginRoute.AddAccount))
  app.get('/api/getAccounts', wrap(loginRoute.GetAccounts))
  app.get('/api/findAccount', wrap(loginRoute.FindAccount))
  app.get('/api/confirmAccount', wrap(loginRoute.ConfirmAccount))
  app.post('/api/addFirstEvent', wrap(loginRoute.AddFirstEvent))

  app.get('/api/getTodoEvents', wrap(calendarRoute.GetTodoEvents))
  app.post('/api/addTodoEvent', wrap(calendarRoute.AddTodoEvent))
  app.get('/api/getFavEvents', wrap(homeRoute.GetFavEvents))

  app.get('/api/getContent', wrap(diaryRoute.GetContent))
  app.post('/api/addContent', wrap(diaryRoute.AddContent))
  app.post('/api/updateContent', wrap(diaryRoute.UpdateContent))

  app.get('/api/getPhoto', wrap(diaryRoute.GetPhoto))
  app.post('/api/addPhoto', wrap(diaryRoute.AddPhoto))
  app.post('/api/updatePhoto', wrap(diaryRoute.UpdatePhoto))
};


export default routes
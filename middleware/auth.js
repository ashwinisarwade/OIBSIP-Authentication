/**
 * To check user logged in or not to proccess the request or to redirect login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
function isUserLoggedIn(req, res, next) {

  if (Object.keys(req.sessionStore.sessions).length === 0) {
    return res.redirect('/user/login')

  }
  const propertyNames = Object.keys(req.sessionStore.sessions);
  if (propertyNames.length > 0) {
    const firstPropertyName = propertyNames[0];
    const firstPropertyValue = req.sessionStore.sessions[firstPropertyName];
    let cookie = JSON.parse(firstPropertyValue)

    if (cookie.user !== null) {
      console.log('user in session')
      next()
      return
    }
    console.log('session not in session')
    return res.redirect('/user/login')
  }

}

module.exports =
  isUserLoggedIn


const isUserAuthenticated = () => {
  let user = getLoggedInUser()
  if(user === null){
    return false
  }
  return true
}

const getLoggedInUser = () => {
  let user = localStorage.getItem('userInfo')
  return user !== undefined ? user : null 
}

export {isUserAuthenticated, getLoggedInUser}
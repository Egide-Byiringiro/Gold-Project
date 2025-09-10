export function initRouter(routes, onRender){
  const match = (hash) => {
    const found = routes.find(r => r.path === hash)
    return found || routes.find(r => r.path === "*")
  }

  const handle = async () => {
    const current = match(location.hash)
    if (current.redirect){
      navigate(current.redirect)
      return
    }
    if (current.guard){
      const allowed = current.guard()
      if (!allowed){
        navigate("#/login")
        return
      }
    }
    const view = await current.render()
    onRender(view)
  }

  const navigate = (to) => {
    if (location.hash !== to){
      location.hash = to
    } else {
      handle()
    }
  }

  return { handle, navigate }
}



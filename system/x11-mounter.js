import x11 from 'x11'
import * as x11Prop from 'x11-prop'

export const dockify = (opts) => {
  x11.createClient((err, display) => {
    const X = display.client
    const root = display.screen[0].root

    const getAtomIdFromName = (name) => {
      return new Promise(resolve => {
        for(let x = 100; x <= 650; x++) {
          display.client.GetAtomName(x, (err, atom) => {
            if (atom === name) {
              resolve(x)
            }
          })
        }
      })
    }

    X.on('error', e => { console.log("X error is ", e) })

    const queryTree = (id, name, resolve) => {
      X.QueryTree(id, (err, tree) => {
        tree.children.forEach(id => {

          x11Prop.get_property(X, id, "WM_CLASS", 'STRING', (err, result) => {
            const progName = result.toString('UTF-8').split(",")[0]
            if (progName === name) {
              resolve(id)
            }
            queryTree(id, name, resolve)
          })

        })
      })
    }

    const getIdFromName = (name) => {
      return new Promise(resolve => {
        queryTree(root, name, resolve)
      })
    }

    const remapElectronWindow = (id, dockId) => {
      X.UnmapWindow(id)
      X.ChangeWindowAttributes(id, { eventMask: x11.eventMask.PropertyChange |  x11.eventMask.SubstructureNotify });

      x11Prop.set_property(X, id, "_NET_WM_WINDOW_TYPE", X.atoms.ATOM, 32, [dockId],  (err, result) => {
        if (err) {
          console.log("set _NET_WM_WINDOW_TYPE err is ", err)
        }
      })

      x11Prop.set_property(X, id, "_NET_WM_STATE", X.atoms.ATOM, 32, [362, 353],  (err, result) => {
        if (err) {
        console.log("set _NET_WM_STATE err is ", err)
        }
      })

      X.ConfigureWindow(id, {x: 0, y: 0, width: 50, height: opts.height}, (err) => {
        console.log("ConfigureWindow err = ", err)
      })

      setTimeout(() => {
        X.MapWindow(id)
      }, 100)
    }

    getAtomIdFromName("_NET_WM_WINDOW_TYPE_DOCK").then(dockId => {
      getIdFromName("ultrabar").then(id => {
        remapElectronWindow(id, dockId)
      })
    })
  })
}

export const windowify = (opts) => {
  x11.createClient((err, display) => {
    const X = display.client
    const root = display.screen[0].root

    const getAtomIdFromName = (name) => {
      return new Promise(resolve => {
        for(let x = 100; x <= 650; x++) {
          display.client.GetAtomName(x, (err, atom) => {
            if (atom === name) {
              resolve(x)
            }
          })
        }
      })
    }

    X.on('error', e => { console.log("X error is ", e) })

    const queryTree = (id, name, resolve) => {
      X.QueryTree(id, (err, tree) => {
        tree.children.forEach(id => {

          x11Prop.get_property(X, id, "WM_CLASS", 'STRING', (err, result) => {
            const progName = result.toString('UTF-8').split(",")[0]
            if (progName === name) {
              resolve(id)
            }
            queryTree(id, name, resolve)
          })

        })
      })
    }

    const getIdFromName = (name) => {
      return new Promise(resolve => {
        queryTree(root, name, resolve)
      })
    }

    const remapElectronWindow = (id, windowId) => {
      X.UnmapWindow(id)
      X.ChangeWindowAttributes(id, { eventMask: x11.eventMask.PropertyChange |  x11.eventMask.SubstructureNotify });

      x11Prop.set_property(X, id, "_NET_WM_WINDOW_TYPE", X.atoms.ATOM, 32, [windowId],  (err, result) => {
        if (err) {
          console.log("set _NET_WM_WINDOW_TYPE err is ", err)
        }
      })

      // x11Prop.set_property(X, id, "_NET_WM_STATE", X.atoms.ATOM, 32, [362, 353],  (err, result) => {
      //   if (err) {
      //   console.log("set _NET_WM_STATE err is ", err)
      //   }
      // })
      //
      // X.ConfigureWindow(id, {x: 0, y: 0, width: 50, height: opts.height}, (err) => {
      //   console.log("ConfigureWindow err = ", err)
      // })

      setTimeout(() => {
        X.MapWindow(id)
      }, 100)
    }

    getAtomIdFromName("_NET_WM_WINDOW_TYPE_NORMAL").then(windowId => {
      getIdFromName("ultrabar").then(id => {
        remapElectronWindow(id, windowId)
      })
    })
  })
}

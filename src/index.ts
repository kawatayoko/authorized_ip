import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers'
import { ConnInfo } from 'hono/conninfo'

const app = new Hono()

// admin以下のページはip制限をする
app.get('/admin/*', (c) => {
  const ip = getConnInfo(c)
  if (isAuthorized(ip)) {
    return c.text("authorized ip address: " + ip.remote.address)
  }
  // リダイレクトさせるべきかな
  return c.text('unauthorized page!! ip address: ' + ip.remote.address )
})

app.get('/', (c) => {
  return c.text('Hello, World!')
})

function isAuthorized(ip: ConnInfo): boolean {
  const allowlist = ['222.229.245.22', '240b:10:2642:5500:803a:8727:a224:6454']

  if (ip.remote.address == undefined) {
    return false
  }

  // ip.remote.addressTypeにはundefinedが設定されるので参照しない
  return allowlist.includes(ip.remote.address)

}


export default app

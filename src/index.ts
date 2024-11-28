import { Hono } from 'hono'
import { getConnInfo } from 'hono/cloudflare-workers'
import { ConnInfo } from 'hono/conninfo'
import { ipRestriction } from 'hono/ip-restriction'

const app = new Hono()

app.use(
  '/admin/*',
  ipRestriction(
    getConnInfo,
    {
      allowList: ['222.229.245.22'],
    },
    async (remote, c) => {
      return c.text(`Blocking access from ${remote.addr}`, 403)
    }
  )
)

// admin以下のページはip制限をする
app.get('/admin/foo', (c) => {
    return c.text("authorized page.")
})

app.get('/', (c) => {
  return c.text('Hello, World!')
})

// function isAuthorized(ip: string | undefined): boolean {
//   const allowlist = ['222.229.245.22', '240b:10:2642:5500:803a:8727:a224:6454']

//   if (ip == undefined) {
//     return false
//   }

//   // ip.remote.addressTypeにはundefinedが設定されるので参照しない
//   return allowlist.includes(ip)

// }

export default app

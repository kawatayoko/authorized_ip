import { testClient } from 'hono/testing'
import app from "./index";

describe('Testing app', () => {
  it('authorized ip address', async () => {
    const client:any = testClient(app)
    // こっちの書き方はheaderが設定されない。
    // const res = await client.admin.foo.$get({
    //     headers: new Headers({'CF-Connecting-IP': '222.229.245.22'}),
    //     // headers: { 'CF-Connecting-IP': '222.229.245.22' }
    // })
    const res = await app.request('/admin/foo', {
        method: 'GET',
        headers: new Headers({'CF-Connecting-IP': '222.229.245.22'}),
    })
    const status = res.status
    const body = await res.text()
    expect(status).toBe(200)
    expect(body).toBe('authorized page.')
  })

  it('unauthorized ip address', async () => {
    const client:any = testClient(app)
    const res = await app.request('/admin/foo', {
        method: 'GET',
        headers: new Headers({'CF-Connecting-IP': '192.168.1.1'}),
    })
    const status = res.status
    const body = await res.text()
    expect(status).toBe(403)
    expect(body).toBe('Blocking access from 192.168.1.1')
  })

  it('root path', async () => {
    const client:any = testClient(app)
    const res = await client.$get()
    const status = res.status
    expect(status).toBe(200)
  })
})

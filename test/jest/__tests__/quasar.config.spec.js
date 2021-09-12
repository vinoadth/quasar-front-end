import config from '../../../quasar.conf'

describe('quasar config', () => {
    it('has history for build.vueRouterMode', () => {
        expect(config().build.vueRouterMode).toBe('history')
    })
    it('has manifest name', () => {
        expect(config().pwa.manifest.name).toBe('Django Quasar Web App')
    })
    it('has manifest name', () => {
        expect(config().pwa.manifest.short_name).toBe('Web App')
    })
    it('has manifest name', () => {
        expect(config().pwa.manifest.description).toBe('Django / Quasar fullstack')
    })
})

import client from '@sanity/client'

export default client({
    projectId: 's1d1v2jn',
    dataset: 'production',
    useCdn: true
})
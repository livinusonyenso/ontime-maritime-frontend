import { Helmet } from 'react-helmet-async'
import { organizationSchema, localBusinessSchema, professionalServiceSchema } from './schema'

export function GlobalSEO() {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(localBusinessSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(professionalServiceSchema)}
      </script>
    </Helmet>
  )
}

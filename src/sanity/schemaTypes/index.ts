import { type SchemaTypeDefinition } from 'sanity'

import { serviceType } from './serviceType'
import { testimonialType } from './testimonialType'
import { authorType } from './authorType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [serviceType, testimonialType, authorType],
}

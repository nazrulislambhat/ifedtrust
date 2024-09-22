import { SchemaTypeDefinition } from 'sanity'

import blockContent from './blockContent'
import tour from './tour'

export const schemaTypes = [tour, blockContent]
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [tour, blockContent],
}

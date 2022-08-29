/**
* Models -> Measurement Entries
 */

import mongoose from 'mongoose';
import genericTransformer from '../../utils/genericTransformer.js';

const { Schema, model } = mongoose;

const EntrySchema = new Schema({
    temperature: {
      type: Schema.Types.Mixed,
    },
    data: {
      type: Schema.Types.Mixed,
    },
    test: {
      type: Schema.Types.Boolean
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: genericTransformer,
    },
  }
);

const Entry = model('Entry', EntrySchema);

export default Entry;
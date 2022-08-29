/**
* Models -> Measurement Entries
 */

import { Schema, model } from 'mongoose';
import { ObjectId } from 'mongodb';
import genericTransformer from '../../utils/genericTransformer';

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
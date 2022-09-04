/**
* Models -> Logs
 */

import mongoose from 'mongoose';
import genericTransformer from '../../utils/genericTransformer.js';

const { Schema, model } = mongoose;

const LogSchema = new Schema(
  {
    message: {
      type: Schema.Types.Mixed,
    },
    data: {
      type: Schema.Types.Mixed,
    }
  },
  {
    timestamps: true,
    toJSON: {
      transform: genericTransformer,
    },
  }
);

const Log = model('Log', LogSchema);

export default Log;
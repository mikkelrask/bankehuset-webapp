/**
* Models -> Logs
 */

import { Schema, model } from 'mongoose';
import genericTransformer from '../../utils/genericTransformer';

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
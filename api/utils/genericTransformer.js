const genericTransformer = (doc, ret) => {
  ret.id = ret._id;
  delete ret._id;
  delete ret.__v;

  return ret;
};

export default genericTransformer;
